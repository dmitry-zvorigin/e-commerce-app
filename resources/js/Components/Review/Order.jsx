import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Listbox } from '@headlessui/react'
import ButtonSelect from "@/MyComponents/ButtonSelect";
import { useState } from "react";


const sortOptions = [
    { key: 'order', name: 'По дате', value: '1' },
    { key: 'order', name: 'По рейтингу', value: '2' },
    { key: 'order', name: 'По популярности', value: '3' },
    { key: 'order', name: 'По дате изменения', value: '4' },
];

export default function Order({}) {

    const [selectedOption, setSelectedOption] = useState(sortOptions[0]);

    function handleOrderChange(option) {
        setSelectedOption(option);
    }

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
                        name={option.key}
                        value={option}
                        className={({ active }) =>
                            `relative cursor-default select-none py-0 p-5 text-sm font-medium `
                        }
                    >
                        <div 
                            className="flex items-center gap-2 rounded-lg cursor-pointer h-full w-full hover:text-amber-900 hover:bg-gray-200" 
                            onClick={() => handleOrderChange(option)}
                        >
                            <ButtonSelect
                                checked={selectedOption.value === option.value}
                                onChange={() => handleOrderChange(option)}
                            />
                            <label for={index} class="peer-checked/draft:text-orange-500 cursor-pointer p-2 h-full w-full">{option.name}</label>
                        </div>
                    </Listbox.Option>
                ))}
            </Listbox.Options>

        </Listbox>

        </>

    );
}