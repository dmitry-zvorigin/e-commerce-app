import DefaultLayout from "@/Layouts/DefaultLayout";
import { HeartIcon, MinusIcon, PlusIcon, ShoppingCartIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, router, usePage } from "@inertiajs/react";
import '../../css/test.css';
import ButtonCheckbox from "@/MyComponents/ButtonCheckbox";
import { useReducer } from "react";
import { declineProductCount } from "@/helpers";
import { useMemo } from "react";
import { useEffect } from "react";
import { deleteSelectedProducts } from "@/Service/Api/Cart";
import { addToWishlist } from "@/Service/Api/Wishlist";
import { useState } from "react";
import ScrollToTopButton from "@/MyComponents/ScrollToTopButton";

const initialState = {
    cartItems: [],
    selectedCartItemIds: [],
    isAllCartItemsSelected: false,
    wishlist: [],
    isModalOpen: false,
    deleteMode: '',
    cartItemDelete: null,
    showSelection: false,
};

function cartReducer(state, action) {
    switch (action.type) {
        case 'SET_SELECTED_PRODUCTS':
            return {
                ...state,
                selectedCartItemIds: action.payload,
                isAllCartItemsSelected: state.cartItems.length > 0 && state.cartItems.every(cartItem => action.payload.includes(cartItem.id)),
            };
        case 'SET_IS_MODAL_OPEN': 
            return {
                ...state,
                isModalOpen: action.payload.isOpen,
                deleteMode: action.payload.deleteMode || '',
                cartItemDelete: action.payload.cartItemDelete || null,
            };
        case 'SET_PRODUCTS': 
            return {
                ...state,
                cartItems: action.payload,
            };
        case 'REMOVE_PRODUCTS': 
            return {
                ...state,
                cartItems: state.cartItems.filter(cartItem => !action.payload.includes(cartItem.id)),
                selectedCartItemIds: state.selectedCartItemIds.filter(id => !action.payload.includes(id)),
                isAllCartItemsSelected: false,
            }
        case 'UPDATE_WISHLIST':
            const isAlreadyInWishlist = state.wishlist.includes(action.payload);
            return {
                ...state,
                wishlist: isAlreadyInWishlist 
                    ? state.wishlist.filter(id => id !== action.payload) // Удаляем из избранного
                    : [...state.wishlist, action.payload], // Добавляем в избранное
            };
    }
}

