import Breadcrumbs from "@/Components/Breadcrumbs";
import { useState } from "react";

export default function Categories({ categories }) {

    console.log(categories);

    return (
        <>
         <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <Breadcrumbs/>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">{categories.name}</h2>
        
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {categories.children.map((category) => (
                        
                    <a href={category.show_url} key={category.id}>
                        <div className="group">
                            <div className="border border-slate-300 hover:border-indigo-300 flex items-center justify-center aspect-h-1 aspect-w-1 w-full rounded-lg bg-white lg:aspect-none lg:h-60 group-hover:opacity-75">
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
                    </a>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
}