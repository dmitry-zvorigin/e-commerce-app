import ReviewCard from "./ReviewCard";

export default function ReviewsAll({ reviews }) {

    // console.log(reviews);
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