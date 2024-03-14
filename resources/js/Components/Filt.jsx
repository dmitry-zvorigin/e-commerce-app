import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from "react";
import { Inertia } from '@inertiajs/inertia';
import pickBy from 'lodash/pickBy';
import queryString from 'query-string';

export default function Filt() {

    const { category } = usePage().props;
    const { filters } = usePage().props;
    const { filters_query } = usePage().props;

    const [values, setValues] = useState( {
        filter: filters_query.filter || '',
    });
    
    const [showFilters, setShowFilters] = useState(false);

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        const isChecked = e.target.checked;

        setValues(prevValues => {
            const newValues = { ...prevValues };
            newValues[key] = newValues[key] || [];
            const index = newValues[key].indexOf(value);

            if (isChecked && index === -1) {
                newValues[key].push(value);
            } else if (!isChecked && index !== -1) {
                newValues[key].splice(index, 1);
            }

            return newValues;
        })
    }

    useEffect(() => {
        if (showFilters) {
            Inertia.get(route(route().current(), category.slug), query, {
                replace: true,
                preserveState: true,
                preserveScroll: true,
            });
        }
        
    }, [showFilters, values]);

    function reset() {
        setValues({});
        setShowFilters(true);
    }
    
    return (
            <div className="flex flex-col p-5">
                <div className="flex flex-col">
                    
                    {filters.map((filter) => (
                        <Disclosure 
                            as="div" 
                            key={filter.attribute.id} 
                            className="border-b border-gray-200 py-6" 
                            defaultOpen={values.hasOwnProperty(filter.attribute.slug)}
                        >
                            {({ open }) => (
                                <div>

                                    <h3 className="-my-3 flow-root">
                                        <Disclosure.Button 
                                            className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                                        >
                                        <span className="text-start font-medium text-gray-900">{filter.attribute.name}</span>
                                        <span className="ml-6 flex items-center">
                                            {open ? (
                                            <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                            ) : (
                                            <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                            )}
                                        </span>
                                        </Disclosure.Button>
                                    </h3>

                                    <Disclosure.Panel>
                                        <div className="flex flex-col p-2 w-full">
                                            {filter.values.map((value) => (
                                                <label htmlFor={value.id} 
                                                    key={value.id} 
                                                    className="flex items-center p-2 w-full hover:bg-orange-100 rounded-md"
                                                >
                                                    <input 
                                                        name={filter.attribute.slug}
                                                        value={value.name}
                                                        id={value.id}
                                                        checked={Array.isArray(values[filter.attribute.slug]) && values[filter.attribute.slug].includes(value.name)}
                                                        type="checkbox" 
                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        onChange={handleChange}
                                                    />
                                                    <span className="ml-2 text-sm text-gray-600">
                                                        {value.name}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </Disclosure.Panel>
                                </div>
                            )}
                        </Disclosure>
                    ))}

                </div>
                <button onClick={ () => setShowFilters(true) } className="border rounded-md mb-5 mt-5 p-3 bg-orange-400 text-white hover:bg-orange-300 text-sm font-semibold">Применить</button>
                <button onClick={reset} className="border rounded-md p-3 text-sm font-semibold ">Сбросить</button>
            </div>
    );
}