export default function Cart ({  }) {

    const { data, auth } = usePage().props;

    const initialSelectedProducts = useMemo(() => data.map(item => item.id), [data]);
    const initialShowSelecteion = useMemo(() => data.length > 1, [data]);
    const isEmptyCart = data.length > 0;

    const [state, dispatch] = useReducer(cartReducer, {
        ...initialState,
        cartItems: data,
        selectedCartItemIds: initialSelectedProducts,
        isAllCartItemsSelected: true,
        wishlist: auth.wishlist,
        isModalOpen: false,
        showSelection: initialShowSelecteion,
    });

    const selectedProductCount = useMemo(() => state.selectedCartItemIds.length, [state.selectedCartItemIds]);

    const selectedProductTotalPrice = useMemo(() => {
        const totalAmount = state.cartItems
            .filter(item => state.selectedCartItemIds.includes(item.id))
            .reduce((sum, item) => sum + parseFloat(item.product.price || 0), 0);

        const initialTotalAmount = Math.round(totalAmount * 100) / 100;

        return initialTotalAmount;
    }, [state.cartItems, state.selectedCartItemIds]);

    function handleProductSelectAll() {
         
        if (state.isAllCartItemsSelected) {
            dispatch({
                type: 'SET_SELECTED_PRODUCTS',
                payload: [],
            });
        } else {
            dispatch({
                type: 'SET_SELECTED_PRODUCTS',
                payload: state.cartItems.map(item => item.id),
            });
        }

    }

    function handleDeleteProducts() {

        dispatch({
            type: 'SET_IS_MODAL_OPEN',
            payload: {
                isOpen: true,
                deleteMode: 'selected',
            }
        });
    }

    return (
        <DefaultLayout>
            <div className="bg-white">
                <div className="max-w-full mb-5">
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 my-8">Корзина</h2>
                    {isEmptyCart ? (
                        <div className="grid gap-5 grid-cols-[2fr_1fr]">

                            <div className="flex flex-col gap-5">
                                {state.showSelection && (
                                    <div className="border rounded-lg border-slate-300 flex justify-between py-5 pr-5">
                                        <div>
                                            <label className="flex justify-center items-center cursor-pointer select-none px-2">
                                                <ButtonCheckbox 
                                                    checked={state.isAllCartItemsSelected}
                                                    onChange={handleProductSelectAll}
                                                />
                                                <span className="ml-2">Выбрать все</span>
                                            </label>
                                        </div>
                                        {selectedProductCount > 0 && (
                                            <button 
                                                className="hover:text-orange-500 text-slate-400 select-none"
                                                onClick={handleDeleteProducts}
                                            >
                                                Удалить выбранные
                                            </button>
                                        )}                                    

                                    </div>
                                )}

                                {data.map((cartItem, key) => (
                                    <ProductList key={cartItem.id} cartItem={cartItem} selectedCartItemIds={state.selectedCartItemIds} dispatch={dispatch} wishlist={state.wishlist}/>
                                ))}
                                
                            </div>

                            <div className="border border-slate-300 rounded-lg h-max p-5">
                                {selectedProductCount > 0 ? (
                                    <div>
                                        {/* <h2 className="font-bold text-2xl">Условия заказа</h2> */}
                                        <div className="text-slate-400 text-sm">
                                            <p>Итого:</p>
                                        </div>
                                        <div className="flex justify-between font-bold text-2xl"> 
                                            <h2>{declineProductCount(selectedProductCount)}</h2>
                                            <h2>{selectedProductTotalPrice} ₽</h2>
                                        </div>
                                        <div className="mt-5">
                                            <button className="rounded-lg w-full h-[50px] text-white bg-gradient-to-b from-orange-400 to-orange-500 hover:from-orange-300 hover:to-orange-400">
                                                Перейти к оформлению
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <h2 className="font-bold text-sm mb-5">Выберите товары, чтобы перейти к оформлению</h2>
                                        <button 
                                            className="border border-slate-300 rounded-lg p-2 hover:bg-slate-300 select-none"
                                            onClick={handleProductSelectAll}
                                        >
                                            Выбрать все
                                        </button>
                                    </div>
                                )}
                            </div>

                            {state.isModalOpen && (
                                <ModalOpenDeleteProduct 
                                    state={state}
                                    dispatch={dispatch}
                                />
                            )}
                        </div>
                    ) : (
                        <div className="border border-slate-300 rounded-lg h-96 w-full flex  flex-col items-center justify-center mt-8">
                            <ShoppingCartIcon className="w-52 h-52 text-gray-500"/>
                            <h1 className="text-4xl font-bold">Пока пусто</h1>
                            <p>Воспользуйтесь <Link href={route('catalog')} className="text-blue-700">каталогом</Link> или поиском</p>
                        </div>
                    )}


                </div>
            </div>
            <ScrollToTopButton/>
        </DefaultLayout>
    );
}


