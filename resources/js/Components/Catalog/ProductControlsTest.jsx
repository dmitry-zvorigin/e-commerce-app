import { useEffect, useState, useRef } from 'react'
import Order from './Order';
import ProductList from './ProductList';
import Pagination from './Pagination';
import Filters from './Filters';
import { router, usePage } from '@inertiajs/react'
import ViewControls from './ViewControls';
import ScrollToTopButton from '@/MyComponents/ScrollToTopButton';
import { useProducts } from './useProducts'; // Импортируем наш хук

export default function ProductControlsTest() {
    const { products, category, filters_query } = usePage().props;

    const {
        state,
        dispatch,
        fetchProducts,
        productsRef,
    } = useProducts({ initialValues: filters_query, initialProducts: products.data, category });

    const applyFilters = () => {
        dispatch({ type: 'SET_PAGE', payload: 1 });
        fetchProducts(1);
    };

    const resetAllFilter = () => {
        const order = state.values['order'];
        const newValues = order ? { 'order': order } : {};
        dispatch({ type: 'SET_VALUES', payload: newValues });
        dispatch({ type: 'SET_PAGE', payload: 1 });
        fetchProducts(1);
    };

    const resetOneFilter = (filterId) => {
        const newValues = { ...state.values };
        delete newValues[filterId];
        dispatch({ type: 'SET_VALUES', payload: newValues });
        dispatch({ type: 'SET_PAGE', payload: 1 });
        fetchProducts(1);
    };

    const onPageChange = (pageNumber) => {
        dispatch({ type: 'SET_PAGE', payload: pageNumber });
        fetchProducts(pageNumber);
    };

    const loadMore = () => {
        if (state.loading) return;
        fetchProducts(state.currentPage + 1, true, false);
    };

    return (
        <div className="bg-white mt-8">
            <div className='flex flex-row'>
                <div className='rounded-md border border-slate-300 basis-2/6 h-max'>
                    <Filters 
                        values={state.values} 
                        setValues={(values) => dispatch({ type: 'SET_VALUES', payload: values })} 
                        showFilters={state.showFilters} 
                        setShowFilters={() => dispatch({ type: 'TOGGLE_FILTERS' })} 
                        resetAllFilter={resetAllFilter}
                        resetOneFilter={resetOneFilter} 
                        applyFilters={applyFilters}
                    />
                </div>
                <div className='row-span-2 col-span-2 w-full ml-5'>
                    <div className='rounded-md border border-slate-300 p-4 flex justify-between items-center' ref={productsRef}>
                        <Order 
                            values={state.values} 
                            setValues={(values) => dispatch({ type: 'SET_VALUES', payload: values })} 
                            setShowOrder={() => dispatch({ type: 'TOGGLE_ORDER' })}
                        />
                        <ViewControls/>
                    </div>
                    <div className="lg:col-span-3">
                        <ProductList products={state.currentProducts} />
                        { products.next_page_url !== null && (
                            <button 
                                className="border rounded-lg border-slate-300 h-[50px] text-center w-full"
                                onClick={loadMore}
                            >
                                {state.loading ? 'Загрузка...' : 'Показать еще'}
                            </button>
                        )}
                        { products.last_page > 1 && (
                            <Pagination data={products} onPageChange={onPageChange}/>
                        )}
                    </div>
                </div>
            </div>
            <ScrollToTopButton/>
        </div>
    );
}