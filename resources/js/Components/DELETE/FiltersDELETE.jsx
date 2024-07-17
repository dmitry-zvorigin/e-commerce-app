// /*
//   This example requires some changes to your config:
  
//   ```
//   // tailwind.config.js
//   module.exports = {
//     // ...
//     plugins: [
//       // ...
//       require('@tailwindcss/forms'),
//     ],
//   }
//   ```
// */
// import { useEffect, useState } from 'react'
// import { Bars4Icon } from '@heroicons/react/24/outline'
// import { Squares2X2Icon } from '@heroicons/react/20/solid'
// import ProductList from './ProductList'
// import Pagination from './Pagination'
// import Filt from './Filt'
// import Order from './Order'
// import { usePage } from '@inertiajs/react';
// import { Inertia } from '@inertiajs/inertia';


// export default function Filters() {
// 	// TODO
// 	const { products, category, filters_query } = usePage().props;
// 	const [values, setValues] = useState(filters_query);
// 	const [showFilters, setShowFilters] = useState(false);
// 	const [showOrder, setShowOrder] = useState(false);

// 	useEffect(() => {
// 		if (showFilters || showOrder) {
// 			const query = Object.fromEntries(
// 				Object.entries(values).map(([key, value]) => [key, [value.join(',')]])
// 			);

// 			delete query.page;
			
// 			Inertia.get(route(route().current(), category.slug), query, {
// 				replace: true,
// 				preserveState: true,
// 			});
// 		}
// 	}, [showFilters, values, showOrder]);

// 	function reset() {
// 			const order = values['order']; // Сохраняем значение сортировки
// 			setValues({}); // Очищаем все значения фильтров
// 			setShowFilters(true);
// 			if (order) {
// 				setValues({ 'order': order }); // Восстанавливаем значение сортировки
// 			}
// 	}



// 	return (
// 		<div className="bg-white mt-8">

// 			<div className='flex flex-row'>

// 				<div className='rounded-md border border-slate-300 basis-2/6 h-max'>
// 					<Filt values={values} setValues={setValues} showFilters={showFilters} setShowFilters={setShowFilters} reset={reset}/>
// 				</div>

// 				<div className='row-span-2 col-span-2 w-full ml-5'>

// 					<div className='rounded-md border border-slate-300 p-4 flex justify-between items-center'>
// 						<Order values={values} setValues={setValues} setShowOrder={setShowOrder}/>

// 						<div>
// 							<button type="button" className='-m-2  p-2 text-gray-400 hover:text-orange-700'>
// 								<Bars4Icon className='h-5 w-5' aria-hidden="true" />
// 							</button>
// 							<button type="button" className="-m-2 ml-2 p-2 text-gray-400 hover:text-orange-700">
// 								<span className="sr-only">View grid</span>
// 								<Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
// 							</button>
// 						</div>

// 					</div>

// 					<div className="lg:col-span-3">
// 						<ProductList products={products}/>
// 						<Pagination data={products}/>
// 					</div>
					
// 				</div>
// 			</div>
		
// 		</div>
// 	)
// }