const ProductList = ({ cartItem, selectedCartItemIds, dispatch, wishlist }) => {

    const isSelectedWishlist = wishlist.includes(cartItem.product_id);

    const handleProductSelect = (cartItemId) => {
        const updatedSelectedProducts = selectedCartItemIds.includes(cartItemId)
            ? selectedCartItemIds.filter(id => id !== cartItemId)
            : [...selectedCartItemIds, cartItemId];

        dispatch({
            type: 'SET_SELECTED_PRODUCTS',
            payload: updatedSelectedProducts,
        });
    };

    return (
        <div className="border rounded-lg border-slate-300 relative">
            <div className="absolute px-2">
                <ButtonCheckbox 
                    checked={selectedCartItemIds.includes(cartItem.id)}
                    onChange={() => handleProductSelect(cartItem.id)}
                />
            </div>
            <div className="test p-5 ml-5">
                <div className="Img flex flex-col justify-between h-[200px]">
                    <div className="w-full h-full">
                        <Link
                            href={route('product.show', { productSlug: cartItem.product.slug })}
                            className=""
                        >
                            <img
                                src={`/products_images/image_thumbnail/${cartItem.product.images[0].image_url_thumbnail}`}
                                alt={cartItem.product.name}
                                className="object-contain h-full w-full"                          
                            />
                        </Link>

                    </div>
                    <div className="text-center text-slate-500 text-sm">
                        {cartItem.product.id}
                    </div>
                </div>
                <div className="Name flex items-center">
                    <Link 
                        className="hover:text-orange-500" 
                        href={route('product.show', { productSlug: cartItem.product.slug })}>
                        <p className="">{cartItem.product.name}</p>
                    </Link>
                </div>
                <div className="Menu flex items-center justify-end">
                    <Menu isSelectedWishlist={isSelectedWishlist} cartId={cartItem.id} productId={cartItem.product.id} dispatch={dispatch}/>
                </div>
                <div className="Voblers flex items-center">
                    {/* <button className="bg-red-100 rounded-lg px-2 text-red-600 text-sm">
                        Рассрочка 0-0-12 или Выгода 3 000 ₽
                    </button> */}
                </div>
                <div className="Button flex items-center">
                    <ButtonAddProduct initialQuantity={cartItem.quantity} cartId={cartItem.id} dispatch={dispatch}/>
                </div>
                <div className="Avalis flex items-center text-sm font-bold">
                    В наличии
                </div>
                <div className="Price flex justify-end items-center">
                    <p className="font-bold text">{cartItem.product.price} ₽</p>
                    
                </div>
            </div>
        </div>
    );
}

const Menu = ({ isSelectedWishlist, cartId, productId, dispatch }) => {

    function handleDeleteProduct() {

        dispatch({
            type: 'SET_IS_MODAL_OPEN',
            payload: {
                isOpen: true,
                deleteMode: 'single',
                cartItemDelete: cartId,
            }
        });
    }

    function handleAddToWishlist() {

        addToWishlist(
            productId,
            () => {
                dispatch({
                    type: 'UPDATE_WISHLIST',
                    payload: productId,
                });
            },
            (error) => {
                console.error('Ошибка при удалении товаров:', error);
            }
        );
    }

    return (
        <div className="flex gap-2">
            <button 
                className={`p-2 rounded-lg  ${isSelectedWishlist ? 'text-orange-500 hover:bg-orange-100' : 'hover:bg-slate-200 text-slate-500'}`}
                onClick={handleAddToWishlist}
            >
                <HeartIcon className="w-5 h-5"/>
            </button>

            <button 
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-200"
                onClick={handleDeleteProduct}
            >
                <TrashIcon className="w-5 h-5"/>
            </button>
        </div>
    )
}

