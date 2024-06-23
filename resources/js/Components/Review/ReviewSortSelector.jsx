import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Order from "./Order";
import Filter from "./Filter";
import RatingFilter from "./RatingFilter";
import { useState } from "react";
import Search from "./Search";

export default function ReviewSortSelector({ ratingsGroups, filters, onFilterChange }) {

    return (
        <div className="border rounded-lg mt-5">

            <div className="flex justify-between items-center">

                <div className="m-5 w-full">
                    <Search filters={filters} onFilterChange={onFilterChange}/>
                </div>

                <div className="m-5">
                    <Order filters={filters} onFilterChange={onFilterChange}/>
                </div>

                <div className="m-5">
                    <Filter filters={filters} onFilterChange={onFilterChange} />
                </div>
            </div>

            <RatingFilter filters={filters} ratingsGroups={ratingsGroups} onFilterChange={onFilterChange}/>

        </div>
    );
}