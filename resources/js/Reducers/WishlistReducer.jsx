export const initialState = {
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
    loadingProducts: false,
};

export function WishlistReducer(state, action) {
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