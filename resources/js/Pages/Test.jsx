import Rating from "@/MyComponents/Rating";
import { ChevronDownIcon, HandThumbDownIcon, HandThumbUpIcon, ShoppingBagIcon, UserIcon } from "@heroicons/react/24/outline";

export default function Test({ reviews, popularReview }) {

    console.log(reviews);

    return (
        <>
        <div className="container mx-auto">
            <h1>Самый популярный отзыв</h1>
            <Review review={popularReview}/>
            {reviews.map((review, index) =>  (
                <div>
                    <Review review={review}/>
                    <hr/>
                </div>
            ))}
            
        </div>
            
        </>

    );
}

const Review = ({ review }) => {

    const averageReactions = review.likes.length - review.dislikes.length;

    return (
        <>
            <div className="flex justify-between mb-5 mt-5">
                <div className="flex">
                    <div className="flex justify-center items-center font-bold ">
                        <div className="border rounded-full p-1 border-black mr-2">
                            <UserIcon className="w-7 h-7"/>
                        </div>
                        
                        <button className="text-blue-700">{review.user.email}</button>
                    </div>
                    {review.real_buy === 1 && (
                        <div className="flex justify-center items-center border rounded-lg text-green-700 font-bold p-1 ml-5">
                            <ShoppingBagIcon className="w-5 h-5" />
                            Реальный покупатель
                        </div>
                    )}

                </div>
                <div>
                    {review.created_at}
                </div>
            </div>

            <div className="flex flex-wrap mb-5 gap-2">
                <div className="border p-1 border-gray-100 rounded-lg bg-gray-100 flex justify-center items-center">
                    <div className="pr-1">Общая:</div> 
                    <Rating value={review.rating.rating_value} />
                </div>

                {review.options.map((option, index) => (
                    <div className="border p-1 border-gray-100 rounded-lg bg-gray-100"> 
                        {option.title}: {option.pivot.rating_value}
                    </div>
                ))}

            </div>

            <div className="mb-5">
                {review.usage_term && (
                    <div className="mb-5">
                        <h1 className="font-bold">Срок использования:</h1>
                        <p>{review.usage_term.title}</p>
                    </div>
                )}


                {review.dignites && (
                    <div className="mb-5">
                        <h1 className="font-bold">Достоинства</h1>
                        <p>
                            {review.dignites}
                        </p>
                    </div>
                )}

                {review.disadvantages && (
                    <div className="mb-5">
                        <h1 className="font-bold">Недостатки</h1>
                        <p>{review.disadvantages}</p>
                    </div>
                )}

                {review.comment && (
                    <div className="mb-5">
                        <h1 className="font-bold">Комментарий</h1>
                        <p>
                            {review.comment}
                        </p>
                    </div>
                )}


                {review.images && review.images.length > 0 && (
                    <div>
                        <h1 className="font-bold">Фотографии</h1>
                        <div className="flex flex-wrap gap-5">
                            {review.images.map((image, index) => (
                                <div className="">
                                    <img src={`/reviews_images/image_thumbnail/${image.image_url_thumbnail}`}/>
                                </div>
                            ))}                            
                        </div>
                    </div>
                )}


            </div>

            <div className="flex justify-between mb-5">
                <button className="flex justify-center items-center text-blue-600 hover:text-orange-400">
                    Комментарии (13) 
                    <ChevronDownIcon className="h-5 w-5"/>
                </button>
                <div className="flex justify-center items-center ">
                    <button className="m-2"><HandThumbUpIcon className="h-7 w-7 hover:text-green-800"/></button>
                    <div 
                        className={
                                `border border-gray-300 rounded-lg p-1 bg-gray-300 font-bold
                                ${averageReactions < 0 ? 'text-red-600' : 'text-green-600'} 
                            `}
                    >
                        {averageReactions}
                    </div>
                    
                    <button className="m-2"><HandThumbDownIcon className="h-7 w-7 hover:text-red-800"/></button>
                </div>
            </div>
        </>
    );
};