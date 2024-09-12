import SidebarProfileLayout from "@/Layouts/SidebarProfileLayout";
import ProductList from "@/Components/Product/ProductList";
import { declineProductCount } from "@/helpers";
import ButtonCheckbox from "@/MyComponents/ButtonCheckbox";
import ButtonSelect from "@/MyComponents/ButtonSelect";
import { HeartIcon, AdjustmentsHorizontalIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link, router, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useReducer } from "react";
import ProductPlaceholderCard from "@/Components/Product/ProductPlaceholderCard";

const initialState = {
    selectedProducts: [],
    selectAll: false,
    selectedFilters: {
        filters: [],
        categories: [],
    },
    selectedOrder: 'date_desc',
    hasMore: true,
    currentProducts: [],
    allProducts: [],
    allProductsData: {
        totalAmount: 0,
        totalCount: 0,
    },
    currentPage: 1,
    isFilterVisible: false,
    loadingProducts: false,
};

function wishlistReducer(state, action) {
    switch (action.type) {
        case 'SET_SELECTED_PRODUCTS':
            return {
                ...state,
                selectedProducts: action.payload,
                selectAll: state.allProducts.length > 0 && state.allProducts.every(product => action.payload.includes(product.id)),
            };
        case 'SET_SELECT_ALL':
            return {
                ...state,
                selectAll: action.payload,
            };
        case 'RESET_PRODUCTS_DATA':
            return {
                ...state,
                allProductsData: {
                    totalCount: action.payload.totalCount,
                    totalAmount: action.payload.totalAmount,
                },
            };
        case 'UPDATE_SELECTED_PRODUCTS_DATA':
            return {
                ...state,
                allProductsData: {
                    totalCount: action.payload.totalCount,
                    totalAmount: action.payload.totalAmount,
                },
            };
        case 'UPDATE_CURRENT_PRODUCTS':
            return {
                ...state,
                currentProducts: action.payload,
            };
        case 'UPDATE_ALL_PRODUCTS':
            return {
                ...state,
                allProducts: action.payload,
            };
        case 'LOAD_MORE_PRODUCTS':
            return {
                ...state,
                currentProducts: [...state.currentProducts, ...action.payload],
                currentPage: state.currentPage + 1,
            };
        case 'SET_FILTERS': 
            return {
                ...state,
                selectedFilters: {
                    filters: action.payload.filters || state.selectedFilters.filters,
                    categories: action.payload.categories || state.selectedFilters.categories,
                },
            };
        case 'DESTROY_FILTERS':
            return {
                ...state,
                selectedFilters: {
                    filters: [],
                    categories: [],
                },
            };
        case 'SET_ORDER': 
            return {
                ...state,
                selectedOrder: action.payload,
            };
        case 'SET_IS_FILTER_VISIBLE': 
            return {
                ...state,
                isFilterVisible: action.payload,
            }
        case 'SET_IS_MODAL_OPEN': 
            return {
                ...state,
                isModalOpen: action.payload,
            }
        case 'SET_HAS_MORE':
            return {
                ...state,
                hasMore: action.payload,
            };
        case 'SET_LOADING_PRODUCTS':
            return {
                ...state,
                loadingProducts: action.payload,
            }
        case 'SET_CURRENT_PAGE': 
            return {
                ...state,
                currentPage: action.payload,
            }
        case 'RESET_PRODUCTS':
            return {
                ...state,
                loadingProducts: action.payload.loadingProducts,
                currentProducts: action.payload.currentProducts,
                currentPage: action.payload.currentPage,
                hasMore: action.payload.hasMore,
            };
        case 'UPDATE_PRODUCTS':
            return {
                ...state,
                loadingProducts: action.payload.loadingProducts,
                currentProducts: action.payload.currentProducts,
                allProducts: action.payload.allProducts,
                selectedProducts: action.payload.selectedProducts,
                hasMore: action.payload.hasMore,
            }
        default: 
            return state;
    }
}

