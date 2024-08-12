import { useEffect, useState, useRef } from 'react'
import Order from './Order';
import ProductList from './ProductsView';
import Pagination from './Pagination';
import Filters from './Filters';
import { router, usePage } from '@inertiajs/react'
import ViewControls from './ViewControls';
import ScrollToTopButton from '@/MyComponents/ScrollToTopButton';
import ProductsView from './ProductsView';

export default function ProductControls() {
	const { products, category, filters_query } = usePage().props;

	const productsRef = useRef(null);

	const initialValues = Object.keys(filters_query).reduce((acc, key) => {
		const value = filters_query[key];
		acc[key] = value.includes(',') ? value.split(',') : [value];
		return acc;
	}, {});

	const [values, setValues] = useState(initialValues);
	const [showFilters, setShowFilters] = useState(false);
	const [showOrder, setShowOrder] = useState(false);

	const [currentPage, setCurrentPage] = useState(products.current_page);
	const [currentProducts, setCurrentProducts] = useState(products.data);

	// Загрузка
	const [loading, setLoading] = useState(false);
	const [initialLoading, setInitialLoading] = useState(false);

	// Вид продуктов
	const urlParams = new URLSearchParams(window.location.search);
	const initialMode = urlParams.get('mode') || 'list';

	const fetchProducts = (page = 1, append = false, ref = true, filters = values) => {
		const query = buildQuery(filters, page);

		if (!append) {
			setInitialLoading(true);
		} else {
			setLoading(true);
		}

		if (page === 1) {
			delete query.page;
		}


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
				setInitialLoading(false);
            },
            onFinish: () => {
				if (ref) {
					productsRef.current.scrollIntoView({ behavior: 'smooth' });
				}
                
            },
            onError: () => {
				setLoading(false);
				setInitialLoading(false);
			},
        });

	};


	const buildQuery = (values, page) => {
		const query = {
			...values,
			page,
		}

		Object.keys(query).forEach(key => {
			if (Array.isArray(query[key])) {
				query[key] = query[key].join(',');
			}
		});

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
		// const mode = values['mode'];
		// const order = values['order'];
        // const newValues = order ? { 'order': order } : {};

		const mode = values['mode'];
		const order = values['order'];
		const newValues = {
			...(order ? { 'order': order } : {}),
			...(mode ? { 'mode': mode } : {})
		};


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
                        <ViewControls values={values} setValues={setValues} />
					</div>

					<div className="lg:col-span-3">
						<ProductsView products={currentProducts} loading={initialLoading} initialMode={initialMode} />

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

