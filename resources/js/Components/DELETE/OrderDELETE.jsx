// import { ChevronDownIcon } from "@heroicons/react/24/outline";
// import { CheckIcon } from "@heroicons/react/20/solid";
// import { useState } from "react";
// import { Listbox } from '@headlessui/react'


// const sortOptions = [
//     { key: 'order', name: 'Сначала недорогие', value: '1' },
//     { key: 'order', name: 'Сначала дорогие', value: '2' },
//     { key: 'order', name: 'Сначала популярные', value: '6' },
//     { key: 'order', name: 'Сначала новые', value: '3' },
//     { key: 'order', name: 'Сначала старные', value: '4' },
// ];

// export default function Order({ values, setValues, setShowOrder }) {

//     const initialSelectedOrder = values.hasOwnProperty('order') && sortOptions.some(option => option.value === values.order[0])
//         ? sortOptions.find(option => option.value === values.order[0])
//         : sortOptions[0];

//     const [selectedOrder, setSelectedOrder] = useState(initialSelectedOrder);

//     function handleOrderChange(selectedOption) {

//         // Проверяем, что выбранное значение не равно значению по умолчанию
//         if (selectedOption.value !== '1') {
//             // Обновляем состояние values, устанавливая выбранное значение сортировки
//             setValues(prevValues => ({
//                 ...prevValues,
//                 order: [selectedOption.value] // Устанавливаем выбранное значение сортировки в массив
//             }));
//         } else {
//             // Если выбрано значение по умолчанию, удаляем ключ order из values
//             const { order, ...rest } = values;
//             setValues(rest);
//         }
//         // Обновляем выбранную опцию
//         setSelectedOrder(selectedOption);
//         setShowOrder(true);
//     }


//     return (
//         <>

//         <Listbox value={selectedOrder} as='div' className='relative' onChange={handleOrderChange}>

//             <Listbox.Button className='flex items-center group'>
//                 <h5 className='text-sm text-gray-900'>Сортировка:</h5>
//                 <p className='font-medium text-sm text-gray-900 group-hover:text-orange-700'>{selectedOrder.name}</p>
//                 <ChevronDownIcon
//                     className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-orange-700"
//                     aria-hidden="true"
//                 />
//             </Listbox.Button>

//             <Listbox.Options className='absolute z-10 w-64 top-10 rounded-md bg-white shadow-2xl border border-slate-300 '>
//                 {sortOptions.map((option, index) => (
//                     <Listbox.Option
//                         key={index}
//                         name={option.key}
//                         value={option}
//                         // className='font-medium text-gray-900 block px-4 py-2 text-sm hover:bg-orange-300'
//                         className={({ active }) =>
//                         `relative cursor-default select-none py-2 pl-10 pr-4 text-sm ${
//                           active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
//                         }`
//                       }
//                     >
//                         {({ selected }) => (
//                             <div className="flex items-center">
//                                 {selected ? (
//                                     <span className="text-amber-600 absolute inset-y-0 left-0 flex items-center pl-3">
//                                         <CheckIcon className="h-6 w-5" aria-hidden="true" />
//                                     </span>
//                                 ) : null }
//                                 <span
//                                     className={`block truncate ${
//                                     selected ? 'font-medium' : 'font-normal'
//                                     }`}
//                                 >
//                                     {option.name}
//                                 </span>
//                             </div>
//                         )}
//                     </Listbox.Option>
//                 ))}
//             </Listbox.Options>

//         </Listbox>

//         </>

//     );
// }