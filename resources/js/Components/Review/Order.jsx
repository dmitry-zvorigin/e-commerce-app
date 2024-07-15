import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Listbox } from '@headlessui/react'
import ButtonSelect from "@/MyComponents/ButtonSelect";
import { useState } from "react";
import { useEffect } from "react";

const sortOptions = [
    { name: 'По дате', value: '1' },
    { name: 'По рейтингу', value: '2' },
    { name: 'По популярности', value: '3' },
    { name: 'По дате изменения', value: '4' },
];

export default function Order({ filters, onFilterChange }) {

    const [selectedOption, setSelectedOption] = useState(sortOptions[0]);

    useEffect(() => {
        if (filters.order) {
            const currentOption = sortOptions.find(option => option.value === filters.order);
            if (currentOption) {
                setSelectedOption(currentOption);
            } else {
                setSelectedOption(sortOptions[0]);
            }
        } else {
            setSelectedOption(sortOptions[0]);
        }
    }, [filters.order]);

    const handleOrderOptions = (option) => {
        setSelectedOption(option);
        const newFilters = { ...filters, order: option.value }
        onFilterChange(newFilters);
    };

    return (
        <>

        <Listbox as='div' className='relative'>

            <Listbox.Button className='flex items-center group w-44 justify-between bg-gray-100 p-2 rounded-lg hover:bg-gray-200'>
                <h5 className='text-sm text-gray-500'>{selectedOption.name}</h5>
                <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-orange-700"
                    aria-hidden="true"
                />
            </Listbox.Button>

            <Listbox.Options className='absolute z-10 top-10 rounded-md bg-white shadow-2xl border border-slate-300 -left-7 -right-7 py-2'>
                {sortOptions.map((option, index) => (
                    <Listbox.Option
                        key={index}
                        name={option.name}
                        value={option}
                        className="relative cursor-default select-none py-0 p-5 text-sm font-medium"
                    >
                        <div 
                            className="flex items-center gap-2 rounded-lg cursor-pointer h-full w-full hover:text-amber-900 hover:bg-gray-200" 
                            onClick={() => handleOrderOptions(option)}
                        >
                            <ButtonSelect
                                checked={selectedOption.value === option.value}
                                onChange={() => handleOrderOptions(option)}
                            />
                            <label className="peer-checked/draft:text-orange-500 cursor-pointer p-2 h-full w-full">{option.name}</label>
                        </div>
                    </Listbox.Option>
                ))}
            </Listbox.Options>

        </Listbox>

        </>

    );
}