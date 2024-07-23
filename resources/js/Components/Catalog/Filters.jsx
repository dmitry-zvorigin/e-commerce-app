import { Disclosure, Transition } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { usePage } from '@inertiajs/react';
import { useState } from "react";

export default function Filters({ values, setValues, showFilters, setShowFilters, resetAllFilter, resetOneFilter, applyFilters }) {

    const { filters } = usePage().props;

    const [lastClickedValue, setLastClickedValue] = useState(null);
    const [timerId, setTimerId] = useState(null);

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
        });
    };

    function handleCheckboxChangeAll(e) {
        const key = e.target.name;
        const isChecked = e.target.checked;

        setValues(prevValues => {
            const newValues = { ...prevValues };

            if (isChecked) {
                // Получаем значения всех элементов как массив строк
                const attribute = filters.find(filter => filter.attribute.slug === key);
                const values = attribute.attribute.values.map(val => val.id.toString());
                // Устанавливаем выбранные значения в состояние
                newValues[key] = values;
            } else {
                // Если не выбраны, удаляем ключ из состояния
                delete newValues[key];
            }

            return newValues;
        });
    };

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
    };

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

    };

    // const handleResetFilter = (filterId) => {
    //     setValues(prevValues => {
    //         const newValues = { ...prevValues };
    
    //         // Удаляем значения выбранного фильтра из состояния
    //         delete newValues[filterId];
    
    //         return newValues;
    //     });
    //     applyFilters();
    // };

    const handleValueClick = (e) => {
        // TODO
        const labelElement = e.target.closest('label');
        const labelRect = labelElement.getBoundingClientRect();

        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

        // Сбрасываем предыдущий таймер, если он есть
        if (timerId) {
            clearTimeout(timerId);
        }
        const buttonHeight = 64;
        const buttonLeft = labelRect.left + scrollLeft + labelRect.width;
        // Позиционируем по середине метки
        const buttonTop = labelRect.top + scrollTop + (labelRect.height / 2) - (buttonHeight / 2);

        // Устанавливаем координаты кнопки
        setLastClickedValue({
            position: {
                top: buttonTop,
                left: buttonLeft,
            },
        });


        // Устанавливаем новый таймер для скрытия кнопки "Показать" через 5 секунд
        const newTimerId = setTimeout(() => {
            setLastClickedValue(null); // Скрываем кнопку "Показать" через 5 секунд
        }, 2000);
        setTimerId(newTimerId); // Сохраняем идентификатор нового таймера
    };

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
                        } else if (filter.type === 'price') {
                            return (
                                <FilterRange
                                    key={filter.attribute.id}
                                    filter={filter}
                                    handleRangeChange={handleRangeChange}
                                    values={values}
                                    handleBlur={handleBlur}
                                />
                            );

                        } else if (filter.type === 'checkbox') {
                            return (
                                <FilterChecbox 
                                    key={filter.attribute.id}
                                    filter={filter}
                                    values={values}
                                    handleCheckboxChange={handleCheckboxChange}
                                    handleCheckboxChangeAll={handleCheckboxChangeAll}
                                    setShowFilters={setShowFilters}
                                    handleValueClick={handleValueClick}
                                    resetOneFilter={resetOneFilter}
                                />
                            );
                        }

                    })}


                    {lastClickedValue !== null && (
                        <div>
                            <div 
                                className="absolute flex z-10 items-center"
                                style={{
                                    left: `${lastClickedValue.position.left}px`,
                                    top: `${lastClickedValue.position.top}px`, // Верхний край label
                                }}
                            >
                                <div className="w-0 h-0 
                                    border-t-[20px] border-t-transparent
                                    border-r-[28px] border-r-blue-500
                                    border-b-[20px] border-b-transparent">
                                </div>

                                <button 
                                    className="bg-blue-500 text-white p-5 rounded-md"
                                    onClick={applyFilters}
                                >
                                    Показать
                                </button>
                            </div>  
                        </div>
                    )}
                </div>
                <button onClick={applyFilters} className="border rounded-md mb-5 mt-5 p-3 bg-orange-400 text-white hover:bg-orange-300 text-sm font-semibold">Применить</button>
                <button onClick={resetAllFilter} className="border rounded-md p-3 text-sm font-semibold ">Сбросить</button>
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

                    <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >

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

                    </Transition>
                </div>
            )}
        </Disclosure>
    );
}

