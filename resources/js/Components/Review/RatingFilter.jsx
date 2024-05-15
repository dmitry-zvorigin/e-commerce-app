import ButtonCheckbox from "@/MyComponents/ButtonCheckbox";
import Rating from "@/MyComponents/Rating";

export default function RatingFilter({}) {

    const arr = [
        { value: 5, count: 456 },
        { value: 4, count: 77 },
        { value: 3, count: 24 },
        { value: 2, count: 6 },
        { value: 1, count: 17 },
    ];

    return (
        <div className="flex items-center m-5">

            {arr.map((obj, index) => (
                <label className="flex items-center cursor-pointer mr-5 bg-gray-100 rounded-lg p-1 hover:bg-gray-200 gap-1" key={index}>
                    <ButtonCheckbox/>
                    <Rating value={obj.value} max={obj.value} size="small"/>
                    <p className="select-none">{obj.count}</p>
                </label>
            ))}
                        
        </div>
    );
}

