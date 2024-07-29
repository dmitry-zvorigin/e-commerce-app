import { Link } from '@inertiajs/react'
import { ChevronDoubleRightIcon, ChevronDoubleLeftIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { usePage } from '@inertiajs/react';

export default function Pagination({ data, onPageChange }) {

	// 	const { current_page, last_page, prev_page_url, next_page_url } = data;
	// 	const { url } = usePage();

	const { current_page, last_page, prev_page_url, next_page_url, first_page_url, last_page_url } = data;
	const { url } = usePage();

	const renderPageNumbers = () => {
		const pageNumbers = [];
		const totalPages = last_page;

		// Добавляем первые три страницы
		for (let i = 1; i <= Math.min(totalPages, 3); i++) {
			pageNumbers.push(renderPageLink(i));
		}

		// Добавляем страницы вокруг текущей страницы
		const leftBoundary = Math.max(4, current_page - 2);
		const rightBoundary = Math.min(totalPages - 3, current_page + 2);
		if (leftBoundary > 4) {
			pageNumbers.push(renderEllipsis("left"));
		}
		for (let i = leftBoundary; i <= rightBoundary; i++) {
			pageNumbers.push(renderPageLink(i));
		}
		if (rightBoundary < totalPages - 3) {
			pageNumbers.push(renderEllipsis("right"));
		}

		// Добавляем последние три страницы
		for (let i = Math.max(totalPages - 2, 1); i <= totalPages; i++) {
			if (!pageNumbers.some((page) => parseInt(page.key) === i)) { // Проверяем, что страница еще не добавлена
				pageNumbers.push(renderPageLink(i));
			}
		}

		return pageNumbers;
	};


	// Функция для генерации ссылки на страницу
	const renderPageLink = (pageNumber) => {
		const pageNumberUrl = `${url}${url.includes('?') ? '&' : '?'}page=${pageNumber}`;

		return (
			<button
				key={pageNumber}
				href={pageNumberUrl}
				className={`relative inline-flex items-center text-sm font-semibold h-full w-[50px] justify-center ${
				current_page === pageNumber
					? 'text-orange-500 border-b-2 border-orange-500'
					: 'text-gray-400 hover:bg-orange-400 hover:text-white'
				}`}
				onClick={(e) => {
					e.preventDefault();
					if (current_page !== pageNumber) {
						onPageChange(pageNumber);
					}
					
				}}
			>
				{pageNumber}
			</button>
		);
	};

	// Функция для рендеринга многоточия
	const renderEllipsis = (position) => {

		return (
			<span
				key={`ellipsis-${position}`}
				className="
					relative inline-flex items-center px-4 py-2 text-sm font-semibold 
					text-gray-700 focus:outline-offset-0
				"
			>
				...
			</span>
		);
	};


	return (
		<div className="flex flex-col items-center justify-between mb-5 mt-5 border h-[50px]  border-slate-300 rounded-lg">

			<div className='h-full flex justify-center items-center'>

				<button
					className='
						relative inline-flex items-center rounded-l-md justify-center 
						text-gray-400 focus:z-20 focus:outline-offset-0
						hover:bg-orange-400 hover:text-white h-full w-[50px]
					'
					onClick={(e) => {
						e.preventDefault();
						if (current_page > 1) {
							onPageChange(1);
						}
					}}
				>
					<span className='sr-only'>Start</span>
					<ChevronDoubleLeftIcon className='h-5 w-5' aria-hidden="true" />
				</button>

				<button
					className="
						relative inline-flex items-center justify-center
						text-gray-400 focus:z-20 focus:outline-offset-0
						hover:bg-orange-400 hover:text-white h-full w-[50px]
					"
					onClick={(e) => {
						e.preventDefault();
						if (current_page > 1) {
							onPageChange(current_page - 1);
						}
					}}
				>
					<span className="sr-only">Previous</span>
					<ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
				</button>

				{ renderPageNumbers() }

				<button
					className="
						relative inline-flex items-center justify-center
						text-gray-400 focus:z-20 focus:outline-offset-0
						hover:bg-orange-400 hover:text-white h-full w-[50px]
					"
					onClick={(e) => {
						e.preventDefault();
						if (current_page < last_page) {
							onPageChange(current_page + 1);
						}
					}}
				>
					<span className="sr-only">Next</span>
					<ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
				</button>

				<button
					className="
						relative inline-flex items-center rounded-r-md justify-center
						text-gray-400 focus:z-20 focus:outline-offset-0
						hover:bg-orange-400 hover:text-white h-full w-[50px]
					"
					onClick={(e) => {
						e.preventDefault();
						if (current_page < last_page) {
							onPageChange(last_page);
						}
					}}
				>
					<span className="sr-only">End</span>
					<ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
				</button>

			</div>
		</div>
	);
}

// 	const renderPageNumbers = () => {
// 		const pageNumbers = [];
// 		const totalPages = last_page;
	
// 		// Добавляем первые три страницы
// 		for (let i = 1; i <= Math.min(totalPages, 3); i++) {
// 			pageNumbers.push(renderPageLink(i));
// 		}
  
// 		// Добавляем страницы вокруг текущей страницы
// 		const leftBoundary = Math.max(4, current_page - 2);
// 		const rightBoundary = Math.min(totalPages - 3, current_page + 2);
// 		if (leftBoundary > 4) {
// 			pageNumbers.push(renderEllipsis("left"));
// 		}
// 		for (let i = leftBoundary; i <= rightBoundary; i++) {
// 			pageNumbers.push(renderPageLink(i));
// 		}
// 		if (rightBoundary < totalPages - 3) {
// 			pageNumbers.push(renderEllipsis("right"));
// 		}
    
// 		// Добавляем последние три страницы
// 		for (let i = Math.max(totalPages - 2, 1); i <= totalPages; i++) {
// 			if (!pageNumbers.some((page) => parseInt(page.key) === i)) { // Проверяем, что страница еще не добавлена
// 				pageNumbers.push(renderPageLink(i));
// 			}
// 		}

//     	return pageNumbers;
//   	};


// 	// Функция для генерации ссылки на страницу
// 	const renderPageLink = (pageNumber) => {
// 		const pageNumberUrl = `${url}${url.includes('?') ? '&' : '?'}page=${pageNumber}`;

// 		return (
// 			<Link
// 				key={pageNumber}
// 				href={pageNumberUrl}
// 				className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
// 				current_page === pageNumber
// 					? 'bg-orange-400 text-white'
// 					: 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
// 				}`}
// 			>
// 				{pageNumber}
// 			</Link>
// 		);
// 	};

// 	// Функция для рендеринга многоточия
// 	const renderEllipsis = (position) => {
// 		return (
// 		<span
// 			key={`ellipsis-${position}`}
// 			className="relative inline-flex items-center px-4 py-2 text-sm 
// 				font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
// 		>
// 			...
// 		</span>
// 		);
// 	};


// 	return (
// 		<div className="flex flex-col items-center justify-between border border-slate-300 h-[50px] rounded-lg mb-5">

// 			{/* <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between"> */}
// 			<div className='flex flex-col items-center justify-center'>
// 				{/* <div>
// 					<p className="text-sm text-gray-700 mb-5 mt-5">
// 						Показаны результаты с {' '}
// 						<span className="font-medium">{data.from}</span> по{' '}
// 						<span className="font-medium">{data.to}</span> из{' '}
// 							<span className="font-medium">{data.total}</span>
// 					</p>
// 				</div> */}
// 				<div>
// 					<nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
// 						<a
// 							href={prev_page_url}
// 							className="relative inline-flex items-center rounded-l-md px-2 py-2 
// 								text-gray-400 ring-1 ring-inset 
// 								ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
// 						>
// 							<span className="sr-only">Previous</span>
// 							<ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
// 						</a>


// 						{ renderPageNumbers() }


// 						<a
// 							href={next_page_url}
// 							className="relative inline-flex items-center rounded-r-md px-2 py-2 
// 								text-gray-400 ring-1 ring-inset 
// 								ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
// 						>
// 							<span className="sr-only">Next</span>
// 							<ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
// 						</a>
						
// 					</nav>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }