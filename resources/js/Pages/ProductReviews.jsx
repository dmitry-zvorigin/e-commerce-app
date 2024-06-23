import Breadcrumbs from "@/Components/Breadcrumbs";
import Pagination from "@/Components/Pagination";
import ProductCard from "@/Components/Product/ProductCard";
import ReviewCard from "@/Components/Review/ReviewCard";
import ReviewInfoBox from "@/Components/Review/ReviewInfoBox";
import ReviewSortSelector from "@/Components/Review/ReviewSortSelector";
import ReviewsAll from "@/Components/Review/ReviewsAll";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { router } from '@inertiajs/react'
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

export default function ProductReviews({ 
    categories_menu, breadcrumbs, product, popularReview, reviewImages, ratingsGroups, averageOptionRatings, reviews 
}) {

    const reviewsRef = useRef(null);

    const [filters, setFilters] = useState({});
    const [enabledReviewPopular, setEnabledReviewPopular] = useState(true);
    
    // Загрузка
    const [loading, setLoading] = useState(false);

    const handleFilterChange = (newFilters) => {
        const updatedFilters = {
            ...filters,
            ...newFilters,
        };

        // Удаляем ключи со значением false из updatedFilters
        const cleanedFilters = Object.fromEntries(
            Object.entries(updatedFilters).filter(([_, value]) => value !== false && value !== '')
        );

        // Удаляем ключ 'order' если его значение равно 1
        if (cleanedFilters.order === '1') {
            delete cleanedFilters.order;
            
        }


        setFilters(cleanedFilters);

        // Загрузка
        setLoading(true);

        const query = {
            ...cleanedFilters,
        };

        router.get(route('product.reviews', { productSlug: product.slug }), query, {
            preserveState: true,
            preserveScroll: true,
            only: ['reviews'],
            // Загрузка
            onSuccess: () => setLoading(false),
        });
    };

    useEffect(() => {
        setEnabledReviewPopular(Object.keys(filters).length === 0);
    }, [filters]);

    // const LoadMore = () => {
    //     router.reload({
    //         method: 'get',
    //         preserveState: true,
    //         preserveScroll: true,
    //         data: { page: reviews.current_page + 1 },
    //         onFinish: () => {
    //             reviewsRef.current.scrollIntoView({ behavior: 'smooth' });
    //         },
    //         only: ['reviews'],
    //     });
    // };


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

                            <div ref={reviewsRef}>
                                <ReviewSortSelector 
                                    ratingsGroups={ratingsGroups} 
                                    filters={filters} 
                                    onFilterChange={handleFilterChange}
                                />
                            </div>
                            
                            <div>
                                {/* {loading ? (
                                    <div className="w-full p-2 mt-5 h-96">
                                        <div className="flex justify-center items-center">
                                            <div className="loader">Загрузка...</div>
                                        </div>
                                    </div>
                                ) : ( */}
                                    <>
                                        {enabledReviewPopular && (
                                            <div className="w-full p-2 mt-5">
                                                <div className="flex justify-between items-center">
                                                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Самый популярный отзыв</h2>
                                                </div>
                                                <ReviewCard review={popularReview}/>
                                                <hr/>
                                            </div>	
                                        )}
                
        
                                        <div>
                                            <ReviewsAll reviews={reviews.data} />
                                        </div>
                                    </>

                                {/* )}  */}

                            </div>

                            

                            {/* <div className="my-5">
                                <button 
                                    className="border rounded-lg w-full h-full justify-center items-center bg-gray-200 p-2 hover:bg-gray-300"
                                    onClick={LoadMore}
                                >
                                    Показать еще
                                </button>
                            </div> */}
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