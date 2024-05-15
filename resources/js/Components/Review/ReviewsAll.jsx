import ReviewCard from "./ReviewCard";

export default function ReviewsAll({ reviews }) {

    console.log(reviews);
    return (
        <div>
            {reviews.map((review, index) => (
                <>
                    <ReviewCard review={review} key={review.id} />
                    <hr/>
                </>
            ))}
        </div>
    );
}