const ButtonAddProduct = ({ initialQuantity, cartId, dispatch }) => {

    // TODO 
    // Количество товаров, реализовать
    // const initialQuantity = 1;
    const maxQuantity = 5;
    const [quantity, setQuantiry] = useState(initialQuantity);

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantiry(prev => prev - 1);
            onChange(quantity - 1);
        } else {
            // Модальное окно удаления
            dispatch({
                type: 'SET_IS_MODAL_OPEN',
                payload: {
                    isOpen: true,
                    deleteMode: 'single',
                    cartItemDelete: cartId,
                }
            });
            console.log('Удаление');
        }
    }

    const handleIncrease = () => {
        if (quantity < maxQuantity) {
            setQuantiry(prev => prev + 1);
            onChange(quantity + 1);
        } else {
            console.log('Максимум');
        }
    }

    const handleChange = (e) => {
        const value = parseInt(e.target.value, 10);

        if (isNaN(value) || value < 1) {
            setQuantiry(1);
            console.log('нельзя меньше');
        } else if (value > maxQuantity) {
            setQuantiry(maxQuantity);
            console.log('Максимально число');
        } else {
            setQuantiry(value);
            onChange(value);
        }
    }

    return (
        <div className="flex justify-center items-center border rounded-lg p-1">
            <button 
                className="p-2"
                onClick={handleDecrease}
            >
                <MinusIcon className="w-5 h-5"/>
            </button>

            <input 
                className="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none dark:text-white"  
                type="number" 
                value={quantity}
                onChange={handleChange}
                min="1"
            />

            <button 
                className="p-2"
                onClick={handleIncrease}
            >
                <PlusIcon className="w-5 h-5"/>
            </button>
        </div>
    )
}

const ModalOpenDeleteProduct = ({ state, dispatch }) => {

    const handleCloseModal = () => {
        dispatch({
            type: 'SET_IS_MODAL_OPEN',
            payload: { 
                isOpen: false 
            },
        });
    };

    const handleDeleteProducts = () => {

        try {
            const cartIds = state.deleteMode === 'selected'
                ? state.selectedCartItemIds 
                : state.deleteMode === 'single' && state.cartItemDelete 
                ? [state.cartItemDelete]
                : '';

            if (!cartIds.length) {
                console.warn('Нет продуктов для удаления');
                return;
            }

            deleteSelectedProducts(
                cartIds,
                () => {

                    handleCloseModal();

                    dispatch({
                        type: 'REMOVE_PRODUCTS',
                        payload: cartIds,
                    });

                    if (state.deleteMode === 'selected') {
                        dispatch({ type: 'SET_SELECTED_PRODUCTS', payload: [] }); // Очистить выбранные продукты
                    } else if (state.deleteMode === 'single' && state.cartItemDelete) {
                        dispatch({
                            type: 'SET_SELECTED_PRODUCTS',
                            payload: state.selectedProducts.filter(id => id !== state.cartItemDelete), // Удалить один продукт из выбранных
                        });
                    }
                },
                (error) => {
                    console.error('Ошибка при удалении товаров:', error);
                }
            )
        } catch (error) {
            console.error('Ошибка удаления ', error);
        }
        
    };

    // useEffect(() => {
    //     document.body.style.overflow = 'hidden';

    //     return () => {
    //         document.body.style.overflow = 'auto';
    //     };
    // }, []);

    const handleClickOutside = (event) => {
        if (event.target.classList.contains('modal-overlay')) {
            handleCloseModal();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 modal-overlay" onClick={handleClickOutside}>
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full">

                <div className="bg-gray-300 rounded-t-lg flex justify-between items-center p-5">
                    <h2 className="text-xl font-bold">Удаление товаров</h2>
                    <button
                        onClick={handleCloseModal}
                        className="hover:text-gray-800 text-gray-500"
                    >
                        <XMarkIcon className="w-5 h-5 "/>
                    </button>
                </div>

                <p className="m-5">Удалить выбранный товар? Отменить действие будет невозможно.</p>

                <div className="flex justify-center space-x-4 m-5">
                    <button
                        onClick={() => handleDeleteProducts()}
                        className="text-white px-4 py-2 border border-slate-300 rounded-lg bg-red-600 hover:bg-red-500 select-none"
                    >
                        Удалить
                    </button>

                    <button
                        onClick={handleCloseModal}
                        className="text-black px-4 py-2 rounded-lg border hover:bg-slate-200 select-none"
                    >
                        Оставить
                    </button>
                </div>
            </div>
        </div>
    );
}


