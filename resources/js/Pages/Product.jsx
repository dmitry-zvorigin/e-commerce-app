import Breadcrumbs from "@/Components/Breadcrumbs";
import ProductCard from "@/Components/Product/ProductCard";
import ProductCharacteristics from "@/Components/Product/ProductCharacteristics";
import ProductDescription from "@/Components/Product/ProductDescription";
import ReviewCard from "@/Components/Review/ReviewCard";
import ReviewPopular from "@/Components/Review/ReviewPopular";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { InertiaLink } from "@inertiajs/inertia-react";

export default function Product({ categories_menu, breadcrumbs, product, groupedCharacteristics, popularReview, reviewImages }) {

    return (
        <>
            <DefaultLayout categories_menu={categories_menu}>
            <div className="bg-white">
                <div className="max-w-full py-16">
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                        {product.name}
                    </h2>

                    <ProductCard product={product} reviewImages={reviewImages} />

                    <div className="flex mt-5">
                        <div className="w-2/4 mr-8">
                            <div className="border border-slate-300 rounded-lg p-2 flex flex-col">
                                <h2>Характеристики</h2>
                                <h2>Отзывы {product.ratings_count}</h2>
                            </div>
                        </div>
                        <div className="w-full">
                            <ProductCharacteristics productName={product.name} characteristics={groupedCharacteristics} />
                            <ProductDescription description={product.description} />

                            <div className="border border-slate-300 rounded-lg w-full p-2 mt-5">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Самый популярный отзыв</h2>
                                    <InertiaLink 
                                        className="text-blue-600 hover:text-orange-400"
                                        href={route('product.reviews', { productSlug: product.slug })}>
                                            Все отзывы
                                    </InertiaLink>
                                </div>
                                <ReviewCard review={popularReview}/>
                                <InertiaLink 
                                        className="border border-slate-300 rounded-lg p-2 
                                        flex justify-center items-center mt-5 w-full bg-gray-200
                                        hover:bg-gray-300
                                        "
                                        href={route('product.reviews', { productSlug: product.slug })}>
                                            Все отзывы {product.reviews_count}
                                </InertiaLink>
                            </div>	
                        </div>
                    </div>



                </div>
            </div>
            </DefaultLayout>
        </>
    );

}