import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Order from "./Order";
import Filter from "./Filter";
import RatingFilter from "./RatingFilter";

export default function ReviewSortSelector({}) {

    return (
        <div className="border rounded-lg mt-5">

            <div className="flex justify-between items-center">
                <div 
                    className='w-full h-full flex border border-white rounded-lg 
                    hover:border hover:border-slate-400 hover:shadow-lg 
                    focus-within:border-slate-400 focus-within:shadow-lg m-5 bg-gray-100'
                >
                    <input 
                        className='w-full h-full ml-2 focus:outline-none border-none focus:ring-0 focus:border-none bg-gray-100'
                        placeholder='Поиск по отзывам...'
                    />
                    <button><MagnifyingGlassIcon className='w-6 mr-2 ml-2 text-gray-400'/></button>
                </div>

                <div className="m-5">
                    <Order/>
                </div>

                <div className="m-5">
                    <Filter/>
                </div>
            </div>


            <RatingFilter/>


        </div>
    );
}