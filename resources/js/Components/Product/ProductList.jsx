import { Link } from '@inertiajs/react'
import ButtonCheckbox from "@/MyComponents/ButtonCheckbox";
import ButtonAddWishlist from "@/MyComponents/ButtonAddWishlist";
import ButtonAddShoplist from "@/MyComponents/ButtonAddShoplist";
import ButtonAddCompare from '@/MyComponents/ButtonAddCompare';
import ProductRatingReviews from '@/MyComponents/ProductRatingReviews';
import { memo } from 'react';
import { useCallback } from 'react';


const ProductList = memo(({ product, mode, checkbox = false, isSelected = false, onProductSelected }) => {

    const onProductSelectedCallback = useCallback(() => {
        onProductSelected();
    }, [onProductSelected]);

    if (mode === 'grid') {
        return (
            <div className="grid grid-rows-4-[4fr_1fr_1fr_1fr] border border-slate-300 rounded-lg p-5 bg-white gap-5 hover:drop-shadow-2xl group">
                <Link
                    href={route('product.show', { productSlug: product.slug })}
                >
                    <div>
                        <ProductImage name={product.name} images={product.images}/>
                    </div>
                </Link>

                <Link
                    href={route('product.show', { productSlug: product.slug })}
                >
                    <div>
                        <ProductName name={product.name} />
                    </div>
                </Link>

                <div className="flex gap-2 h-[35px]">
                    <ProductCompare/>
                    <ProductRating slug={product.slug} rating_avg={product.ratings_avg_rating_value} rating_count={product.ratings_count} />
                </div>

                <div className="flex justify-between">
                    <div className="flex justify-center items-center">
                        <ProductPrice price={product.price}/>
                    </div>
                    <div className="flex gap-2">
                        <ButtonAddWishlist productId={product.id} />
                        <ButtonAddShoplist productId={product.id} type={'icon'}/>
                    </div>
                </div>

            </div>
        );
    } else if(mode === 'list') {
        return (
            <div className="grid grid-cols-[1fr_2fr_1fr] border border-slate-300 rounded-lg gap-5 p-5 bg-white hover:drop-shadow-2xl group relative">

                {checkbox && (
                    <div className="absolute px-2">
                        <ButtonCheckbox checked={isSelected} onChange={onProductSelectedCallback}/>
                    </div>
                )}

                <Link
                    href={route('product.show', { productSlug: product.slug })}
                >
                    <div>
                        <ProductImage name={product.name} images={product.images}/>
                    </div>
                </Link>

                <div className="grid grid-rows-[4fr_1fr] gap-5">

                    <Link
                        href={route('product.show', { productSlug: product.slug })}
                    >
                        <div>
                            <ProductName name={product.name} />
                        </div>
                    </Link>

                    <div className="flex gap-2">
                        <ProductCompare/>
                        <ProductRating slug={product.slug} rating_avg={product.ratings_avg_rating_value} rating_count={product.ratings_count} />
                    </div>
                </div>
                
                <div>
                    <div className="flex justify-end mb-2">
                        <ProductPrice price={product.price}/>
                    </div>
                    <div className="flex justify-end gap-2 h-[46px]">
                        <ButtonAddWishlist productId={product.id} />
                        <ButtonAddShoplist productId={product.id} />
                    </div>
                </div>
            </div>
        );
    }
});

export default ProductList;

const ProductImage = ({ name, images }) => {

    return (
        <div className="h-52 flex justify-center">
            {images && images.length > 0 ? (
                <img
                    loading="lazy"
                    src={`/products_images/image_thumbnail/${images[0].image_url_thumbnail}`}
                    alt={name}
                    className="object-contain"
                />
            ) : (
                <div className="bg-slate-800 h-52 w-full"/>
            )}
        </div>
    );
}

const ProductName = ({ name }) => {

    return (
        <div className="flex mt-2 relative h-[45px]">
            <h2 
                className="font-medium text-gray-900 line-clamp-2 hover:line-clamp-none hover:absolute group-hover:text-orange-500"
            >
                {name}
            </h2>
        </div>
    );
}

const ProductPrice = ({ price }) => {

    return (
        <div>
            <h2 className="text-xl font-bold">{price} P</h2>
        </div>
    );
}

const ProductRating = ({ slug, rating_avg, rating_count }) => {

    return (
        <div>
            <ProductRatingReviews productSlug={slug} productRating={rating_avg} ReviewsCount={rating_count}/>
        </div>
        
    );
}

const ProductCompare = () => {

    return (
        <div>
            <ButtonAddCompare/>
        </div>
    );
}