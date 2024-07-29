import { useReducer, useEffect, useRef } from 'react';
import { router, usePage } from '@inertiajs/react'

const initialState = {
    values: {},
    currentPage: 1,
    currentProducts: [],
    loading: false,
    showFilters: false,
    showOrder: false,
};

const actions = {
    SET_VALUES: 'SET_VALUES',
    SET_PAGE: 'SET_PAGE',
    SET_PRODUCTS: 'SET_PRODUCTS',
    SET_LOADING: 'SET_LOADING',
    TOGGLE_FILTERS: 'TOGGLE_FILTERS',
    TOGGLE_ORDER: 'TOGGLE_ORDER',
};

function reducer(state, action) {
    switch (action.type) {
        case actions.SET_VALUES:
            return { ...state, values: action.payload };
        case actions.SET_PAGE:
            return { ...state, currentPage: action.payload };
        case actions.SET_PRODUCTS:
            return { ...state, currentProducts: action.payload };
        case actions.SET_LOADING:
            return { ...state, loading: action.payload };
        case actions.TOGGLE_FILTERS:
            return { ...state, showFilters: !state.showFilters };
        case actions.TOGGLE_ORDER:
            return { ...state, showOrder: !state.showOrder };
        default:
            return state;
    }
}

export function useProducts({ initialValues, initialProducts, category }) {
    const [state, dispatch] = useReducer(reducer, {
        ...initialState,
        values: initialValues,
        currentProducts: initialProducts,
    });

    const productsRef = useRef(null);

    const buildQuery = (values, page) => {
        const query = Object.fromEntries(
            Object.entries(values).map(([key, value]) => [key, value.join(',')])
        );
        query.page = page;
        return query;
    };

    const fetchProducts = async (page = 1, append = false, ref = true) => {
        const query = buildQuery(state.values, page);
        dispatch({ type: actions.SET_LOADING, payload: true });

        try {
            const response = await router.get(route(route().current(), { categorySlug: category.slug }), query, {
                preserveState: true,
                preserveScroll: true,
                only: ['products'],
            });

            const products = response.props.products;

            dispatch({
                type: actions.SET_PRODUCTS,
                payload: append ? [...state.currentProducts, ...products.data] : products.data,
            });
            dispatch({ type: actions.SET_PAGE, payload: products.current_page });
        } finally {
            dispatch({ type: actions.SET_LOADING, payload: false });
            if (ref && productsRef.current) {
                productsRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    useEffect(() => {
        fetchProducts(1);
    }, [state.values]);

    return {
        state,
        dispatch,
        fetchProducts,
        productsRef,
    };
}