const Wishlist = () => {
    const { products, filter_query, all_products, categoryOptions } = usePage().props;

    const totalAmount = all_products.reduce((sum, product) => {
        return sum + parseFloat(product.price || 0);
    }, 0);
    const initialTotalAmount = Math.round(totalAmount * 100) / 100;
    const initialTotalCount = all_products.length;

    const [state, dispatch] = useReducer(wishlistReducer, {
        ...initialState,
        currentProducts: products.data,
        allProducts: all_products,
        allProductsData: {
            totalAmount: initialTotalAmount,
            totalCount: initialTotalCount,
        },
        selectedFilters: {
            filters: filter_query.filters ? filter_query.filters.split(',') : [],
            categories: filter_query.categories ? filter_query.categories.split(',') : [],
        },
        selectedOrder: filter_query.order || 'date_desc',
        hasMore: !!products.next_page_url,
    });

    const fetchProducts = (updatedFilters = state.selectedFilters, updatedOrder = state.selectedOrder) => {
        dispatch({
            type: 'RESET_PRODUCTS',
            payload: {
                loadingProducts: true,
                currentProducts: [],
                currentPage: 1,
                hasMore: true,
            }
        })
        const params = {};

        if (updatedOrder !== 'date_desc') {
            params.order = updatedOrder;
        }
        
        if (updatedFilters.filters.length > 0) {
            params.filters = updatedFilters.filters.join(',');
        }

        if (updatedFilters.categories.length > 0) {
            params.categories = updatedFilters.categories.join(',');
        }

        router.get(route('profile.wishlist'), params, {
            preserveState: true,
            preserveScroll: true,
            only: ['products', 'all_products'],
            onSuccess: (page) => {

                dispatch({
                    type: 'UPDATE_PRODUCTS',
                    payload: {
                        currentProducts: page.props.products.data,
                        allProducts: page.props.all_products,
                        selectedProducts: [],
                        loadingProducts: false,
                        hasMore: !!page.props.products.next_page_url,
                    }
                });

            }
        });
    };

    const handleSelectAll = () => {
        if (state.selectAll) {
            dispatch({
                type: 'SET_SELECTED_PRODUCTS',
                payload: [],
            });
        } else {
            dispatch({
                type: 'SET_SELECTED_PRODUCTS',
                payload: state.allProducts.map(product => product.id),
            });
        }
    };
    
    const handleProductSelect = (productId) => {
        const updatedSelectedProducts = state.selectedProducts.includes(productId)
            ? state.selectedProducts.filter(id => id !== productId)
            : [...state.selectedProducts, productId];

        dispatch({
            type: 'SET_SELECTED_PRODUCTS',
            payload: updatedSelectedProducts,
        });
    };

    const handleDeleteClick = () => {
        dispatch({
            type: 'SET_IS_MODAL_OPEN',
            payload: true,
        });
    };

    const handleDeleteSuccess = (deletedProductIds) => {
        // console.log(state.categoryOptions);
        const updatedCurrentProducts = state.currentProducts.filter(product => !deletedProductIds.includes(product.id));
        const updatedAllProducts = state.allProducts.filter(product => !deletedProductIds.includes(product.id));
    
        if (updatedAllProducts.length === 0) {

            const updatedFilters = {
                filters: [],
                categories: [],
            };
            // dispatch({
            //     type: 'DESTROY_FILTERS',
            // });

            dispatch({
                type: 'SET_FILTERS',
                payload: updatedFilters,
            });

            fetchProducts(updatedFilters);
        } else {
            dispatch({
                type: 'UPDATE_PRODUCTS',
                payload: {
                    currentProducts: updatedCurrentProducts,
                    allProducts: updatedAllProducts,
                    selectedProducts: [],
                }
            });
        }
    };

    const fetchMoreProducts = () => {

        const params = {};

        if (state.selectedOrder !== 'date_desc') {
            params.order = state.selectedOrder;
        }

        if (state.selectedFilters.filters.length > 0) {
            params.filters = state.selectedFilters.filters.join(',');
        }

        if (state.selectedFilters.categories.length > 0) {
            params.categories = state.selectedFilters.categories.join(',');
        }

        const nextPage = state.currentPage + 1;
        params.page = nextPage;
        
        router.get(route('profile.wishlist'), params , {
            preserveState: true,
            preserveScroll: true,
            only: ['products'],
            onSuccess: (page) => {
                if (page.props.products.data.length > 0) {
                    dispatch({
                        type: 'LOAD_MORE_PRODUCTS',
                        payload: page.props.products.data,
                    });

                    dispatch({
                        type: 'SET_CURRENT_PAGE',
                        payload: nextPage,
                    });

                } else {
                    dispatch({
                        type: 'SET_HAS_MORE',
                        payload: false,
                    });
                }

                // Удаляем параметр page из URL
                const url = new URL(window.location);
                url.searchParams.delete('page');
                window.history.replaceState(null, '', url);
            }
        });
    };

    const handleButtonClick = (event) => {
        event.stopPropagation();
        dispatch({
            type: 'SET_IS_FILTER_VISIBLE',
            payload: (!state.isFilterVisible),
        });
    }

    useEffect(() => {
        // Проверяем, выбраны ли все продукты
        const allSelected = state.allProducts.length > 0 && state.allProducts.every(product => state.selectedProducts.includes(product.id));

        dispatch({
            type: 'SET_SELECT_ALL',
            payload: allSelected,
        });

        // Обновляем количество и сумму выбранных товаров
        if (state.selectedProducts.length === 0) {
            // Возвращаем к исходным значениям, если ни один товар не выбран
            dispatch({
                type: 'RESET_PRODUCTS_DATA',
                payload: {
                    totalCount: initialTotalCount,
                    totalAmount: initialTotalAmount,
                },
            });

        } else {
            // Вычисляем общую сумму выбранных продуктов
            const totalAmount = state.selectedProducts.reduce((sum, productId) => {
                const product = state.allProducts.find(p => p.id === productId);
                return sum + (product ? parseFloat(product.price) : 0);
            }, 0);

            // Округление суммы до двух десятичных знаков
            const roundedTotalAmount = Math.round(totalAmount * 100) / 100;

            dispatch({
                type: 'UPDATE_SELECTED_PRODUCTS_DATA',
                payload: {
                    totalCount: state.selectedProducts.length,
                    totalAmount: roundedTotalAmount,
                },
            });
        }
    }, [state.selectedProducts, state.currentProducts, state.allProducts]);

    return (
        <SidebarProfileLayout>
            {state.allProductsData.totalCount < 1 ? (
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
                            {`${declineProductCount(state.allProductsData.totalCount ?? initialTotalCount)} 
                                на сумму: ${state.allProductsData.totalAmount ?? initialTotalAmount} P`
                            }
                        </div>

                        <div className="flex justify-between items-center">

                            <div className="flex justify-center items-center gap-4">

                                <label 
                                    className="flex justify-center items-center border rounded-lg p-1 h-[40px]
                                        gap-1 hover:bg-orange-100 w-full cursor-pointer"
                                        onClick={(e) => e.stopPropagation()}
                                >
                                    <ButtonCheckbox checked={state.selectAll} onChange={handleSelectAll} />
                                    <span className="mx-2 text-sm text-gray-600 select-none">Выбрать все</span>
                                </label>

                                <ButtonSortAndFilters 
                                    handleButtonClick={handleButtonClick} 
                                    isFilterVisible={state.isFilterVisible} 
                                    selectedFilters={state.selectedFilters}
                                    categoryOptions={categoryOptions}
                                    selectedOrder={state.selectedOrder}
                                    fetchProducts={fetchProducts}
                                    dispatch={dispatch}
                                />


                                {state.selectedProducts.length > 0 && (
                                    <div className="flex justify-center items-center border rounded-lg relative h-full">
                                        <button 
                                            className="p-2 hover:bg-orange-100"
                                            onClick={() => handleDeleteClick()}
                                        >
                                            <TrashIcon className="h-[22px] w-[22px] "/>
                                        </button>
                                    </div>
                                )}
                                {state.isModalOpen && (
                                    <ModalOpenDeleteProduct 
                                        selectedProducts={state.selectedProducts} 
                                        onDeleteSuccess={handleDeleteSuccess}
                                        dispatch={dispatch}
                                    />
                                )}

                                
                            </div>

                            <div>
                                <button className="rounded-lg h-[40px] w-[150px] text-white bg-gradient-to-b from-orange-400 to-orange-500 hover:from-orange-300 hover:to-orange-400">
                                    Купить
                                </button>
                            </div>

                        </div>
                    </div>

                    <InfiniteScroll
                        dataLength={state.currentProducts.length}
                        next={fetchMoreProducts}
                        hasMore={state.hasMore}
                        loader={<div className="px-5 flex justify-center items-center">Загрузка...</div>}
                    >  
                        {state.loadingProducts ? (
                            <div className="p-5 gap-10 grid grid-cols-1">
                                <ProductPlaceholderCard mode="list" count={5}/>
                            </div>
                        ): (
                            <div className="p-5 gap-10 grid grid-cols-1">
                                {state.currentProducts.map((product, index) => (
                                    <ProductList
                                        key={product.id}
                                        product={product}
                                        mode={'list'}
                                        checkbox={true}
                                        isSelected={state.selectedProducts.includes(product.id)}
                                        onProductSelected={() => handleProductSelect(product.id)}
                                    />
                                ))}
                            </div>
                        )}

                    </InfiniteScroll>
                    

                </div>
            )}

        </SidebarProfileLayout>
    );
}

