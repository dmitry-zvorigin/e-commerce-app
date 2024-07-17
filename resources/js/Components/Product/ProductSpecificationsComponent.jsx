import ProductCharacteristics from "@/Components/Product/ProductCharacteristics";
import ProductDescription from "@/Components/Product/ProductDescription";

const ProductSpecificationsComponent = ({ product, characteristics }) => {
    
    return (
        <>
            <ProductCharacteristics productName={product.name} characteristics={characteristics} />
            <ProductDescription description={product.description} />
        </>

    );
};

export default ProductSpecificationsComponent;