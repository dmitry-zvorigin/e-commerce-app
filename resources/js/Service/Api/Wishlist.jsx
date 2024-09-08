import { router } from '@inertiajs/react';

export const addToWishlist = (productId, onSuccess, onError) => {
    router.post(
        route('wishlist.add'), { product_id: productId },
        {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {              
                onSuccess();
            },
            onError: (error) => {
                console.error('Ошибка добавления товара:', error);
                if (onError) onError(error);
            },
        }
    )
};

// const handleAddToWishlist = (productId) => {
//     if (auth.user) {
//         setLoadingProductId(productId);
//         router.post(route('wishlist.add'), { product_id: productId }, {
//             preserveScroll: true,
//             preserveState: true,
//             onSuccess: (page) => {
//                 setWishlist(page.props.auth.wishlist);
//                 setLoadingProductId(null);
//             },
//             onError: () => {
//                 setLoadingProductId(null);
//             }
//         })
//     } else {
//         let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
//         if (!wishlist.includes(productId)) {
//             wishlist.push(productId);
//             localStorage.setItem('wishlist', JSON.stringify(wishlist));
//         }
//     }
// };

// export const deleteSelectedProducts = (itemIds, onSuccess, onError) => {
//     router.delete(
//         route('cart.delete', { cart_ids: itemIds }),
//         {
//             preserveScroll: true,
//             preserveState: true,
//             onSuccess: () => {
//                 onSuccess();
//             },
//             onError: (error) => {
//                 console.error('Ошибка при удалении товара:', error);
//                 if (onError) onError(error);
//             },
//         }
//     );
// };