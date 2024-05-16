import Breadcrumbs from "@/Components/Breadcrumbs";
import Pagination from "@/Components/Pagination";
import ProductCard from "@/Components/Product/ProductCard";
import ReviewCard from "@/Components/Review/ReviewCard";
import ReviewInfoBox from "@/Components/Review/ReviewInfoBox";
import ReviewSortSelector from "@/Components/Review/ReviewSortSelector";
import ReviewsAll from "@/Components/Review/ReviewsAll";
import DefaultLayout from "@/Layouts/DefaultLayout";

export default function ProductReviews({ 
    categories_menu, breadcrumbs, product, popularReview, reviewImages, reviews, ratingsGroups, averageOptionRatings 
}) {

    // console.log(product);
    // console.log(reviews);
    // console.log(ratingsGroups);
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
                            <ReviewInfoBox 
                                name={product.name} 
                                rating={product.ratings_avg_rating_value} 
                                ratingCount={product.ratings_count} 
                                images={reviewImages}
                                ratingsGroups={ratingsGroups}
                                averageOptionRatings={averageOptionRatings}
                            />

                            <ReviewSortSelector ratingsGroups={ratingsGroups}/>

                            <div className="w-full p-2 mt-5">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Самый популярный отзыв</h2>
                                </div>
                                <ReviewCard review={popularReview}/>
                                <hr/>
                            </div>	     

                            <ReviewsAll reviews={reviews.data} />

                            <div className="my-5">
                                <button 
                                    className="border rounded-lg w-full h-full justify-center items-center bg-gray-200 p-2 hover:bg-gray-300"
                                >
                                    Показать еще
                                </button>
                            </div>
                            <div>
                                <Pagination products={reviews}/>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
            </DefaultLayout>
        </>
    );

}