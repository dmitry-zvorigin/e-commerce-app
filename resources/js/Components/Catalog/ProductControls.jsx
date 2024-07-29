import { useEffect, useState, useRef } from 'react'
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

	const productsRef = useRef(null);

	const [values, setValues] = useState(filters_query);
	const [showFilters, setShowFilters] = useState(false);
	const [showOrder, setShowOrder] = useState(false);

	const [currentPage, setCurrentPage] = useState(products.current_page);
	const [currentProducts, setCurrentProducts] = useState(products.data);

	// Загрузка
	const [loading, setLoading] = useState(false);
	

	const fetchProducts = (page = 1, append = false, ref = true, filters = values) => {
		const query = buildQuery(filters, page);
		setLoading(true);

		router.get(route(route().current(), { categorySlug: category.slug }), query, {
            preserveState: true,
            preserveScroll: true,
            only: ['products'],
            onSuccess: page => {
                if (append) {
                    setCurrentProducts(prevProducts => [...prevProducts, ...page.props.products.data]);
                } else {
                    setCurrentProducts(page.props.products.data);
                }
                setCurrentPage(page.props.products.current_page);
                setLoading(false);
            },
            onFinish: () => {
				if (ref) {
					productsRef.current.scrollIntoView({ behavior: 'smooth' });
				}
                
            },
            onError: () => setLoading(false),
        });

	};


	const buildQuery = (values, page) => {
		const query = Object.fromEntries(
			Object.entries(values).map(([key, value]) => [key, [value.join(',')]])
		);

		query.page = page;
		return query;
	};

	const applyFilters = () => {
		setCurrentPage(1);
		fetchProducts(1);
	};

	useEffect(() => {
		if (showOrder) {
			setCurrentPage(1);
			fetchProducts(1);
		}
	}, [values.order, showOrder]);

	const resetAllFilter = () => {
        const order = values['order'];
        const newValues = order ? { 'order': order } : {};
        setValues(newValues);
        setShowFilters(true);
        setCurrentPage(1);
        fetchProducts(1, false, true, newValues);
    };

    const resetOneFilter = (filterId) => {
        const newValues = { ...values };
        delete newValues[filterId];
        setValues(newValues);
        setCurrentPage(1);
        fetchProducts(1, false, true, newValues);
    };

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        fetchProducts(pageNumber);
    };

    const loadMore = () => {
        if (loading) return;
        fetchProducts(currentPage + 1, true, false);
    };

	// function applyFilters() {
	// 	const query = Object.fromEntries(
	// 		Object.entries(values).map(([key, value]) => [key, [value.join(',')]])
	// 	);

	// 	delete query.page;
	// 	setCurrentPage(1);

	// 	router.get(route(route().current(), { categorySlug: category.slug }), query, {
	// 		preserveState: true,
	// 		preserveScroll: true,
	// 		only: ['products'],
	// 		onSuccess: page => {
	// 			setCurrentProducts(page.props.products.data);
	// 		},
	// 		onFinish: () => {
    //             productsRef.current.scrollIntoView({ behavior: 'smooth' });

    //         },
	// 	});
	// }

	// function resetAllFilter() {
	// 		// const order = values['order']; // Сохраняем значение сортировки
	// 		// setValues({}); // Очищаем все значения фильтров
	// 		// setShowFilters(true);
	// 		// if (order) {
	// 		// 	setValues({ 'order': order }); // Восстанавливаем значение сортировки
	// 		// }

	// 		const order = values['order']; // Сохраняем значение сортировки
	// 		const newValues = order ? { 'order': order } : {}; // Создаем новый объект значений с сортировкой (если есть)
	// 		setValues(newValues); // Устанавливаем новое состояние значений
	// 		setShowFilters(true); // Показываем фильтры
		
	// 		const query = Object.fromEntries(
	// 			Object.entries(newValues).map(([key, value]) => [key, [value.join(',')]])
	// 		);
		
	// 		delete query.page;
	// 		setCurrentPage(1);
		
	// 		router.get(route(route().current(), { categorySlug: category.slug }), query, {
	// 			preserveState: true,
	// 			preserveScroll: true,
	// 			only: ['products'],
	// 			onSuccess: page => {
	// 				setCurrentProducts(page.props.products.data);
	// 			},
	// 			onFinish: () => {
	// 				productsRef.current.scrollIntoView({ behavior: 'smooth' });
	// 			},
	// 		});
	// }

	// function resetOneFilter(filterId) {
	// 	const newValues = { ...values }; // Получаем все значения
	// 	delete newValues[filterId]; // Удаляем не нужный фильтр

	// 	setValues(newValues); // Устанавливаем новое состояние значений

	// 	const query = Object.fromEntries(
	// 		Object.entries(newValues).map(([key, value]) => [key, [value.join(',')]])
	// 	);
	
	// 	delete query.page;
	// 	setCurrentPage(1);
	
	// 	router.get(route(route().current(), { categorySlug: category.slug }), query, {
	// 		preserveState: true,
	// 		preserveScroll: true,
	// 		only: ['products'],
	// 		onSuccess: page => {
	// 			setCurrentProducts(page.props.products.data);
	// 		},
	// 		onFinish: () => {
    //             productsRef.current.scrollIntoView({ behavior: 'smooth' });
    //         },
	// 	});

	// }

	// function onPageChange(pageNumber) {
	// 	const query = Object.fromEntries(
	// 		Object.entries(values).map(([key, value]) => [key, [value.join(',')]])
	// 	);

	// 	query.page = pageNumber;
	// 	setCurrentPage(pageNumber);

	// 	router.get(route(route().current(), { categorySlug: category.slug }), query, {
	// 		preserveState: true,
	// 		preserveScroll: true,
	// 		only: ['products'],
	// 		onSuccess: page => {
	// 			setCurrentProducts(page.props.products.data);
	// 		},
	// 		onFinish: () => {
    //             productsRef.current.scrollIntoView({ behavior: 'smooth' });
    //         },
	// 	});
	// }

	// function loadMore() {
	// 	if (loading) return;

	// 	const nextPage = currentPage + 1;

	// 	setLoading(true);

	// 	const query = Object.fromEntries(
	// 		Object.entries(values).map(([key, value]) => [key, [value.join(',')]])
	// 	);

	// 	query.page = nextPage;

	// 	router.get(route(route().current(), { categorySlug: category.slug }), query, {
	// 		preserveState: true,
	// 		preserveScroll: true,
	// 		only: ['products'],
	// 		onSuccess: page => {
	// 			setCurrentProducts(prevProducts => [...prevProducts, ...page.props.products.data]);
	// 			setLoading(false);
	// 			setCurrentPage(nextPage);
	// 		},
	// 		// onFinish: () => {
                
    //         // },
	// 		onError: () => setLoading(false),
	// 	});

	// }


	// useEffect(() => {
	// 	if (showOrder) {
	// 		const query = Object.fromEntries(
	// 			Object.entries(values).map(([key, value]) => [key, [value.join(',')]])
	// 		);

	// 		delete query.page;
	// 		setCurrentPage(1);
			
	// 		router.get(route(route().current(), { categorySlug: category.slug }), query, {
	// 			preserveState: true,
	// 			preserveScroll: true,
	// 			only: ['products'],
	// 			onSuccess: page => {
	// 				setCurrentProducts(page.props.products.data);
	// 			},
	// 			onFinish: () => {
	// 				productsRef.current.scrollIntoView({ behavior: 'smooth' });
	// 			},
	// 		});
	// 	}
	// }, [values.order, showOrder]);


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

					<div className='rounded-md border border-slate-300 p-4 flex justify-between items-center' ref={productsRef}>
						<Order values={values} setValues={setValues} setShowOrder={setShowOrder}/>
                        <ViewControls/>
					</div>

					<div className="lg:col-span-3">
						<ProductList products={currentProducts} />
						
						{ products.next_page_url !== null && (
							<button 
								className="border rounded-lg border-slate-300 h-[50px] text-center w-full"
								onClick={loadMore}
							>
								{loading ? 'Загрузка...' : 'Показать еще'}
							</button>
						)}

						{ products.last_page > 1 && (
                            <Pagination data={products} onPageChange={onPageChange}/>
                        )}
						
					</div>
					
				</div>
			</div>
			<ScrollToTopButton/>
		</div>
	)
}