import { Link } from '@inertiajs/react'
import Rating from "@/MyComponents/Rating";
import { memo } from 'react';

const ProductRatingReviews = memo(({ productSlug, productRating, ReviewsCount}) => {

    return (
        <Link 
            className="flex justify-center items-center bg-gray-100 hover:bg-gray-200 h-full w-full rounded-lg px-2 text-gray-600 text-sm select-none" 
            href={route('product.reviews', { productSlug: productSlug })}>
                <Rating value={productRating} size={'small'} precision={0.1}/>
                <p className="ml-1 h-[18px]">{ReviewsCount}</p>
        </Link>
    );
});

export default ProductRatingReviews;