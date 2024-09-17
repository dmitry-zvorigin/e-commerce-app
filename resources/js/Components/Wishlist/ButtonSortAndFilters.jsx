import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import Order from "./Order";
import Filters from "./Filters";
import { useMemo } from "react";
import { useCallback } from "react";
import useOutsideClick from "@/Hooks/useOutsideClick";

export default function ButtonSortAndFilters({ selectedFilters, categoryOptions, selectedOrder, fetchProducts, dispatch }) {
    
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [filterHeight, setFilterHeight] = useState(0);
    const buttonRef = useRef(null);
    const filterRef = useRef(null);    

    const hasFiltersOrSort = useMemo(() => 
        selectedFilters.filters.length > 0 || selectedFilters.categories.length > 0 || selectedOrder !== 'date_desc', 
        [selectedFilters, selectedOrder]
    );

    const closeFilters = useCallback(() => {
        setIsFilterVisible(false);
    }, []);

    useOutsideClick(filterRef, buttonRef, closeFilters);

    useEffect(() => {
        if (filterRef.current) {
            setFilterHeight(filterRef.current.scrollHeight);
        }
    }, [categoryOptions]);

    const handleButtonClick = () => {
        setIsFilterVisible((prev) => !prev);
    }

    return (
        <div className="flex justify-center items-center border rounded-lg relative h-full">

            <button 
                onClick={handleButtonClick}
                className={`p-2 rounded-lg ${hasFiltersOrSort ? 'bg-orange-500 text-white' : 'hover:bg-orange-100'}`}
                ref={buttonRef}
            >
                <AdjustmentsHorizontalIcon className="h-[22px] w-[22px] "/>
            </button>

            <div 
                className={`absolute top-[40px] border border-slate-300 rounded-lg z-10 bg-white min-w-[300px]
                    overflow-hidden transition-all duration-500 ease-in-out
                    ${isFilterVisible ? 'opacity-100' : 'h-0 opacity-0'}
                    `}
                style={{
                    height: isFilterVisible ? `${filterHeight}px` : '0',
                }}
                ref={filterRef}
            >
                <Order selectedOrder={selectedOrder} fetchProducts={fetchProducts} dispatch={dispatch}/>

                <hr/>

                <Filters selectedFilters={selectedFilters} categoryOptions={categoryOptions} fetchProducts={fetchProducts} dispatch={dispatch}/>

            </div>

        </div>
    );
}