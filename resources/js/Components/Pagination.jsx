import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { InertiaLink } from '@inertiajs/inertia-react';
import { usePage } from '@inertiajs/react';

export default function Pagination({ products }) {

  const { current_page, last_page, prev_page_url, next_page_url } = products;
  const { url } = usePage();

  // const renderPageNumbers = () => {
  //   const pageNumbers = [];
  //   for (let i = 1; i <= last_page; i++) {
  //     const pageNumberUrl = `${url}${url.includes('?') ? '&' : '?'}page=${i}`;
  //     pageNumbers.push(
  //       <InertiaLink
  //         key={i}
  //         href={pageNumberUrl}
  //         className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
  //           current_page === i
  //             ? 'bg-orange-400 text-white'
  //             : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
  //         }`}
  //       >
  //         {i}
  //       </InertiaLink>
  //     );
  //   }
  //   return pageNumbers;
  // };



  // const renderPageNumbers = () => {
  //   const pageNumbers = [];

  //   // Максимальное количество страниц, которые будут показаны внутри
  //   const maxDisplayedPages = 6;

  //   // Если всего страниц меньше или равно максимальному количеству страниц для отображения
  //   if (last_page <= maxDisplayedPages) {
  //     for (let i = 1; i <= last_page; i++) {
  //       pageNumbers.push(renderPageLink(i));
  //     }
  //   } else {
  //     // Если всего страниц больше максимального количества страниц для отображения

  //     // Показываем первые три страницы
  //     for (let i = 1; i <= 3; i++) {
  //       pageNumbers.push(renderPageLink(i));
  //     }

  //     // Вставляем многоточие
  //     pageNumbers.push(
  //       <span
  //         key="ellipsis"
  //         className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
  //       >
  //         ...
  //       </span>
  //     );

  //     // Показываем последние три страницы
  //     for (let i = last_page - 2; i <= last_page; i++) {
  //       pageNumbers.push(renderPageLink(i));
  //     }
  //   }

  //   return pageNumbers;
  // };


  // const renderPageLink = (pageNumber) => {
  //   const pageNumberUrl = `${url}${url.includes('?') ? '&' : '?'}page=${pageNumber}`;
  //   return (
  //     <InertiaLink
  //       key={pageNumber}
  //       href={pageNumberUrl}
  //       className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
  //         current_page === pageNumber
  //           ? 'bg-orange-400 text-white'
  //           : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
  //       }`}
  //     >
  //       {pageNumber}
  //     </InertiaLink>
  //   );
  // };








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
      <InertiaLink
        key={pageNumber}
        href={pageNumberUrl}
        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
          current_page === pageNumber
            ? 'bg-orange-400 text-white'
            : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
        }`}
      >
        {pageNumber}
      </InertiaLink>
    );
  };

  // Функция для рендеринга многоточия
  const renderEllipsis = (position) => {
    return (
      <span
        key={`ellipsis-${position}`}
        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
      >
        ...
      </span>
    );
  };


  return (
    <div className="flex flex-col items-center justify-between border-t border-gray-200 bg-white px-4 sm:px-6">

      {/* <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between"> */}
      <div className='flex flex-col items-center justify-center'>
        <div>
          <p className="text-sm text-gray-700 mb-5 mt-5">
              Показаны результаты с {' '}
              <span className="font-medium">{products.from}</span> по{' '}
              <span className="font-medium">{products.to}</span> из{' '}
            	<span className="font-medium">{products.total}</span>
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a
              href={prev_page_url}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>


            { renderPageNumbers() }


            <a
              href={next_page_url}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            
          </nav>
        </div>
      </div>
    </div>
  )
}

{/* <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
...
</span> */}

// {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
// <a
//   href="#"
//   aria-current="page"
//   className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
// >
//   1
// </a>
// <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
//   ...
// </span>


{/* <div className="flex flex-1 justify-between sm:hidden">
<a
  href="#"
  className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
>
  Previous
</a>
<a
  href="#"
  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
>
  Next
</a>
</div> */}