export default Wishlist;

const ButtonSortAndFilters = ({ 
    isFilterVisible, 
    handleButtonClick, 
    selectedFilters, 
    categoryOptions,
    selectedOrder, 
    fetchProducts,
    dispatch
}) => {
    
    const [filterHeight, setFilterHeight] = useState(0);
    const buttonRef = useRef(null);
    const filterRef = useRef(null);    

    const hasFiltersOrSort = selectedFilters.length > 0 || selectedOrder !== 'date_desc';
    // Обработчик клика по документу для закрытия блока фильтров при клике вне его
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
                dispatch({ 
                    type: 'SET_IS_FILTER_VISIBLE', 
                    payload: false 
                });
            }
        };

        if (filterRef.current) {
            setFilterHeight(filterRef.current.scrollHeight);
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
        
    }, [filterRef, buttonRef, categoryOptions]);

    return (
        <div className="flex justify-center items-center border rounded-lg relative h-full">

            <button 
                onClick={handleButtonClick}
                // className="p-2 hover:bg-orange-100"
                className={`p-2 rounded-lg ${hasFiltersOrSort ? 'bg-orange-500 text-white' : 'hover:bg-orange-100'}`}
                ref={buttonRef}
            >
                <AdjustmentsHorizontalIcon className="h-[22px] w-[22px] "/>
            </button>

            {/* {hasFiltersOrSort && (
                <div className="absolute z-50 right-1 top-1">
                    <div className="rounded-full bg-orange-500 w-3 h-3"></div>
                </div>
            )} */}

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
                <WishlistOrder selectedOrder={selectedOrder} fetchProducts={fetchProducts} dispatch={dispatch}/>

                <hr/>

                <WishlistFilters selectedFilters={selectedFilters} categoryOptions={categoryOptions} fetchProducts={fetchProducts} dispatch={dispatch}/>

            </div>

        </div>
    );
}

