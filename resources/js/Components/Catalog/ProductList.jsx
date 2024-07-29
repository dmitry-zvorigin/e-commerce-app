import { HeartIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Link } from '@inertiajs/react'
import { usePage } from "@inertiajs/react";
import Rating from "@/MyComponents/Rating";

export default function ProductList({ products }) {

	// console.log(products);
    // const { products } = usePage().props;

    return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl lg:max-w-7xl mt-5 mb-5">

				<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
					{products.map((product) => (
						<div 
							key={product.id}
							className="border border-slate-300 rounded-lg bg-white hover:drop-shadow-2xl p-3 group flex flex-col justify-between "
						>
							<div>
							<Link
                                className="font-bold mb-1" 
                                href={route('product.show', { productSlug: product.slug })}
                            >
									<div className="h-52 flex justify-center">
										{product.images && product.images.length > 0 ? (
											<img
												src={`/products_images/image_thumbnail/${product.images[0].image_url_thumbnail}`}
												alt={product.name}
												className="object-contain"
											/>
										) : (
											<div className="bg-slate-800 h-52 w-full"/>
										)}
									</div>

									<div className="flex mt-2 relative text-" style={{ height: '45px' }}>
										<h2 
											className="font-medium text-gray-900 line-clamp-2 hover:line-clamp-none hover:absolute hover:text-orange-700"
										>
											{product.name}
										</h2>
									</div>
								</Link>
							</div>

							<div>
							
								<div className="flex mt-3 mb-3">

									<div className="rounded-md p-1 flex justify-center items-center bg-gray-100">
										<label 
											className='flex items-center p-1 w-full hover:bg-orange-100 rounded-md cursor-pointer'
										>
											<input 
												type="checkbox" 
												className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
											/>
											<span className="ml-2 text-sm text-gray-600 " >
												Сравнить
											</span>
											
										</label>
										
									</div>

									<div className="ml-2 p-1 rounded-md flex bg-gray-100  items-center hover:bg-gray-200 cursor-pointer">
										<Link className="flex" href={route('product.reviews', { productSlug: product.slug })}>
											<Rating value={product.ratings_avg_rating_value} precision={0.1} size="small"/>
											<p className="ml-1 mr-1 text-gray-600 text-sm">{product.ratings_count}</p>
										</Link>
									</div>
									
								</div>
								<div className="flex justify-between items-center">
									<div>
										<h2 className="text-1xl font-bold">{product.price} P</h2>
									</div>
									<div className="flex items-center">
										<button 
											className="rounded-md border border-slate-300 flex justify-center items-center p-3 mr-2 hover:border-orange-400"
										>
											<HeartIcon className="h-5 w-5"/>
										</button>
										<button 
											className="rounded-md border border-slate-300 flex justify-center items-center p-3 group-hover:bg-orange-400 group-hover:text-white"
										>
											<ShoppingBagIcon className="h-5 w-5"/>
										</button>
									</div>
								</div>
							</div>

						</div>
					))}
				</div>
			</div>
      	</div>
    )
}
