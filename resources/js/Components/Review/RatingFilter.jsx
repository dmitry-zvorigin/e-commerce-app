import ButtonCheckbox from "@/MyComponents/ButtonCheckbox";
import Rating from "@/MyComponents/Rating";

export default function RatingFilter({ ratingsGroups }) {

    return (
        <div className="flex items-center m-5">
                      
            <div className="flex items-center m-5">
                {[5, 4, 3, 2, 1].map((rating, index) => (
                    <label 
                        className={`flex items-center cursor-pointer mr-5 bg-gray-100 rounded-lg p-1 hover:bg-gray-200 gap-1 ${!ratingsGroups[rating] ? 'opacity-50' : ''}`} 
                        key={index}
                        // Добавляем disabled, если количество оценок равно нулю
                        disabled={!ratingsGroups[rating]}
                    >
                        {/* Добавляем disabled для ButtonCheckbox */}
                        <ButtonCheckbox disabled={!ratingsGroups[rating]} />
                        <Rating value={rating} max={rating} size="small"/>
                        <p className="select-none">{ratingsGroups[rating] || 0}</p>
                    </label>
                ))}
            </div>

        </div>
    );
}

