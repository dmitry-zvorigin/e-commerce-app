import { InertiaLink } from "@inertiajs/inertia-react";
import ReviewCard from "./ReviewCard";

export default function ReviewPopular({ review, productSlug }) {
    return (
        <div className="border border-slate-300 rounded-lg w-full p-2 mt-5">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Самый популярный отзыв</h2>
                <InertiaLink 
                    className="text-blue-600 hover:text-orange-400"
                    href={route('product.reviews', { productSlug: productSlug })}>
                        Все отзывы
                </InertiaLink>
            </div>
            <ReviewCard review={review}/>

            <InertiaLink 
                    className="border border-slate-300 rounded-lg p-2 
                    flex justify-center items-center mt-5 w-full bg-gray-200
                    hover:bg-gray-300
                    "
                    href={route('product.reviews', { productSlug: productSlug })}>
                        Все отзывы 576
            </InertiaLink>
        </div>	
    );
}