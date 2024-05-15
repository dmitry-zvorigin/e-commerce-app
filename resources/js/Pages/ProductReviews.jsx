import Breadcrumbs from "@/Components/Breadcrumbs";
import ProductCard from "@/Components/Product/ProductCard";
import ProductCharacteristics from "@/Components/Product/ProductCharacteristics";
import ProductDescription from "@/Components/Product/ProductDescription";
import ReviewCard from "@/Components/Review/ReviewCard";
import ReviewInfoBox from "@/Components/Review/ReviewInfoBox";
import ReviewPopular from "@/Components/Review/ReviewPopular";
import ReviewSortSelector from "@/Components/Review/ReviewSortSelector";
import ReviewsAll from "@/Components/Review/ReviewsAll";
import DefaultLayout from "@/Layouts/DefaultLayout";

export default function ProductReviews({ categories_menu, breadcrumbs, product, groupedCharacteristics, popularReview, reviewImages, reviews }) {

    console.log(product);
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
                        {/* <div className="w-full">
                            <ProductCharacteristics productName={product.name} characteristics={groupedCharacteristics} />
                            <ProductDescription description={product.description} />
                            <ReviewPopular review={popularReview} />
                        </div> */}
                        <div className="w-full">
                            <ReviewInfoBox 
                                name={product.name} 
                                rating={product.ratings_avg_rating_value} 
                                ratingCount={product.ratings_count} 
                                images={reviewImages}
                            />

                            <ReviewSortSelector/>

                            <div className="w-full p-2 mt-5">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Самый популярный отзыв</h2>
                                </div>
                                <ReviewCard review={popularReview}/>
                                <hr/>
                            </div>	     

                            <ReviewsAll reviews={product.reviews} />

                            <div>Show All</div>
                            <div>Paginate</div>
                        </div>
                    </div>



                </div>
            </div>
            </DefaultLayout>
        </>
    );

}