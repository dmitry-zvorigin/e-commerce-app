import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import DefaultLayout from '@/Layouts/DefaultLayout';
import Breadcrumbs from '@/Components/Breadcrumbs';
import ProductCard from "@/Components/Product/ProductCard";
import ScrollToTopButton from '@/MyComponents/ScrollToTopButton';
import { useRef } from 'react';
import { StarIcon, TableCellsIcon } from '@heroicons/react/24/outline';
import ProductSpecificationsComponent from '@/Components/Product/ProductSpecificationsComponent';
import ProductShowComponent from '@/Components/Product/ProductShowComponent';
import ProductReviewsComponent from '@/Components/Product/ProductReviewsComponent';

export default function Product({ 
    breadcrumbs, groupedCharacteristics, popularReview, reviewImages, reviews, ratingsGroups, averageOptionRatings, request  
}) {


    const links = [
        {title: 'Характеристики', url: 'product.specifications', icon: <TableCellsIcon className='w-5 h-5 text-gray-500'/>},
        {title: 'Отзывы', url: 'product.reviews', icon: <StarIcon className='w-5 h-5 text-gray-500'/>},
    ];

    const { product, currentTab } = usePage().props;

    const sectionRef = useRef(null);

    const renderTabContent = () => {
        switch (currentTab) {
            case 'reviews':
                return <ProductReviewsComponent 
                        product={product} 
                        popularReview={popularReview} 
                        reviewImages={reviewImages} 
                        ratingsGroups={ratingsGroups}
                        averageOptionRatings={averageOptionRatings}
                        reviews={reviews}
                        request={request}
                    />;
            case 'specifications':
                return <ProductSpecificationsComponent product={product} characteristics={groupedCharacteristics} />;
            default:
                return <ProductShowComponent product={product} characteristics={groupedCharacteristics} popularReview={popularReview} />;
        }
    };

    return (
        <>
            <DefaultLayout>
            <div className="bg-white">
                <div className="max-w-full my-8">
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                        {product.name}
                    </h2>

                    <ProductCard product={product} reviewImages={reviewImages} />

                    <div className="flex mt-5">
                        <div className="min-w-[280px] mr-8">
                            <div className="border rounded-lg p-2 flex flex-col">
                                <nav>
                                    <ul className='flex flex-col gap-2'>
                                        {links.map((element, index) => (
                                            <li key={index}>
                                                <Link
                                                    href={route(element.url, { productSlug: product.slug })} 
                                                    preserveScroll 
                                                    preserveState
                                                    onSuccess={() => sectionRef.current.scrollIntoView({ behavior: 'smooth' })}
                                                    // className='flex gap-2 p-2 hover:text-orange-400 border-l-[4px] border-white hover:border-orange-400'
                                                    className={
                                                        `flex gap-2 p-2 hover:text-orange-400 border-l-[4px] 
                                                        ${currentTab === element.url.split('.').pop() ? 'border-orange-400' : 'border-white'}`
                                                    }
                                                >
                                                    {element.icon}
                                                    <span>{element.title}</span>
                                                </Link>
                                            </li>
                                        ))}

                                        {/* <li>
                                            <Link 
                                                href={route('product.show', { productSlug: product.slug })} 
                                                preserveScroll
                                                preserveState
                                                onSuccess={() => sectionRef.current.scrollIntoView({ behavior: 'smooth' })}
                                            >
                                                <TableCellsIcon/>
                                                Обзор
                                            </Link>
                                        </li> */}


                                    </ul>
                                </nav>
                            </div>

                        </div>
                        
                        <div className="w-full" ref={sectionRef}>
                            {renderTabContent()}
                        </div>
                    </div>

                </div>
            </div>

            <ScrollToTopButton/>

            </DefaultLayout>
        </>
    );

}