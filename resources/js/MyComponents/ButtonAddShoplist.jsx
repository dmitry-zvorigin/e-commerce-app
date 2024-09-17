import { ArrowPathIcon, CheckIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Link } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'
import { useState } from "react";
import { addProductsToCart } from "@/Service/Api/Cart";
import { useMenu } from "@/Components/Context/MenuContext";
// import { useMenu } from "../Context/MenuContext";

export default function ButtonAddShoplist({ type, productId, isHover = false }) {

    const { auth } = usePage().props;
    const [loading, setLoading] = useState(false);
    const isInCart = auth.cart.some(cartItem => cartItem.product.id === productId);
    const { openMenu, startCloseMenuTimer } = useMenu();

    const handleAddToCart = (productId) => {
        setLoading(true);
        addProductsToCart(
            productId,
            () => {
                setLoading(false);
                openMenu();
                startCloseMenuTimer();
            },
            (error) => {
                console.error('Ошибка при добавление товара в корзину:', error);
            }
        );
    };  

    return (
        <div className="h-full">
            {type === 'icon' ? (

                isInCart ? (
                    <Link 
                        className="rounded-md border border-orange-500 text-orange-500 flex justify-center items-center p-3 
                            bg-gradient-to-b group-hover:from-orange-400 group-hover:to-orange-500 group-hover:text-white h-full"
                        href={route('cart')}
                        as="button"
                        disabled={loading}
                    >
                        <CheckIcon className="size-5"/>
                    </Link>
                ) : (
                    <button 
                        className="rounded-md border border-slate-300 flex justify-center items-center p-3 
                            bg-gradient-to-b group-hover:from-orange-400 group-hover:to-orange-500 group-hover:text-white h-full" 
                        onClick={() => handleAddToCart(productId)}
                        disabled={loading}
                    >
                        {loading ? (
                            <div role="status" className="text-gray-800">
                                <ArrowPathIcon className="size-5 animate-spin"/>
                                <span className="sr-only">Loading...</span>
                            </div>
                        ) : (
                            <ShoppingBagIcon className="h-5 w-5" />
                        )}
                        
                    </button>
                )

            ) : (
                isInCart ? (
                    <Link 
                        className={`border border-orange-500 text-orange-500 rounded-lg group 
                            bg-gradient-to-b group-hover:from-orange-400 group-hover:to-orange-500 group-hover:text-white h-full w-[150px] font-bold
                            ${isHover ? 'hover:from-orange-400 hover:to-orange-500 hover:text-white' : ''}
                            `}
                        href={route('cart')}
                        as="button"
                        disabled={loading}
                    >
                        В корзине
                    </Link>
                ) : (
                    <button 
                        className={`flex justify-center items-center border border-slate-300 rounded-lg group 
                            bg-gradient-to-b  h-full w-[150px] 
                            ${isHover ? 'from-orange-400 to-orange-500 text-white hover:from-orange-400 hover:to-orange-400' : 'group-hover:from-orange-400 group-hover:to-orange-500 group-hover:text-white'}
                             font-bold`}
                        onClick={() =>handleAddToCart(productId)}
                        disabled={loading}
                    >
                        {loading ? (
                            <div role="status" className="text-gray-800">
                                <ArrowPathIcon className="size-5 animate-spin"/>
                                <span className="sr-only">Loading...</span>
                            </div>
                        ) : (
                            <span>Купить</span>
                        )}
                        
                    </button>
                )

            )}
        </div>
    );

}