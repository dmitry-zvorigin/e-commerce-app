import ReviewCard from "@/Components/Review/ReviewCard";
import ReviewInfoBox from "@/Components/Review/ReviewInfoBox";
import ReviewsAll from "@/Components/Review/ReviewsAll";
import ReviewSortSelector from "@/Components/Review/ReviewSortSelector";
import Pagination from "@/Components/Review/Pagination";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { router, usePage } from '@inertiajs/react'

export default function ProductReviewsComponent() {

    const { product, popularReview, reviewImages, ratingsGroups, averageOptionRatings, reviews, request } = usePage().props;

    const reviewsRef = useRef(null);

    const [filters, setFilters] = useState(request);
    const [enabledReviewPopular, setEnabledReviewPopular] = useState(true);

    const [currentReviews, setCurrentReviews] = useState(reviews.data);
    const [currentPage, setCurrentPage] = useState(reviews.current_page);
    const [perPage, setPerPage] = useState(reviews.per_page);
    const [totalReviews, setTotalReviews] = useState(reviews.total);
    
    // Загрузка
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setEnabledReviewPopular(Object.keys(filters).length === 0 && currentPage === 1);
    }, [filters, currentPage]);

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
        
        fetchReviews({ newFilters: cleanedFilters });

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
            onSuccess: (page) => {
                setCurrentReviews(page.props.reviews.data);
                setCurrentPage(page.props.reviews.current_page);
                setTotalReviews(page.props.reviews.total);
                setPerPage(page.props.reviews.per_page);
                setLoading(false);
            },
            onError: () => setLoading(false),
        });
    };

    const loadMore = () => {
        if (loading) return;

        // fetchReviews({ page: currentPage + 1 });
        const nextPage = currentPage + 1;
        setLoading(true);

        router.get(route('product.reviews', { productSlug: product.slug }), { ...filters, page: nextPage }, {
            preserveState: true,
            preserveScroll: true,
            only: ['reviews'],
            onSuccess: (page) => {
                setCurrentReviews(prevReviews => [...prevReviews, ...page.props.reviews.data]);
                setCurrentPage(page.props.reviews.current_page);
                setTotalReviews(page.props.reviews.total);
                setPerPage(page.props.reviews.per_page);
                setLoading(false);
            },
            onError: () => setLoading(false),

        });
    };

    const fetchReviews = ({ newFilters, page = 1 } = {}) => {
    
        const query = {
            ...filters,
            newFilters,
            page,
        };
    
        router.get(route('product.reviews', { productSlug: product.slug }), query, {
            preserveState: true,
            preserveScroll: true,
            only: ['reviews'],
            onSuccess: (page) => {
                setCurrentReviews(page.props.reviews.data);
                setCurrentPage(page.props.reviews.current_page);
                setTotalReviews(page.props.reviews.total);
                setPerPage(page.props.reviews.per_page);
            },
            onFinish: () => {
                reviewsRef.current.scrollIntoView({ behavior: 'smooth' });
            },
        });
    };

    const resetFilters = () => {
        setFilters({});
        setLoading(true);

        router.get(route('product.reviews', { productSlug: product.slug }), {}, {
            preserveScroll: true,
            preserveState: true,
            only: ['reviews'],
            onSuccess: (page) => {
                setCurrentReviews(page.props.reviews.data);
                setCurrentPage(page.props.reviews.current_page);
                setTotalReviews(page.props.reviews.total);
                setPerPage(page.props.reviews.per_page);
                setLoading(false);
            },
            onError: () => setLoading(false),
        });
    };

    return (
        <div className="w-full">
            <ReviewInfoBox 
                name={product.name} 
                rating={product.ratings_avg_rating_value} 
                ratingCount={product.ratings_count} 
                images={reviewImages}
                ratingsGroups={ratingsGroups}
                averageOptionRatings={averageOptionRatings}
            />

            <div className="border rounded-lg mt-5">
                <div ref={reviewsRef}>
                    <ReviewSortSelector 
                        ratingsGroups={ratingsGroups} 
                        filters={filters} 
                        onFilterChange={handleFilterChange}
                    />
                </div>

                <div>
                    <>
                        {enabledReviewPopular && (
                            <div>
                                <div className="w-full mt-5">
                                    <div className="flex justify-between items-center px-5">
                                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Самый популярный отзыв</h2>
                                    </div>
                                    <ReviewCard review={popularReview}/>
                                </div>	
                                <div className="px-5">
                                    <hr/>
                                </div>
                            </div>

                        )}

                        {currentReviews && currentReviews.length > 0 ? (
                            <ReviewsAll reviews={currentReviews} />
                        ) : (
                            <div>
                                <div className="flex flex-col justify-center items-center p-10">
                                    <h1 className="text-xl font-bold">Ничего не нашлось</h1>
                                    <p>Попробуйте изменить критерии поиска</p>
                                    <button 
                                        className="border py-2 px-5 rounded-lg mt-5"
                                        onClick={resetFilters}
                                    >
                                        Сбросить
                                    </button>
                                </div>
                                <div className="px-5">
                                    <hr/>
                                </div>
                            </div>

                            
                        )}
                    </>

                    {currentReviews.length > 0 && totalReviews > currentReviews.length && currentPage < Math.ceil(totalReviews / perPage) && (
                        <div className="my-5 mx-5 h-10">
                            <button 
                                className="border rounded-lg w-full h-full justify-center items-center bg-gray-100 hover:bg-gray-200"
                                onClick={loadMore}
                            >
                                {loading ? 'Загрузка...' : 'Показать еще'}
                            </button>
                        </div>
                    )}

                    {currentReviews && currentReviews.length > 0 && totalReviews > perPage && (
                        <>
                            <div>
                                <Pagination data={reviews} onPageChange={(page) => fetchReviews({ page })}/>
                            </div>
                        </>
                    )}

                </div>
            </div>

        </div>
    );
};