const FilterChecbox = ({ filter, handleCheckboxChange, values, handleCheckboxChangeAll, handleValueClick, setShowFilters, resetOneFilter }) => {

    const [showAll, setShowAll] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const allValuesSelected = filter.attribute.values.every(value => {
        return values[filter.attribute.slug]?.includes(value.id.toString());
    });

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setIsSearching(e.target.value !== ''); 
        setShowAll(true);
    };

    const filteredValues = filter.attribute.values.filter(value => {
        return value.name && value.name.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });


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
                    <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >

                        <Disclosure.Panel>
                            <div className="flex flex-col p-2 w-full">

                                {filter.attribute.values.length > 7 && (
                                    <>
                                    <div className="flex items-center p-2 w-full">
                                        <input 
                                            type="text" 
                                            placeholder="Поиск..." 
                                            className="px-2 py-1 border rounded-md border-gray-300 mr-2"
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                        />
                                    </div>

                                    {!isSearching && (
                                        <>
                                        <label 
                                            className="flex items-center p-2 w-full hover:bg-orange-100 rounded-md"
                                        >
                                            <input 
                                                name={filter.attribute.slug}
                                                value={filter.attribute.slug}
                                                type="checkbox" 
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                checked={allValuesSelected}
                                                onChange={handleCheckboxChangeAll}
                                                onClick={handleValueClick}
                                            />
                                            <span className="ml-2 text-sm text-gray-600">
                                                Выбрать все
                                            </span>
                                        </label>
                                        <hr/>
                                        </>

                                    )}

                                    </>
                                )}
                                
                                <div className={`flex flex-col w-full ${showAll ? 'max-h-64 overflow-y-auto' : ''}`}>
                                    {filteredValues.map((value, index) => (
                                        <label 
                                            htmlFor={value.id} 
                                            key={value.id} 
                                            className={
                                                `flex items-center p-2 w-full hover:bg-orange-100 rounded-md ${!showAll && index > 6 ? 'hidden' : ''}`
                                            }
                                        >
                                            <input 
                                                name={filter.attribute.slug}
                                                value={value.id}
                                                id={value.id}
                                                checked={Array.isArray(values[filter.attribute.slug]) && values[filter.attribute.slug].includes(value.id.toString())}
                                                type="checkbox" 
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                onChange={handleCheckboxChange}
                                                // onClick={() => handleValueClick(value.id)}
                                                onClick={handleValueClick}
                                            />

                                            <span className="ml-2 text-sm text-gray-600 flex ">
                                                <p>{value.name}</p>
                                                {value.product_characteristics_count > 0 && (
                                                    <p className="text-gray-400 ml-1">({value.product_characteristics_count})</p>
                                                )}
                                            </span>
                                        </label>
                                    ))}
                                </div>

                                <div className="flex justify-between items-center">
                                    <div>
                                    {!isSearching && filter.attribute.values.length > 7 && (
                                        <button onClick={toggleShowAll} className="px-3 py-1 bg-blue-500 text-white rounded-md mt-5">
                                            {showAll ? 'Скрыть все' : 'Показать все'}
                                        </button>
                                    )}
                                    </div>
                                    <div>
                                        {values.hasOwnProperty(filter.attribute.slug) && (
                                            <button 
                                                onClick={() => resetOneFilter(filter.attribute.slug)}
                                                className="px-3 py-1 bg-red-500 text-white rounded-md mt-5">
                                                Сбросить
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Disclosure.Panel>

                    </Transition>
                </div>
            )}
        </Disclosure>
    );
}