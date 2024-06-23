import ButtonCheckbox from "@/MyComponents/ButtonCheckbox";
import Rating from "@/MyComponents/Rating";
import { useState } from "react";

export default function RatingFilter({ filters, ratingsGroups, onFilterChange }) {

    const [selectedRatings, setSelectedRatings] = useState(filters.filter_ratings || []);

    const handleFilterRatings = (rating) => {
        let newSelectedRatings;
        if (selectedRatings.includes(rating)) {
            // Если рейтинг уже выбран, удаляем его из массива
            newSelectedRatings = selectedRatings.filter(r => r !== rating);
        } else {
            // Если рейтинг не выбран, добавляем его в массив
            newSelectedRatings = [...selectedRatings, rating];
        }
    
        // console.log(selectedRatings);
        setSelectedRatings(newSelectedRatings);
        onFilterChange({ ...filters, filter_ratings: newSelectedRatings.join(',') });
    };

    return (
        <div className="flex items-center m-5">
                      
            <div className="flex items-center m-5">
                {[5, 4, 3, 2, 1].map((rating, index) => (
                    <label 
                        className={`flex items-center cursor-pointer mr-5 bg-gray-100 rounded-lg p-1 hover:bg-gray-200 gap-1 ${!ratingsGroups[rating] ? 'opacity-50' : ''}`} 
                        key={index}
                        // Добавляем disabled, если количество оценок равно нулю
                        disabled={!ratingsGroups[rating]}
                        // onChange={() => toggleRating(rating)} 
                        onChange={() => handleFilterRatings(rating)}
                    >
                        {/* Добавляем disabled для ButtonCheckbox */}
                        <ButtonCheckbox 
                            disabled={!ratingsGroups[rating]} 
                            // checked={selectedRatings.includes(rating)}
                            onChange={() => handleFilterRatings(rating)}
                        />
                        <Rating value={rating} max={rating} size="small"/>
                        <p className="select-none">{ratingsGroups[rating] || 0}</p>
                    </label>
                ))}
            </div>

        </div>
    );
}

