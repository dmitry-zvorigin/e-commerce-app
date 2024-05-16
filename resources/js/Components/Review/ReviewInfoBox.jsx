import Rating from "@/MyComponents/Rating";
import ProductImageGallery from "../Product/ProductImageGallery";
import ProgressBar from "./ProgressBar";
import OptionsAverage from "./OptionsAverage";

export default function ReviewInfoBox({ name, rating, ratingCount, images, ratingsGroups, averageOptionRatings }) {

    // console.log(ratingsGroups);
    return (
        <div className="border rounded-lg p-5">
            <h1 className="text-2xl font-bold">
                Отзывы о {name} [NED4090019SB-1020G]
            </h1>
            <div className="flex justify-between mt-5">
                <div>
                    <h1 className="text-6xl font-bold">{parseFloat(rating).toFixed(2)}</h1>
                    <Rating value={rating} precision={0.1}/>
                    <p className="text-slate-400">{ratingCount} отзывов</p>
                </div>
                <div>
                    <ProgressBar ratingsGroups={ratingsGroups}/>
                </div>
                <div>
                    <h1>Есть что рассказать?</h1>
                    <p className="text-slate-400">Оцените товар, ваш опыт будет полезен</p>
                    <button
                        className="border h-12 w-full rounded-lg bg-orange-400 text-white hover:bg-orange-300"
                    >
                        Добавить отзыв
                    </button>
                </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-5 mt-5">
                <OptionsAverage averageOptionRatings={averageOptionRatings} />
            </div>
            <div>
                <ProductImageGallery images={images}/>
            </div>
        </div>
    );
}