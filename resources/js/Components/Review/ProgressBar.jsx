import Progress from "@/MyComponents/Progress";

export default function ProgressBar({ ratingsGroups }) {

    const totalReviews = Object.values(ratingsGroups).reduce((total, count) => total + count, 0);
    
    return (
        <div className="flex w-96 h-full flex-col gap-2">

            {[5, 4, 3, 2, 1].map((rating, index) => {
                // Проверяем, есть ли значение для текущего рейтинга в объекте ratingsGroups
                const ratingCount = ratingsGroups[rating] || 0;
                // Вычисляем процентное значение прогресса для текущего рейтинга
                const progress = totalReviews === 0 ? 0 : ratingCount / totalReviews * 100;
                return <Progress key={rating} rating={rating} value={progress} />;
            })}


        </div>
    );
}

