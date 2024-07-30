import ReviewCard from "./ReviewCard";

export default function ReviewsAll({ reviews, loading }) {

    // const loading = true;
    if (loading) {
		return (
            <div>
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index}>
                        <div>
                            <PlaceholderReviews key={index} />
                        </div>
                        <div className="px-5">
                            <hr/>
                        </div>
                    </div>
                ))}
            </div>
		);
	}

    return (
        <div>
            {reviews.map((review) => (
                <div key={review.id}>
                    <div>
                        <ReviewCard review={review} key={review.id} />
                    </div>
                    <div className="px-5">
                        <hr/>
                    </div>
                </div>
            ))}
        </div>
    );
}

const PlaceholderReviews = () => {

    return (
        <>
            <div className="px-5 animate-pulse">
                <div className="flex justify-between mb-5 mt-5">
                    <div className="flex">
                        <div className="flex justify-center items-center font-bold">
                            <div className="p-1 border-black mr-2">
                                <svg 
                                    className="h-10 text-gray-200 dark:text-gray-600" 
                                    aria-hidden="true" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="currentColor" 
                                    viewBox="0 0 16 20"
                                >
                                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 
                                        1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 
                                        1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 
                                        1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
                                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
                                </svg>
                            </div>
                            <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-[200px]"></div>
                        </div>
                    </div>
                    <div>
                        <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-[100px]"></div>
                    </div>
                </div>

                <div className="flex-col flex-wrap gap-2 mb-5">
                    <div className="border mr-2 p-1 border-gray-100 rounded-lg bg-gray-100 flex items-center gap-4">
                        <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-[150px]"></div>
                        <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-[150px]"></div>
                        <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-[150px]"></div>
                        <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-[150px]"></div>
                    </div>

                </div>

                <div className="mb-5">

                        <div className="mb-5 w-full">
                            <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-[150px]"></div>
                            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-full"></div>
                        </div>

                        <div className="mb-5 w-full">
                            <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-[150px]"></div>
                            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-full"></div>
                        </div>

                        <div className="mb-5 w-full">
                            <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-[150px]"></div>
                            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-full"></div>
                        </div>

                        <div>
                            <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-[150px]"></div>
                            <div className="flex flex-wrap gap-5">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <svg 
                                        className="h-[100px] text-gray-200 dark:text-gray-600" 
                                        aria-hidden="true" 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        fill="currentColor" 
                                        viewBox="0 0 16 20"
                                        key={index}
                                    >
                                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 
                                            1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 
                                            1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 
                                            1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
                                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
                                    </svg>
                                ))}                         
                            </div>
                        </div>

                </div>
                
                <div className="flex justify-between mb-5">
                    
                    <div className="w-full">
                        <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-[150px]"></div>
                    </div>     

                    <div>
                        <div className="flex justify-center items-center">
                            <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-[150px]"></div>
                        </div>
                    </div>
                </div>

            </div>
                    
        </>

    );
}