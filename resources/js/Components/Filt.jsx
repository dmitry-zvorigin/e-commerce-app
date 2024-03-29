import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { usePage } from '@inertiajs/react';

export default function Filt({ values, setValues, setShowFilters, reset }) {

    const { filters } = usePage().props;

    function handleCheckboxChange(e) {
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

                if (newValues[key].length === 0) {
                    delete newValues[key];
                }

            }

            return newValues;
        })
    }

    function handleRangeChange(e) {
        const key = e.target.name;
        const value = parseFloat(e.target.value);
        const type = e.target.dataset.type; // Получаем тип значения (min или max)
        const minValue = parseFloat(e.target.min);
        const maxValue = parseFloat(e.target.max);

        setValues(prevValues => {
            const newValues = { ...prevValues };
            const currentValue = newValues[key] || [minValue, maxValue]; // Получение текущего значения или установка [Min, Max] по умолчанию
    
            if (type === 'min') {
                newValues[key] = [value, currentValue[1]]; // Обновление минимального значения
            } else {
                newValues[key] = [currentValue[0], value]; // Обновление максимального значения
            }

            //TODO
            // if (isNaN(newValues[key][0]) || isNaN(newValues[key][1])) {
            //     delete newValues[key];
            // }

            if (isNaN(newValues[key][0])) {
                newValues[key] = [minValue, currentValue[1]];
            }

            if (isNaN(newValues[key][1])) {
                newValues[key] = [currentValue[0], maxValue];
            }

            if (parseFloat(newValues[key][0]) === minValue && parseFloat(newValues[key][1]) === maxValue) {
                delete newValues[key];
            }
    
            return newValues;
        });
    }

    function handleBlur(e) {
        const key = e.target.name;
        const value = parseFloat(e.target.value);
        const type = e.target.dataset.type; // Получаем тип значения (min или max)
        let newValue = value; // Преобразование введенного значения в число

        const minValue = parseFloat(e.target.min);
        const maxValue = parseFloat(e.target.max);

        if (value < minValue) {
            e.target.value = minValue;
            newValue = minValue;
        }

        if (value > maxValue) {
            e.target.value = maxValue;
            newValue = maxValue;
        }

        if (type === 'min' && values[key] && value > values[key][1]) {
            newValue = Math.min(value, maxValue);
            setValues(prevValues => {
                const newValues = { ...prevValues };
                newValues[key] = [values[key][1], newValue];
                return newValues;
            });

            return;
        }

        if (type === 'max' && values[key] && value < values[key][0]) {
            newValue = Math.max(value, minValue);
            setValues(prevValues => {
                const newValues = { ...prevValues };
                newValues[key] = [newValue, values[key][0]];
                return newValues;
            });

            return;
        }

        handleRangeChange(e);

    }

    return (
            <div className="flex flex-col p-5">
                <div className="flex flex-col">

                    {filters.map((filter) => {

                        if (filter.type === 'range') {
                            return (
                                <FilterRange
                                    key={filter.attribute.id}
                                    filter={filter}
                                    handleRangeChange={handleRangeChange}
                                    values={values}
                                    handleBlur={handleBlur}
                                />
                            )
                        } else if (filter.type === 'checkbox') {
                            return (
                                <FilterChecbox 
                                    key={filter.attribute.id}
                                    filter={filter}
                                    values={values}
                                    handleCheckboxChange={handleCheckboxChange}
                                />
                            )
                        }

                    })}

                </div>
                <button onClick={ () => setShowFilters(true) } className="border rounded-md mb-5 mt-5 p-3 bg-orange-400 text-white hover:bg-orange-300 text-sm font-semibold">Применить</button>
                <button onClick={reset} className="border rounded-md p-3 text-sm font-semibold ">Сбросить</button>
            </div>
    );

    
}

const FilterRange = ({ filter, values, handleBlur, handleRangeChange }) => {

    return (
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
                            <div className="flex justify-between">
                                <input 
                                    name={filter.attribute.slug}
                                    value={
                                        values[filter.attribute.slug] && values[filter.attribute.slug][0] != filter.min_value
                                            ? values[filter.attribute.slug][0]
                                            : ''
                                    }
                                    data-type="min"
                                    placeholder={`от ${filter.min_value}`} 
                                    min={filter.min_value}
                                    max={filter.max_value}
                                    type="number" 
                                    className="border border-gray-300 text-indigo-600 rounded-md min-w-28 p-2 text-sm"
                                    onBlur={handleBlur}
                                    onChange={handleRangeChange}
                                    onWheel={(e) => e.currentTarget.blur()}
                                />

                                <input 
                                    name={filter.attribute.slug}
                                    value={
                                        values[filter.attribute.slug] && values[filter.attribute.slug][1] != filter.max_value
                                            ? values[filter.attribute.slug][1]
                                            : ''
                                    }
                                    data-type="max"
                                    placeholder={`до ${filter.max_value}`} 
                                    min={filter.min_value}
                                    max={filter.max_value}
                                    type="number" 
                                    className="border border-gray-300 text-indigo-600 rounded-md min-w-28 p-2 text-sm"
                                    onBlur={handleBlur}
                                    onChange={handleRangeChange}
                                    onWheel={(e) => e.currentTarget.blur()}
                                />
                            </div>

                        </div>
                    </Disclosure.Panel>
                </div>
            )}
        </Disclosure>
    );
}

const FilterChecbox = ({ filter, handleCheckboxChange, values }) => {
    return (
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
                                <label 
                                    htmlFor={value.id} 
                                    key={value.id} 
                                    className="flex items-center p-2 w-full hover:bg-orange-100 rounded-md"
                                >
                                    <input 
                                        name={filter.attribute.slug}
                                        value={value.id}
                                        id={value.id}
                                        checked={Array.isArray(values[filter.attribute.slug]) && values[filter.attribute.slug].includes(value.id.toString())}
                                        type="checkbox" 
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        onChange={handleCheckboxChange}
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
    );
}