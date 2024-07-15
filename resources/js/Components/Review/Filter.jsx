import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Listbox } from '@headlessui/react'
import ButtonSwitch from "@/MyComponents/ButtonSwitch";
import { useEffect } from "react";

const FilterOptions = [
    { name: 'Реальный покупатель', key: 'filter_real_buyer' },
    { name: 'С фото', key: 'filter_with_photo' },
];

export default function Filter({ filters, onFilterChange }) {

    const [enabled, setEnabled] = useState({
        filter_real_buyer: filters.filter_real_buyer || false,
        filter_with_photo: filters.filter_with_photo || false,
    });

    useEffect(() => {
        setEnabled({
            filter_real_buyer: filters.filter_real_buyer || false,
            filter_with_photo: filters.filter_with_photo || false,
        });
    }, [filters])

    const toggleEnabled = (key) => {
        const newEnabled = { ...enabled, [key]: !enabled[key] };
        setEnabled(newEnabled);
        
        const newFilters = { ...filters, [key]: newEnabled[key] };
        onFilterChange(newFilters);
    };

    return (
        <>

        <Listbox as='div' className='relative'>

            <Listbox.Button className='flex items-center group justify-between bg-gray-100 p-2 rounded-lg hover:bg-gray-200'>
                <AdjustmentsHorizontalIcon className="w-5 h-5 "/>
            </Listbox.Button>
        
            <Listbox.Options className='absolute z-10 top-10 rounded-md bg-white shadow-2xl border border-gray-300 w-60 right-0 p-2'>
                {FilterOptions.map((option, index) => (
                    <Listbox.Option
                        key={index}
                        name={option.name}
                        value={option}
                        className="relative cursor-default select-none text-sm py-2"
                    >
                        <div className="flex justify-between cursor-pointer py-1 group" onClick={(e) => {toggleEnabled(option.key), e.stopPropagation()}}>
                            <span className="ml-2 text-sm font-medium text-gray-900">
                                {option.name}
                            </span>
                            <ButtonSwitch 
                                enabled={enabled[option.key]} 
                                onToggle={() => toggleEnabled(option.key)} 
                            />
                        </div>
                        
                    </Listbox.Option>
                ))}
            </Listbox.Options>

        </Listbox>

        </>

    );
}