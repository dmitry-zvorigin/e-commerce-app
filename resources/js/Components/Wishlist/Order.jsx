import ButtonSelect from "@/MyComponents/ButtonSelect";
import React from "react";
import { useCallback } from "react";
import { useMemo } from "react";

function Order ({ selectedOrder, fetchProducts, dispatch }) {

    const sortingOptions = useMemo(() =>  [
        {name: 'По убыванию цены', value: 'price_desc'},
        {name: 'По возрастанию цены', value: 'price_asc'},
        {name: 'По дате добавления', value: 'date_desc'},
    ], []);

    const handleSortChange = useCallback((value) => {
        dispatch({
            type: 'SET_ORDER',
            payload: value,
        });
        fetchProducts();
    }, [dispatch, fetchProducts]);

    return (
        <div className="px-5">
            <h1 className="text-2xl font-bold my-2">Сортировка</h1>
            {sortingOptions.map((option, index) => (
                <label 
                    key={option.value}
                    className="flex items-center gap-2 rounded-lg cursor-pointer h-full w-full 
                        hover:text-black hover:bg-orange-100 select-none" 
                    onClick={() => handleSortChange(option.value)}
                >
                    <ButtonSelect
                        checked={selectedOrder === option.value}
                        onChange={() => handleSortChange(option.value)}
                    />
                    <span className="cursor-pointer p-2 h-full w-full">
                        {option.name}
                    </span>
                </label>
            ))}
        </div>
    );
}

export default React.memo(Order);