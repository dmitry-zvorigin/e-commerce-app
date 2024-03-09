import Banners from "@/Components/Banners";
import Breadcrumbs from "@/Components/Breadcrumbs";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { InertiaLink } from "@inertiajs/inertia-react";
import { useState } from "react";

export default function Categories({ categories, breadcrumbs, categories_menu }) {


    return (
        <DefaultLayout categories_menu={categories_menu}>
         <div className="bg-white">
            <div className="max-w-full py-16 sm:py-24 lg:max-w-7xl">
                <Breadcrumbs breadcrumbs={breadcrumbs} />
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">{categories.name}</h2>
        
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {categories.children.map((category) => (
                        
                        <div 
                            className="border border-slate-300 rounded-lg bg-white hover:drop-shadow-2xl"
                            key={category.id}
                        >
                            <InertiaLink
                                className="font-bold mb-1" 
                                href={route('categories', { categorySlug: category.slug })}
                            >
                                <div>
                                    <div className=" flex items-center justify-center aspect-h-1 aspect-w-1 w-full  lg:aspect-none lg:h-60">
                                        {category.images && category.images.length > 0 && (
                                            <img
                                                src={`/category_images/${category.images[0].image_path}`}
                                                alt={category.name}
                                                width={120}
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
                            </InertiaLink>
                        </div>

                    ))}
                </div>
            </div>
        </div>
        </DefaultLayout>
    );
}