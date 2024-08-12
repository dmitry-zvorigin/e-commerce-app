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

    // Загрузка
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(false);

    // console.log(currentReviews);

    const buildQuery = (values, page) => {

        const query = {
            ...values,
            page,
        };

		// const query = Object.fromEntries(
		// 	Object.entries(values).map(([key, value]) => [key, [value.join(',')]])
		// );

		return query;
	};

    const fetchReviews = (page = 1, append = false, ref = true, appliedFilters  = filters) => {
		const query = buildQuery(appliedFilters , page);

		if (!append) {
			setInitialLoading(true);
		} else {
			setLoading(true);
		}

		if (page === 1) {
			delete query.page;
		}

		router.get(route('product.reviews', { productSlug: product.slug }), query, {
            preserveState: true,
            preserveScroll: true,
            only: ['reviews'],
            onSuccess: page => {
                if (append) {
                    setCurrentReviews(prevReviews => [...prevReviews, ...page.props.reviews.data]);
                } else {
                    setCurrentReviews(page.props.reviews.data);
                }
                setCurrentPage(page.props.reviews.current_page);
                setLoading(false);
				setInitialLoading(false);
            },
            onFinish: () => {
				if (ref) {
					reviewsRef.current.scrollIntoView({ behavior: 'smooth' });
				}
                
            },
            onError: () => {
				setLoading(false);
				setInitialLoading(false);
			},
        });

	};

    useEffect(() => {
        setEnabledReviewPopular(Object.keys(filters).length === 0 && currentPage === 1);
    }, [filters, currentPage]);

    const handleFilterChange = (newFilters) => {

        // Загрузка
        setInitialLoading(true);

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
        setCurrentPage(1);
        fetchReviews(1, false, true, cleanedFilters);
    };

    const loadMore = () => {
        if (loading) return;
        fetchReviews(currentPage + 1, true, false);
    };

    const resetFilters = () => {
        const order = filters['order'];
        const newValues = order ? { 'order': order } : {};
        setFilters(newValues);
        setCurrentPage(1);
        fetchReviews(1, false, true, newValues);
    };

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        fetchReviews(pageNumber);
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
                            <ReviewsAll reviews={currentReviews} loading={initialLoading}/>
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

                    {reviews.next_page_url !== null && (
                        <div className="my-5 mx-5 h-10">
                            <button 
                                className="border rounded-lg w-full h-full justify-center items-center bg-gray-100 hover:bg-gray-200"
                                onClick={loadMore}
                            >
                                {loading ? 'Загрузка...' : 'Показать еще'}
                            </button>
                        </div>
                    )}

                    {reviews.last_page > 1 && (
                        <>
                            <div>
                                <Pagination data={reviews} onPageChange={onPageChange}/>
                            </div>
                        </>
                    )}

                </div>
            </div>

        </div>
    );
};
