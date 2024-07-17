// import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid';
import { Link } from '@inertiajs/react'

export default function Breadcrumbs({ breadcrumbs }) {

    return (
        <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                {breadcrumbs.map((breadcrumb, index) => (
                    <li key={index} className="inline-flex items-center">
                        {index > 0 && (
                            <div className="flex items-center">

                                <ChevronRightIcon className='w-5 h-5 text-gray-400'/>

                                {index === breadcrumbs.length - 1 ? (
                                    <span className="ms-1 text-sm font-medium text-gray-400 dark:text-gray-400">
                                            {breadcrumb.title}
                                    </span>
                                ) : (
                                    <Link
                                        href={breadcrumb.url}
                                        className="ms-1 text-sm font-medium text-gray-700 hover:text-orange-400 
                                        md:ms-2 dark:text-gray-400 dark:hover:text-white"
                                    >
                                        <span>{breadcrumb.title}</span>
                                    </Link>
                                )}

                            </div>
                        )}
                        {index === 0 && (
                            <Link
                                href={breadcrumb.url}
                                className="inline-flex items-center text-sm 
                                    font-medium text-gray-700 hover:text-orange-400 
                                    dark:text-gray-400 dark:hover:text-white"
                            >
                                <HomeIcon className='w-4 h-4 me-2.5'/>
                                <span>{breadcrumb.title}</span>
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};