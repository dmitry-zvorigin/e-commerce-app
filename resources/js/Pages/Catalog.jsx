import Breadcrumbs from "@/Components/Breadcrumbs";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { InertiaLink } from "@inertiajs/inertia-react";
import { useState } from "react";

const Catalog = ({ categories, breadcrumbs, categories_menu }) => {

    const [showChildren, setShowChildren] = useState(null);

    return (
        <DefaultLayout categories_menu={categories_menu}>
        <div className="bg-white">
            <div className="max-w-full py-16">
                <Breadcrumbs breadcrumbs={breadcrumbs} />
                <h2 className="text-4xl font-bold tracking-tight text-gray-900">Каталог товаров</h2>
        
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {categories.map((category) => (
                    <div 
                        key={category.id} 
                        className="relative"
                        onMouseEnter={() => setShowChildren(category)}
                        onMouseLeave={() => setShowChildren(null)}
                    >
                        {showChildren === category && (
                            <div className="absolute inset-1 flex  justify-start p-5 bg-white rounded-lg">
                                <div className="text-black">
                                    <InertiaLink 
                                        className="font-bold mb-1 hover:text-orange-700" 
                                        href={route('categories', { categorySlug: category.slug })}>{category.name}
                                    </InertiaLink>
                                    {category.children && category.children.length > 0 && (
                                    <ul>
                                        {category.children.map((child) => (
                                        <li key={child.id}>
                                            <InertiaLink 
                                                className="hover:text-orange-700"
                                                href={route('categories', { categorySlug: child.slug })}
                                            >
                                                {child.name}
                                            </InertiaLink>
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
        </DefaultLayout>
    );
}

export default Catalog;