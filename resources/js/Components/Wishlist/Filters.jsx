import ButtonCheckbox from "@/MyComponents/ButtonCheckbox";
import React from "react";
import { useMemo } from "react";
import { useCallback } from "react";

function Filters ({ selectedFilters, categoryOptions, fetchProducts, dispatch }) {

    const filtersOptions = useMemo(() => [
        {name: 'В наличии (1)', value: 'in_stock'},
        {name: 'Нет в наличии', value: 'out_of_stock'},
        {name: 'С уведомлениями', value: 'with_notifications'},
    ], []);

    const handleFilterChange = useCallback((value) => {
        const isCategoryFilter = categoryOptions.some(option => option.slug === value);
        let updatedFilters;
    
        if (isCategoryFilter) {
            const updatedCategories = selectedFilters.categories.includes(value)
                ? selectedFilters.categories.filter(filter => filter !== value)
                : [...selectedFilters.categories, value];
    
            updatedFilters = {
                ...selectedFilters,
                categories: updatedCategories
            };
        } else {
            const updatedOtherFilters = selectedFilters.filters.includes(value)
                ? selectedFilters.filters.filter(filter => filter !== value)
                : [...selectedFilters.filters, value];
    
            updatedFilters = {
                ...selectedFilters,
                filters: updatedOtherFilters
            };
        }
    
        dispatch({
            type: 'SET_FILTERS',
            payload: updatedFilters,
        });
    
        fetchProducts(updatedFilters);
    }, [categoryOptions, selectedFilters, dispatch, fetchProducts]);


    return (
        <div className="px-5">
            <h1 className="text-2xl font-bold my-2">Фильтры</h1>

            {filtersOptions.map((option, index) => (
                <label 
                    key={index}
                    className="flex items-center gap-2 rounded-lg cursor-pointer h-full w-full 
                        hover:text-black hover:bg-orange-100 px-2 select-none" 
                >
                    <ButtonCheckbox
                        checked={selectedFilters.filters.includes(option.value)}
                        onChange={() => handleFilterChange(option.value)}
                    />
                    <span className="peer-checked/draft:text-orange-500 cursor-pointer p-2 h-full w-full">
                        {option.name}
                    </span>
                </label>
            ))}
            {categoryOptions.map((option, index) => (
                <label 
                    key={option.id}
                    className="flex items-center gap-2 rounded-lg cursor-pointer h-full w-full 
                        hover:text-black hover:bg-orange-100 px-2 select-none" 
                >
                    <ButtonCheckbox
                        checked={selectedFilters.categories.includes(option.slug)}
                        onChange={() => handleFilterChange(option.slug)}
                    />
                    <span className="peer-checked/draft:text-orange-500 cursor-pointer p-2 h-full w-full">
                        {option.name}
                    </span>
                </label>
            ))}
        </div>
    );
}

export default React.memo(Filters);