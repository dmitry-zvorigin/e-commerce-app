import { ArrowPathIcon, HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HearIconSolid } from "@heroicons/react/24/solid";
import { usePage } from '@inertiajs/react'
import { useState } from "react";
import { addToWishlist } from "@/Service/Api/Wishlist";

export default function ButtonAddWishlist({ productId, size = 10 }) {

    const { auth } = usePage().props;
    const [loading, setLoading] = useState(false);
    const isInWishlist = auth.wishlist.includes(productId);

    const handleAddWishlist = (productId) => {
        setLoading(true);
        addToWishlist(
            productId,
            () => {
                setLoading(false);
            },
            (error) => {
                console.error('Ошибка при добавление товара в избранное:', error);
            }
        )
    };
    
    return (
        <button 
            // className="group/wishlist rounded-md flex justify-center items-center p-3 border border-gray-100 bg-gray-100 hover:bg-gray-200 size-[60px]"  
            className={`group/wishlist rounded-md flex justify-center items-center p-3 border border-gray-100 bg-gray-100 hover:bg-gray-200 size-[${size}px]`}
            onClick={() => handleAddWishlist(productId)}
            disabled={loading}
        >
            {loading ? (
                <div role="status" className="animate-spin text-gray-800">
                    <ArrowPathIcon className="w-5 h-5"/>
                    <span className="sr-only">Loading...</span>
                </div>
            ) : (
                isInWishlist ? (
                    <HearIconSolid className="size-5 text-red-600"/>
                ) : (
                    <HeartIcon className="size-5 text-slate-500 group-hover/wishlist:text-black"/>
                )
                
            )}
            
        </button>
    );
}