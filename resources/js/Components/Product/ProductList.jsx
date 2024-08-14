import { ArrowPathIcon, HeartIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Link } from '@inertiajs/react'
import Rating from "@/MyComponents/Rating";
import { router, usePage } from '@inertiajs/react'
import { useEffect } from "react";
import { useState } from "react";
import ButtonCheckbox from "@/MyComponents/ButtonCheckbox";


export default function ProductList({ product, mode, checkbox = false, isSelected = false, onProductSelected }) {

    const { auth } = usePage().props;

	const [wishlist, setWishlist] = useState(auth.wishlist || []);
	const [loadingProductId, setLoadingProductId] = useState(null);


	useEffect(() => {
		setWishlist(auth.wishlist || []);
	}, [auth.wishlist]);

	const handleAddToWishlist = (productId) => {
		if (auth.user) {
			setLoadingProductId(productId);
			router.post(route('wishlist.add'), { product_id: productId }, {
				preserveScroll: true,
				preserveState: true,
				onSuccess: (page) => {
					setWishlist(page.props.auth.wishlist);
					setLoadingProductId(null);
				},
				onError: () => {
                    setLoadingProductId(null);
                }
			})
		} else {
			let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
			if (!wishlist.includes(productId)) {
				wishlist.push(productId);
				localStorage.setItem('wishlist', JSON.stringify(wishlist));
			}
		}
	};

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

                <div className="flex gap-2">
                    <ProductCompare/>
                    <ProductRating slug={product.slug} rating_avg={product.ratings_avg_rating_value} rating_count={product.ratings_count} />
                </div>

                <div className="flex justify-between">
                    <div className="flex justify-center items-center">
                        <ProductPrice price={product.price}/>
                    </div>
                    <div className="flex gap-2">
                        <ButtonAddWishlist wishlist={wishlist} handleAddToWishlist={handleAddToWishlist} product_id={product.id} loading={loadingProductId}/>
                        <ButtonAddShoplist type={'icon'}/>
                    </div>
                </div>

            </div>
        );
    } else if(mode === 'list') {
        return (
            <div className="grid grid-cols-[1fr_2fr_1fr] border border-slate-300 rounded-lg gap-5 p-5 bg-white hover:drop-shadow-2xl group relative">

                {checkbox && (
                    <div className="absolute">
                        <ButtonCheckbox checked={isSelected} onChange={onProductSelected}/>
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
                    <div className="flex justify-end gap-2">
                        <ButtonAddWishlist wishlist={wishlist} handleAddToWishlist={handleAddToWishlist} product_id={product.id} loading={loadingProductId}/>
                        <ButtonAddShoplist />
                    </div>
                </div>
            </div>
        );
    }
}

const ProductImage = ({ name, images }) => {

    return (
        <div className="h-52 flex justify-center">
            {images && images.length > 0 ? (
                <img
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
                className="font-medium text-gray-900 line-clamp-2 hover:line-clamp-none hover:absolute group-hover:text-orange-700"
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
        // <div className="ml-2 p-1 rounded-md flex bg-gray-100  items-center hover:bg-gray-200 cursor-pointer">
        //     <Link className="flex" href={route('product.reviews', { productSlug: slug })}>
        //         <Rating value={rating_avg} precision={0.1} size="small"/>
        //         <p className="ml-1 mr-1 text-gray-600 text-sm">{rating_count}</p>
        //     </Link>
        // </div>
            <Link className="flex hover:bg-orange-100 justify-center items-center cursor-pointer rounded-lg p-1 bg-gray-100" 
                href={route('product.reviews', { productSlug: slug })}
            >
                <Rating value={rating_avg} precision={0.1} size="small"/>
                <p className="ml-1 mr-1 text-gray-600 text-sm">{rating_count}</p>
            </Link>
    );
}

const ProductCompare = () => {

    return (
        // <div className="rounded-md p-1 flex justify-center items-center bg-gray-100 hover:bg-orange-100">
            <label 
                className='flex items-center p-2 rounded-lg cursor-pointer hover:bg-orange-100 bg-gray-100'
            >
                <input 
                    type="checkbox" 
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                <span className="ml-2 text-sm text-gray-600 " >
                    Сравнить
                </span>
                
            </label>
        // {/* </div> */}
    );
}

const ButtonAddWishlist = ({ wishlist, handleAddToWishlist, product_id, loading }) => {

    return (
        <button 
            className=
                {`rounded-md border flex justify-center items-center p-3 
                    ${wishlist.includes(product_id) ? 'bg-red-500 text-white' : 'border-slate-300 hover:border-orange-400'}`
                }
            onClick={() => handleAddToWishlist(product_id)}
            disabled={loading === product_id}
        >
            {loading !== product_id ? (
                <HeartIcon className="h-5 w-5"/>
            ) : (
                
                <div role="status" className="animate-spin text-gray-800">
                    <ArrowPathIcon className="w-5 h-5"/>
                    <span className="sr-only">Loading...</span>
                </div>
            )}
            
        </button>
    );
}

const ButtonAddShoplist = ({ type }) => {
    return (
        <>
            {type === 'icon' ? (
                <button 
                    className="rounded-md border border-slate-300 flex justify-center items-center p-3 group-hover:bg-orange-400 group-hover:text-white"
                >
                    <ShoppingBagIcon className="h-5 w-5" />
                </button>
            ) : (
                <button className="border border-slate-300 rounded-lg group group-hover:bg-orange-500 h-[46px] w-[150px] group-hover:text-white ">
                    Купить
                </button>
            )}
        </>
    );
}

