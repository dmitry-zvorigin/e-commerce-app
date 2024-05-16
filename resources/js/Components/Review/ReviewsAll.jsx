import ReviewCard from "./ReviewCard";

export default function ReviewsAll({ reviews }) {

    // console.log(reviews);
    return (
        <div>
            {reviews.map((review, index) => (
                <div key={review.id}>
                    <ReviewCard review={review} key={review.id} />
                    <hr/>
                </div>
            ))}
        </div>
    );
}