const WishlistFilters = ({ selectedFilters, categoryOptions, fetchProducts, dispatch }) => {

    const filtersOptions = [
        {name: 'В наличии (1)', value: 'in_stock'},
        {name: 'Нет в наличии', value: 'out_of_stock'},
        {name: 'С уведомлениями', value: 'with_notifications'},
    ];

    // const handleFilterChange = (value) => {
    //     const updatedFilters = selectedFilters.includes(value)
    //         ? selectedFilters.filter(filter => filter !== value)
    //         : [...selectedFilters, value];

    //         dispatch({
    //             type: 'SET_FILTERS',
    //             payload: updatedFilters,
    //         });
    //         fetchProducts(updatedFilters);
    // };

    const handleFilterChange = (value) => {
        const isCategoryFilter = categoryOptions.some(option => option.slug === value);
        let updatedFilters;

        if (isCategoryFilter) {
            const updatedCategories = selectedFilters.categories.includes(value)
                ? selectedFilters.categories.filter(filter => filter !== value)
                : [...selectedFilters.categories, value];

            updatedFilters = {
                ...selectedFilters,
                categories: updatedCategories
            };
        } else {
            const updatedOtherFilters = selectedFilters.filters.includes(value)
                ? selectedFilters.filters.filter(filter => filter !== value)
                : [...selectedFilters.filters, value];

            updatedFilters = {
                ...selectedFilters,
                filters: updatedOtherFilters
            };
        }

        dispatch({
            type: 'SET_FILTERS',
            payload: updatedFilters,
        });

        fetchProducts(updatedFilters);
    };


    return (
        <div className="px-5">
            <h1 className="text-2xl font-bold my-2">Фильтры</h1>

            {filtersOptions.map((option, index) => (
                <label 
                    key={index}
                    className="flex items-center gap-2 rounded-lg cursor-pointer h-full w-full 
                        hover:text-black hover:bg-orange-100" 
                    // onClick={() => handleFilterChange(option.value)}
                >
                    <ButtonCheckbox
                        checked={selectedFilters.filters.includes(option.value)}
                        onChange={() => handleFilterChange(option.value)}
                    />
                    <span className="peer-checked/draft:text-orange-500 cursor-pointer p-2 h-full w-full">
                        {option.name}
                    </span>
                </label>
            ))}
            {categoryOptions.map((option, index) => (
                <label 
                    key={option.id}
                    className="flex items-center gap-2 rounded-lg cursor-pointer h-full w-full 
                        hover:text-black hover:bg-orange-100" 
                    // onClick={() => handleFilterChange(option.value)}
                >
                    <ButtonCheckbox
                        checked={selectedFilters.categories.includes(option.slug)}
                        onChange={() => handleFilterChange(option.slug)}
                    />
                    <span className="peer-checked/draft:text-orange-500 cursor-pointer p-2 h-full w-full">
                        {option.name}
                    </span>
                </label>
            ))}
        </div>
    );
}

