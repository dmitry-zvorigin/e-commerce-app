import Banners from "@/Components/Banners";
import Breadcrumbs from "@/Components/Breadcrumbs";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { Link } from '@inertiajs/react'

export default function Categories({ categories, breadcrumbs }) {


    return (
        <DefaultLayout>
         <div className="bg-white">
            <div className="max-w-full my-8">
                <Breadcrumbs breadcrumbs={breadcrumbs} />
                <h2 className="text-4xl font-bold tracking-tight text-gray-900">{categories.name}</h2>
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {categories.children.map((category) => (
                        <div 
                            className="border border-slate-300 rounded-lg bg-white hover:drop-shadow-2xl"
                            key={category.id}
                        >
                            <Link
                                className="font-bold mb-1" 
                                href={route('categories', { categorySlug: category.slug })}
                            >
                                <div>
                                    <div className="grid items-center justify-center aspect-h-1 aspect-w-1 w-full lg:aspect-none lg:h-60">
                                        {category.images && category.images.length > 0 && (
                                            <div className="flex justify-center items-center">
                                                <img
                                                    className="object-scale-down"
                                                    src={`/category_images/${category.images[0].image_path}`}
                                                    alt={category.name}
                                                />
                                            </div>
                                        )}
                                        <div className="flex justify-center items-center text-center">
                                            <h3 className="text-sm text-gray-700">
                                                {category.name}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </DefaultLayout>
    );
}