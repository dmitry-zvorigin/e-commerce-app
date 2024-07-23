import { useEffect, useState } from 'react'
import Order from './Order';
import ProductList from './ProductList';
import Pagination from './Pagination';
import Filters from './Filters';
import { router, usePage } from '@inertiajs/react'
import ViewControls from './ViewControls';
import ScrollToTopButton from '@/MyComponents/ScrollToTopButton';

export default function ProductControls() {
	// TODO
	const { products, category, filters_query } = usePage().props;

	const [values, setValues] = useState(filters_query);
	const [showFilters, setShowFilters] = useState(false);
	const [showOrder, setShowOrder] = useState(false);
	
	useEffect(() => {
		if (showOrder) {
			const query = Object.fromEntries(
				Object.entries(values).map(([key, value]) => [key, [value.join(',')]])
			);

			delete query.page;
			
			router.get(route(route().current(), { categorySlug: category.slug }), query, {
				preserveState: true,
				preserveScroll: true,
				only: ['products'],
			});
		}
	}, [values.order, showOrder]);


	function applyFilters() {
		const query = Object.fromEntries(
			Object.entries(values).map(([key, value]) => [key, [value.join(',')]])
		);

		delete query.page;

		router.get(route(route().current(), { categorySlug: category.slug }), query, {
			preserveState: true,
			preserveScroll: true,
			only: ['products'],
		});
	}

	function resetAllFilter() {
			// const order = values['order']; // Сохраняем значение сортировки
			// setValues({}); // Очищаем все значения фильтров
			// setShowFilters(true);
			// if (order) {
			// 	setValues({ 'order': order }); // Восстанавливаем значение сортировки
			// }

			const order = values['order']; // Сохраняем значение сортировки
			const newValues = order ? { 'order': order } : {}; // Создаем новый объект значений с сортировкой (если есть)
			setValues(newValues); // Устанавливаем новое состояние значений
			setShowFilters(true); // Показываем фильтры
		
			const query = Object.fromEntries(
				Object.entries(newValues).map(([key, value]) => [key, [value.join(',')]])
			);
		
			delete query.page;
		
			router.get(route(route().current(), { categorySlug: category.slug }), query, {
				preserveState: true,
				preserveScroll: true,
				only: ['products'],
			});
	}

	function resetOneFilter(filterId) {
		const newValues = { ...values }; // Получаем все значения
		delete newValues[filterId]; // Удаляем не нужный фильтр

		setValues(newValues); // Устанавливаем новое состояние значений

		const query = Object.fromEntries(
			Object.entries(newValues).map(([key, value]) => [key, [value.join(',')]])
		);
	
		delete query.page;
	
		router.get(route(route().current(), { categorySlug: category.slug }), query, {
			preserveState: true,
			preserveScroll: true,
			only: ['products'],
		});


	}

	return (
		<div className="bg-white mt-8">

			<div className='flex flex-row'>

				<div className='rounded-md border border-slate-300 basis-2/6 h-max'>
					<Filters 
						values={values} 
						setValues={setValues} 
						showFilters={showFilters} 
						setShowFilters={setShowFilters} 
						resetAllFilter={resetAllFilter}
						resetOneFilter={resetOneFilter} 
						applyFilters={applyFilters}
					/>
				</div>

				<div className='row-span-2 col-span-2 w-full ml-5'>

					<div className='rounded-md border border-slate-300 p-4 flex justify-between items-center'>
						<Order values={values} setValues={setValues} setShowOrder={setShowOrder}/>
                        <ViewControls/>
					</div>

					<div className="lg:col-span-3">
						<ProductList />
						<Pagination data={products}/>
					</div>
					
				</div>
			</div>
			<ScrollToTopButton/>
		</div>
	)
}