const WishlistOrder = ({ selectedOrder, fetchProducts, dispatch }) => {

    const sortingOptions = [
        {name: 'По убыванию цены', value: 'price_desc'},
        {name: 'По возрастанию цены', value: 'price_asc'},
        {name: 'По дате добавления', value: 'date_desc'},
    ];

    const handleSortChange = (value) => {
        dispatch({
            type: 'SET_ORDER',
            payload: value,
        });
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

const ModalOpenDeleteProduct = ({ selectedProducts, onDeleteSuccess, dispatch }) => {

    const handleCloseModal = () => {
        dispatch({
            type: 'SET_IS_MODAL_OPEN', 
            payload: false
        })
    };

    const handleDeleteProduct = () => {
        dispatch({
            type: 'SET_LOADING_PRODUCTS',
            payload: true,
        });
        router.delete(route('profile.wishlist.delete', { product_ids: selectedProducts }),
        {
            preserveState: true,
            preserveScroll: true, // Сохраняет позицию скролла после запроса
            onSuccess: () => {
                onDeleteSuccess(selectedProducts);
                handleCloseModal();
                dispatch({
                    type: 'SET_LOADING_PRODUCTS',
                    payload: false,
                });
                // Удаляем параметр page из URL
                const url = new URL(window.location);
                url.searchParams.delete('page');
                window.history.replaceState(null, '', url);
            },
            onError: (error) => {
                console.error('Ошибка при удалении товаров:', error);
            }
        });
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