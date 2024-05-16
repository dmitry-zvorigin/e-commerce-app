
export default function OptionsAverage({ averageOptionRatings }) {

    // console.log(averageOptionRatings);

    return (
        <div className="flex flex-wrap gap-2"> 
            {Object.entries(averageOptionRatings).map(([key, rating], index) => (
                <div key={index} className="border p-1 border-gray-100 rounded-lg bg-gray-100 flex gap-1">
                    <h1>{rating.title}:</h1>
                    <p className="font-bold">{rating.average_rating.toFixed(1)}</p>
                </div>
            ))}
        </div>
    );
}