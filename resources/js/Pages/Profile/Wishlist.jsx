import SidebarProfileLayout from "@/Layouts/SidebarProfileLayout";
import ProductList from "@/Components/Product/ProductList";
import { declineProductCount } from "@/helpers";
import ButtonCheckbox from "@/MyComponents/ButtonCheckbox";
import ButtonSelect from "@/MyComponents/ButtonSelect";
import { HeartIcon, AdjustmentsHorizontalIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link, router, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Wishlist = () => {

    const { products, filter_query, total_amount, total_products, all_products } = usePage().props;

    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const [hasMore, setHasMore] = useState(true);
    
    const [currentProducts, setCurrentProducts] = useState(products.data);

    const [allProducts, setAllProducts] = useState(all_products);
    const [allProductsData, setAllProductsData] = useState({
        totalAmount: total_amount,
        totalCount: all_products.length,
    });

    const [currentPage, setCurrentPage] = useState(1);

    // Извлечение значений сортировки и фильтров из filter_query
    const initialSort = filter_query.order || 'date_desc';
    const initialFilters = filter_query.filters ? filter_query.filters.split(',') : [];

    const [selectedFilters, setSelectedFilters] = useState(initialFilters);
    const [selectedOrder, setSelectedOrder] = useState(initialSort);

    const fetchProducts = () => {
        setCurrentProducts([]);
        const params = {
            // page: currentPage,
        };

        // Добавляем параметр сортировки только если он не равен значению по умолчанию
        if (selectedOrder !== 'date_desc') {
            params.order = selectedOrder;
        }

        // Добавляем параметр фильтров только если фильтры не пустые
        if (selectedFilters.length > 0) {
            params.filters = selectedFilters.join(',');
        }
        console.log(selectedOrder);
        router.get(route('profile.wishlist'), params, {
            preserveState: true,
            preserveScroll: true,
            only: ['products'],
            onSuccess: (page) => {
                // setCurrentProducts(prevProducts => [...prevProducts, ...page.props.products.data]);
                setCurrentProducts([]);
                setCurrentProducts(prevProducts => [...prevProducts, ...page.props.products.data]);
            }
        });
    }


    useEffect(() => {
        // Проверяем, выбраны ли все продукты
        const allSelected = all_products.length > 0 && all_products.every(product => selectedProducts.includes(product.id));
        setSelectAll(allSelected);

        // Обновляем количество и сумму выбранных товаров
        if (selectedProducts.length === 0) {
            // Возвращаем к исходным значениям, если ни один товар не выбран
            setAllProductsData({
                totalCount: total_products,
                totalAmount: total_amount,
            });

        } else {

            const totalAmount = selectedProducts.reduce((sum, productId) => {
                const product = allProducts.find(p => p.id === productId);
                return sum + (product ? parseFloat(product.price) : 0);
            }, 0);

            // Округление суммы до двух десятичных знаков
            const roundedTotalAmount = Math.round(totalAmount * 100) / 100;

            setAllProductsData({
                totalCount: selectedProducts.length,
                totalAmount: roundedTotalAmount
            });
        }
    }, [selectedProducts, currentProducts, allProducts]);

    const handleButtonClick = (event) => {
        event.stopPropagation();
        setIsFilterVisible(!isFilterVisible);
    }

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedProducts([]);
        } else {
            setSelectedProducts(all_products.map(product => product.id));
        }
        setSelectAll(!selectAll);
    }

    const handleProductSelect = (productId) => {
        if (selectedProducts.includes(productId)) {
            setSelectedProducts(selectedProducts.filter(id => id !== productId));
        } else {
            setSelectedProducts([...selectedProducts, productId]);
        }
        setSelectAll(false);       
    };

    // Метод для загрузки старницы при скроле
    // TODO
    const fetchMoreProducts = () => {
        router.get(route('profile.wishlist'), {page: currentPage + 1}, {
            preserveState: true,
            preserveScroll: true,
            only: ['products'],
            onSuccess: (page) => {
                if (page.props.products.data.length > 0) {
                    setCurrentProducts(prevProducts => [...prevProducts, ...page.props.products.data]);
                    setCurrentPage(currentPage + 1);
    

                } else {
                    setHasMore(false); // Если нет больше продуктов
                }
                // Удаляем параметр page из URL
                const url = new URL(window.location);
                url.searchParams.delete('page');
                window.history.replaceState(null, '', url);
            }
        });
    };

    const handleDeleteClick = () => {
        setIsModalOpen(true);
    };

    const handleDeleteSuccess = (deletedProductIds) => {
        setCurrentProducts(prevProducts =>
            prevProducts.filter(product => !deletedProductIds.includes(product.id))
        );
        setSelectedProducts([]); // Очистка выбранных продуктов
    };

    return (
        <SidebarProfileLayout>

            {products.length < 1 ? (
                <div className="w-full flex justify-center items-center p-5 h-full">
                    <HeartIcon className="w-52 h-52 text-gray-500 m-20"/>
                    <div>
                        <h1 className="text-4xl font-bold">Список избранного пуст</h1>
                        <p>Для добавления товаров в избранное  <Link href={route('catalog')} className="text-blue-700">перейдите в каталог</Link></p>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="border border-slate-300 rounded-lg m-5 p-5">
                        <div 
                            className="text-2xl font-bold mb-5"
                        >
                            {`${declineProductCount(allProductsData.totalCount)} на сумму: ${allProductsData.totalAmount} P`}
                        </div>

                        <div className="flex justify-between items-center">

                            <div className="flex justify-center items-center gap-4">

                                <label 
                                    className="flex justify-center items-center border rounded-lg p-1 h-[40px]
                                        gap-1 hover:bg-orange-100 w-full cursor-pointer"
                                        onClick={(e) => e.stopPropagation()}
                                >
                                    <ButtonCheckbox checked={selectAll} onChange={handleSelectAll} />
                                    <span className="ml-2 text-sm text-gray-600">Выбрать все</span>
                                </label>

                                <ButtonSortAndFilters 
                                    handleButtonClick={handleButtonClick} 
                                    isFilterVisible={isFilterVisible} 
                                    setIsFilterVisible={setIsFilterVisible}
                                    selectedFilters={selectedFilters}
                                    setSelectedFilters={setSelectedFilters}
                                    selectedOrder={selectedOrder}
                                    setSelectedOrder={setSelectedOrder}
                                    fetchProducts={fetchProducts}
                                />


                                {selectedProducts.length > 0 && (
                                    <div className="flex justify-center items-center border rounded-lg relative h-full">
                                        <button 
                                            className="p-2 hover:bg-orange-100"
                                            onClick={() => handleDeleteClick()}
                                        >
                                            <TrashIcon className="h-[22px] w-[22px] "/>
                                        </button>
                                    </div>
                                )}
                                {isModalOpen && (
                                    <ModalOpenDeleteProduct 
                                        setIsModalOpen={setIsModalOpen} 
                                        selectedProducts={selectedProducts} 
                                        onDeleteSuccess={handleDeleteSuccess}
                                    />
                                )}

                                
                            </div>

                            <div>
                                <button className="rounded-lg bg-orange-500 h-[40px] w-[150px] text-white hover:bg-orange-300">
                                    Купить
                                </button>
                            </div>

                        </div>
                    </div>

                    <InfiniteScroll
                        dataLength={currentProducts.length}
                        next={fetchMoreProducts}
                        hasMore={hasMore}
                        loader={<h4>Loading...</h4>}
                    >
                        <div className="p-5 gap-10 grid grid-cols-1">
                            {currentProducts.map((product, index) => (
                                <ProductList
                                    key={product.id}
                                    product={product}
                                    mode={'list'}
                                    checkbox={true}
                                    isSelected={selectedProducts.includes(product.id)}
                                    onProductSelected={() => handleProductSelect(product.id)}
                                />
                            ))}
                        </div>
                    </InfiniteScroll>

                </div>
            )}

        </SidebarProfileLayout>
    );
}

