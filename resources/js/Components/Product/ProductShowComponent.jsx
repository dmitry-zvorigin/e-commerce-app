import ProductCharacteristics from "@/Components/Product/ProductCharacteristics";
import ProductDescription from "@/Components/Product/ProductDescription";
import ReviewCard from "@/Components/Review/ReviewCard";
import { Link } from '@inertiajs/react'

const ProductShowComponent = ({ product, characteristics, popularReview }) => {

    return (
        <>
            <ProductCharacteristics productName={product.name} characteristics={characteristics} />
            <ProductDescription description={product.description} />

            <div className="border border-slate-300 rounded-lg w-full p-2 mt-5">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Самый популярный отзыв</h2>
                    <Link 
                        className="text-blue-600 hover:text-orange-400"
                        href={route('product.reviews', { productSlug: product.slug })}>
                            Все отзывы
                    </Link>
                </div>
                <ReviewCard review={popularReview}/>
                <Link 
                        className="border border-slate-300 rounded-lg p-2 
                        flex justify-center items-center w-full bg-gray-200
                        hover:bg-gray-300
                        "
                        href={route('product.reviews', { productSlug: product.slug })}>
                            Все отзывы {product.ratings_count}
                </Link>
            </div>	
        </>

    );
};

export default ProductShowComponent;
