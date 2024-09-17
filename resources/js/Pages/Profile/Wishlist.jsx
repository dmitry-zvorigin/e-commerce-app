import SidebarProfileLayout from "@/Layouts/SidebarProfileLayout";
import { declineProductCount } from "@/helpers";
import ButtonCheckbox from "@/MyComponents/ButtonCheckbox";
import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link, router, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useReducer } from "react";
import ProductPlaceholderCard from "@/Components/Product/ProductPlaceholderCard";
import ButtonSortAndFilters from "@/Components/Wishlist/ButtonSortAndFilters";
import DeleteWarningModal from "@/Components/Wishlist/DeleteWarningModal";
import { WishlistReducer, initialState } from "@/Reducers/WishlistReducer";
import { useCallback } from "react";
import { useMemo } from "react";
import ProductList from "@/Components/Product/ProductList";

const Wishlist = () => {
    const { products, filter_query, all_products, categoryOptions } = usePage().props;

    const initialTotalCount = all_products.length;

    const totalAmount = useMemo(() => {
        return all_products.reduce((sum, product) => {
            return sum + parseFloat(product.price || 0);
        }, 0);
    }, [all_products]);
    
    const initialTotalAmount = useMemo(() => Math.round(totalAmount * 100) / 100, [totalAmount]);

    console.log(products);
    const [state, dispatch] = useReducer(WishlistReducer, {
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

    const fetchProducts = useCallback((updatedFilters = state.selectedFilters, updatedOrder = state.selectedOrder) => {
        dispatch({
            type: 'RESET_PRODUCTS',
            payload: {
                loadingProducts: true,
                currentProducts: [],
                currentPage: 1,
                hasMore: true,
            }
        });

        const params = generateParams(updatedFilters, updatedOrder);

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
    }, [state.selectedFilters, state.selectedOrder]);

    const handleSelectAll = useCallback(() => {
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
    }, [state.selectAll, state.allProducts]);
    
    const handleProductSelect = useCallback((productId) => {
        const updatedSelectedProducts = state.selectedProducts.includes(productId)
            ? state.selectedProducts.filter(id => id !== productId)
            : [...state.selectedProducts, productId];
    
        dispatch({
            type: 'SET_SELECTED_PRODUCTS',
            payload: updatedSelectedProducts,
        });
    }, [state.selectedProducts]);

    const handleDeleteClick = () => {
        dispatch({
            type: 'SET_IS_MODAL_OPEN',
            payload: true,
        });
    };

    const handleDeleteSuccess = (deletedProductIds) => {
        const updatedCurrentProducts = state.currentProducts.filter(product => !deletedProductIds.includes(product.id));
        const updatedAllProducts = state.allProducts.filter(product => !deletedProductIds.includes(product.id));
    
        if (updatedAllProducts.length === 0) {

            const updatedFilters = {
                filters: [],
                categories: [],
            };

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

            // if (updatedCurrentProducts.length < state.currentPage * productPerPage) {
            //     fetchMoreProducts();
            // }
        }
    };

    const fetchMoreProducts = () => {

        const nextPage = state.currentPage + 1;
        const params = generateParams(state.selectedFilters, state.selectedOrder);
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

                const url = new URL(window.location);
                url.searchParams.delete('page');
                window.history.replaceState(null, '', url);
            }
        });
    };

    const generateParams = (filters, order) => {
        const params = {};

        if (order != 'date_desc') {
            params.order = order;
        }

        if (filters.filters.length > 0) {
            params.filters = filters.filters.join(',');
        }

        if (filters.categories.length > 0) {
            params.categories = filters.categories.join(',');
        }

        return params;
    };

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
                                    <DeleteWarningModal selectedProducts={state.selectedProducts} onDeleteSuccess={handleDeleteSuccess} dispatch={dispatch}/>
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