export default Wishlist;

const ButtonSortAndFilters = ({ 
    isFilterVisible, 
    setIsFilterVisible, 
    handleButtonClick, 
    selectedFilters, 
    setSelectedFilters, 
    selectedOrder, 
    setSelectedOrder, 
    fetchProducts 
}) => {
    
    const [filterHeight, setFilterHeight] = useState(0);
    const buttonRef = useRef(null);
    const filterRef = useRef(null);    

    // Обработчик клика по документу для закрытия блока фильтров при клике вне его
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
                setIsFilterVisible(false);
            }
        };

        if (filterRef.current) {
            setFilterHeight(filterRef.current.scrollHeight);
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
        
    }, [filterRef, buttonRef]);

    return (
        <div className="flex justify-center items-center border rounded-lg relative h-full">

            <button 
                onClick={handleButtonClick}
                className="p-2 hover:bg-orange-100"
                ref={buttonRef}
            >
                <AdjustmentsHorizontalIcon className="h-[22px] w-[22px] "/>
            </button>

            <div 
                className={`absolute top-[40px] border border-slate-300 rounded-lg z-10 bg-white min-w-[300px]
                    overflow-hidden transition-all duration-500 ease-in-out
                    ${isFilterVisible ? 'opacity-100' : 'h-0 opacity-0'}
                    `}
                    style={{
                        height: isFilterVisible ? `${filterHeight}px` : '0',
                    }}
                ref={filterRef}
            >
                <WishlistOrder selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} fetchProducts={fetchProducts}/>

                <hr/>

                <WishlistFilters selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} fetchProducts={fetchProducts}/>

            </div>

        </div>
    );
}

