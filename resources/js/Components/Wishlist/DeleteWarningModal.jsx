import { router } from "@inertiajs/react";

export default function DeleteWarningModal ({ selectedProducts, onDeleteSuccess, dispatch }) {

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