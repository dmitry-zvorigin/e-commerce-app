import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useState } from "react";

export default function Search ({ filters, onFilterChange }) {

    const [searchQuery, setSearchQuery] = useState(filters.search || '');

    useEffect(() => {
        setSearchQuery(filters.search || '');
    }, [filters.search]);

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = () => {
        onFilterChange({ search: searchQuery });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleBlur = () => {
        handleSearch();
    };

    const handleClear = () => {
        setSearchQuery('');
        onFilterChange({ search: ''});
    }

    return (
        <div 
            className='w-full h-full flex border border-white rounded-lg 
                hover:border hover:border-slate-400 hover:shadow-lg 
                focus-within:border-slate-400 focus-within:shadow-lg m-5 bg-gray-100'
        >
            <input 
                className='w-full h-full ml-2 focus:outline-none border-none focus:ring-0 focus:border-none bg-gray-100'
                placeholder='Поиск по отзывам...'
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                onBlur={handleBlur}
            />

            {searchQuery && (
                <>
                    <button onClick={handleClear}>
                        <XMarkIcon className="text-gray-400 w-6"/>
                    </button>

                    <div className="border-l-2 my-2 mx-2"/>
                </>
            )}

            <button onClick={handleSearch}>
                <MagnifyingGlassIcon className='w-6 mr-2 text-gray-400'/>
            </button>
        </div>
    );
}