const WishlistFilters = ({ selectedFilters, setSelectedFilters, fetchProducts }) => {

    const filtersOptions = [
        {name: 'В наличии (1)', value: 'in_stock'},
        {name: 'Нет в наличии', value: 'out_of_stock'},
        {name: 'С уведомлениями', value: 'with_notifications'},
        {name: 'Процессоры', value: 'processors'}
    ];

    const handleFilterChange = (value) => {
        setSelectedFilters(prevFilters => {
            const updatedFilters = prevFilters.includes(value) 
                ? prevFilters.filter(filter => filter !== value) 
                : [...prevFilters, value];
                
            fetchProducts();
            return updatedFilters;
        });
    };

    return (
        <div className="px-5">
            <h1 className="text-2xl font-bold my-2">Фильтры</h1>

            {filtersOptions.map((option, index) => (
                <label 
                    key={index}
                    className="flex items-center gap-2 rounded-lg cursor-pointer h-full w-full 
                        hover:text-black hover:bg-orange-100" 
                    onClick={() => handleFilterChange(option.value)}
                >
                    <ButtonCheckbox
                        checked={selectedFilters.includes(option.value)}
                        onChange={() => handleFilterChange(option.value)}
                    />
                    <span className="peer-checked/draft:text-orange-500 cursor-pointer p-2 h-full w-full">
                        {option.name}
                    </span>
                </label>
            ))}
        </div>
    );
}

const WishlistOrder = ({ selectedOrder, setSelectedOrder, fetchProducts }) => {

    const sortingOptions = [
        {name: 'По убыванию цены', value: 'price_desc'},
        {name: 'По возрастанию цены', value: 'price_asc'},
        {name: 'По дате добавления', value: 'date_desc'},
    ];

    const handleSortChange = (value) => {
        setSelectedOrder(value);
        fetchProducts();
    };

    return (
        <div className="px-5">
            <h1 className="text-2xl font-bold my-2">Сортировка</h1>
            {sortingOptions.map((option, index) => (
                <label 
                    key={option.value}
                    className="flex items-center gap-2 rounded-lg cursor-pointer h-full w-full 
                        hover:text-black hover:bg-orange-100" 
                    onClick={() => handleSortChange(option.value)}
                >
                    <ButtonSelect
                        checked={selectedOrder === option.value}
                        onChange={() => handleSortChange(option.value)}
                    />
                    <span className="cursor-pointer p-2 h-full w-full">
                        {option.name}
                    </span>
                </label>
            ))}
        </div>
    );
}


const ModalOpenDeleteProduct = ({ setIsModalOpen, selectedProducts, onDeleteSuccess }) => {

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleDeleteProduct = () => {
        try {
            router.delete(route('profile.wishlist.delete', { product_ids: selectedProducts }),
            {
                preserveState: true,
                preserveScroll: true, // Сохраняет позицию скролла после запроса
                onSuccess: () => {
                    onDeleteSuccess(selectedProducts);
                    handleCloseModal();
                },
                onError: (error) => {
                    console.error('Ошибка при удалении товаров:', error);
                }
            });
        } catch (error) {
            console.error('Ошибка при удалении товаров:', error);
        }
    };
    



    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-2">Удаление товаров</h2>
                <p className="mb-2">Удаление товаров из списка отменяет подписку на уведомления о поступлении данных товаров</p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={() => handleDeleteProduct()}
                        className="text-black px-4 py-2 border border-slate-300 rounded-lg"
                    >
                        Удалить
                    </button>

                    <button
                        onClick={handleCloseModal}
                        className="bg-orange-500 text-white px-4 py-2 hover:bg-orange-400 rounded-lg"
                    >
                        Оставить
                    </button>
                </div>
            </div>
        </div>
    );
}