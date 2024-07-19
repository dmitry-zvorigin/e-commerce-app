import Breadcrumbs from "@/Components/Breadcrumbs";
import ProductControls from "@/Components/Catalog/ProductControls";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { declineProductCount } from "@/helpers";
import { usePage } from "@inertiajs/react";

export default function Products() {

    const { breadcrumbs, category, products } = usePage().props;

    return (
        <>
            <DefaultLayout>
                <div className="bg-white">
                    <div className="max-w-full my-8">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                        <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                            {category.name} {declineProductCount(products.total)}
                        </h2>
                        <ProductControls />
                    </div>
                </div>
            </DefaultLayout>
        </>
    );

}