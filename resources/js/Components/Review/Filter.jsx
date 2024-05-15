import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Listbox } from '@headlessui/react'
import ButtonSwitch from "@/MyComponents/ButtonSwitch";


const FilterOptions = [
    { key: 'filter', name: 'Реальный покупатель', value: false },
    { key: 'filter', name: 'С фото', value: false },
];

export default function Filter({}) {

    function handleOrderChange(e) {
        e.preventDefault();
    }

    const [enabled, setEnabled] = useState(Array(FilterOptions.length).fill(false));

    const toggleEnabled = (index) => {
        let newEnabled = [...enabled];
        newEnabled[index] = !newEnabled[index];
        setEnabled(newEnabled);
    };

    return (
        <>

        <Listbox as='div' className='relative' onChange={handleOrderChange}>

            <Listbox.Button className='flex items-center group justify-between bg-gray-100 p-2 rounded-lg hover:bg-gray-200'>
                <AdjustmentsHorizontalIcon className="w-5 h-5 "/>
            </Listbox.Button>
        
            <Listbox.Options className='absolute z-10 top-10 rounded-md bg-white shadow-2xl border border-gray-300 w-60 right-0 p-2'>
                {FilterOptions.map((option, index) => (
                    <Listbox.Option
                        key={index}
                        name={option.key}
                        value={option}
                        className={({ active }) =>
                        `relative cursor-default select-none text-sm py-2`
                      }
                    >
                        <div className="flex justify-between cursor-pointer py-1 group" onClick={() => toggleEnabled(index)}>
                            <span className="ml-2 text-sm font-medium text-gray-900">
                                {option.name}
                            </span>
                            <ButtonSwitch enabled={enabled[index]} setEnabled={(value) => toggleEnabled(index)} />
                        </div>
                        
                    </Listbox.Option>
                ))}
            </Listbox.Options>

        </Listbox>

        </>

    );
}