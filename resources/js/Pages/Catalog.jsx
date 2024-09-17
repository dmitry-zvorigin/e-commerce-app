import Breadcrumbs from "@/Components/Breadcrumbs";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { Link, usePage } from '@inertiajs/react'
import { useState } from "react";

const Catalog = ({ }) => {

    const { categories, breadcrumbs } = usePage().props;
    const [showChildren, setShowChildren] = useState(null);

    return (
        <DefaultLayout>
            <div className="bg-white">
                <div className="max-w-full my-8">
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900">Каталог товаров</h2>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {categories.map((category) => (
                            <div 
                                key={category.id} 
                                className="relative hover:drop-shadow-2xl"
                                onMouseEnter={() => setShowChildren(category)}
                                onMouseLeave={() => setShowChildren(null)}
                            >

                                <div 
                                    className={`absolute border border-slate-300 top-0 left-0 inset-1 flex justify-start p-5 bg-white rounded-lg transition-all duration-500 transform w-full h-full 
                                        ${showChildren === category ? 'opacity-100 translate-y-0' : 'opacity-0  pointer-events-none'}`}
                                >
                                    <div className="text-black">
                                        <Link 
                                            className="font-bold mb-1 hover:text-orange-500" 
                                            href={route('categories', { categorySlug: category.slug })}
                                        >
                                            {category.name}
                                        </Link>
                                        {category.children && category.children.length > 0 && (
                                            <ul>
                                                {category.children.map((child) => (
                                                    <li key={child.id}>
                                                        <Link 
                                                            className="hover:text-orange-500"
                                                            href={route('categories', { categorySlug: child.slug })}
                                                        >
                                                            {child.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>

                                <div className="border border-slate-300 grid items-center justify-center aspect-h-1 aspect-w-1 w-full rounded-lg bg-white lg:aspect-none lg:h-60">
                                    {category.images && category.images.length > 0 && (
                                        <div className="flex justify-center items-center">
                                            <img
                                                src={`/category_images/${category.images[0].image_path}`}
                                                alt={category.imageAlt}
                                                className="object-scale-down"
                                            />
                                        </div>

                                    )}
                                    <div className="flex justify-center items-center text-center">
                                        <h3 className="text-sm text-gray-700 font-bold">
                                            {category.name}
                                        </h3>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default Catalog;