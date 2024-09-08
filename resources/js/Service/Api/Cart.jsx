import { router } from '@inertiajs/react';

export const deleteSelectedProducts = (itemIds, onSuccess, onError) => {
    router.delete(
        route('cart.delete', { cart_ids: itemIds }),
        {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                onSuccess();
            },
            onError: (error) => {
                console.error('Ошибка при удалении товара:', error);
                if (onError) onError(error);
            },
        }
    );
};

export const addProductsToCart = (productId, onSuccess, onError) => {
    router.post(
        route('cart.add'), { product_id: productId }, 
        {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                onSuccess();
            },
            onError: (error) => {
                console.error('Ошибка при удалении товара:', error);
                if (onError) onError(error);
            },
        }
    );
};