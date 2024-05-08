import Breadcrumbs from "@/Components/Breadcrumbs";
import ProductCard from "@/Components/ProductCard";
import DefaultLayout from "@/Layouts/DefaultLayout";

export default function Product({ categories_menu, breadcrumbs, product, groupedCharacteristics, popularReview }) {

    return (
        <>
            <DefaultLayout categories_menu={categories_menu}>
            <div className="bg-white">
                <div className="max-w-full py-16 sm:py-24 lg:max-w-7xl">
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                        {product.name}
                    </h2>
                    <ProductCard product={product} groupedCharacteristics={groupedCharacteristics} popularReview={popularReview}/>
                </div>
            </div>
            </DefaultLayout>
        </>
    );

}