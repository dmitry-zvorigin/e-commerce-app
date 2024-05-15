import Breadcrumbs from "@/Components/Breadcrumbs";
import Filters from "@/Components/Filters";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { declineProductCount } from "@/helpers";

export default function Products({ categories_menu, breadcrumbs, category, products, filters, filters_query }) {

    return (
        <>
            <DefaultLayout categories_menu={categories_menu}>
            <div className="bg-white">
                <div className="max-w-full py-16">
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                        {category.name} {declineProductCount(products.total)}
                    </h2>
                    <Filters products={products} filters={filters} category={category} filters_query={filters_query} />
                </div>
            </div>
            </DefaultLayout>
            
        </>
    );

}