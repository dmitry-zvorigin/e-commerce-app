import ProductCharacteristics from "@/Components/Product/ProductCharacteristics";
import ProductDescription from "@/Components/Product/ProductDescription";
import { usePage } from "@inertiajs/react";

export default function ProductSpecificationsComponent() {

    const { product, groupedCharacteristics } = usePage().props;

    return (
        <>
            <ProductCharacteristics productName={product.name} characteristics={groupedCharacteristics} />
            <ProductDescription description={product.description} />
        </>
    );
}