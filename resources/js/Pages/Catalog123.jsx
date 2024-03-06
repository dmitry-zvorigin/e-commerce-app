import Banners from '@/Components/Banners';
import Breadcrumbs from '@/Components/Breadcrumbs';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { Link } from '@inertiajs/react'
import { useState } from "react";

export default function Catalog({ categories, breadcrumbs }) {

    // console.log(categories);
    // console.log(categories);
    const [showChildren, setShowChildren] = useState(null);

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <Breadcrumbs breadcrumbs={breadcrumbs} />
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Каталог товаров</h2>
        
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {categories.map((category) => (
                    <div 
                        key={category.id} 
                        className="relative"
                        onMouseEnter={() => setShowChildren(category)}
                        onMouseLeave={() => setShowChildren(null)}
                    >
                        {showChildren === category && (
                            <div className="absolute inset-1 flex items-center justify-center bg-gray-200 rounded-lg">
                                <div className="text-black">
                                    <a href={category.show_url} className="font-bold mb-1 hover:text-orange-700">{category.name}</a>
                                    {category.children && category.children.length > 0 && (
                                    <ul>
                                        {category.children.map((child) => (
                                        <li key={child.id}>
                                            <a href={child.show_url} className="hover:text-orange-700">{child.name}</a>
                                        </li>
                                        ))}
                                    </ul>
                                    )}
                                </div>
                            </div>
                        )}
                        <div className="border border-slate-300 hover:border-indigo-300 flex items-center justify-center aspect-h-1 aspect-w-1 w-full rounded-lg bg-white lg:aspect-none lg:h-60">
                            {category.images && category.images.length > 0 && (
                                <img
                                    src={`/category_images/${category.images[0].image_path}`}
                                    alt={category.imageAlt}
                                    
                                />
                            )}
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        {category.name}
                                    </h3>
                                </div>
                            </div>
                        </div>

                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
}