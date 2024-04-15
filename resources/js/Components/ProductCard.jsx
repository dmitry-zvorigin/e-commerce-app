import { HeartIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import ProductRating from "./ProductRating";

export default function ProductCard({ product, groupedCharacteristics }) {

    // console.log(groupedCharacteristics);

    // groupedCharacteristics.map((index, group) => {
    //     console.log(group);
    // });

    console.log(product);
    return (
        <div>

            <div className="border border-slate-300 rounded-lg mt-5">

                <div className="h-96 flex ml-2 mt-2 mr-2">
                    <div className="w-2/3 mr-8">
                        {/* <div className="bg-slate-800 h-full w-full"/> */}
						<div className="h-full flex justify-center">
							{product.images && product.images.length > 0 ? (
								<img
									src={`/products_images/image_detail/${product.images[0].image_url_detail}`}
									alt={product.name}
									className="object-contain"
								/>
							) : (
								<div className="bg-slate-800 h-full w-full"/>
							)}
						</div>
                    </div>
                    <div className="w-full p-5">

                        <h2>AM3+, 4 x 3.8 ГГц, L2 - 4 МБ, L3 - 4 МБ, 2 х DDR3-1866 МГц, TDP 95 Вт, кулер подробнее</h2>

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

                            <div className="ml-2 p-1 rounded-md flex bg-gray-100 text-sm text-gray-600 items-center">
                                <button className="flex ">
                                    <ProductRating value={product.ratings_avg_rating_value}/>
                                    <p className="ml-1 mr-1">{product.ratings_count}</p>
                                </button>
                            </div>

                        </div>

                        <div className="flex h-16 justify-between">
                            <div className="rounded-lg flex bg-gray-100 text-4xl mr-5 text-center items-center w-96 p-2">
                                {product.price} ₽
                            </div>
                            <div className="rounded-lg flex bg-gray-100 text-sm text-gray-600 mr-5">
                                <button 
                                    className="
                                        rounded-lg border-slate-300 flex justify-center 
                                        items-center p-3 hover:border-orange-400 w-16
                                        hover:bg-gray-200
                                        "
                                >
                                    <HeartIcon className="h-7 w-7"/>
                                </button>
                            </div>
                            <div className="rounded-lg flex bg-gray-100 text-sm ">
                                <button 
                                    className="rounded-lg border border-slate-300 flex justify-center items-center 
                                    p-3 bg-orange-400 hover:bg-orange-300 w-44 text-2xl text-white"
                                >
                                    Купить
                                </button>
                            </div>
                        </div>


                    </div>
                </div>

                <div className="h-44 border m-2">
                    <div className="bg-slate-800 h-full w-full"/>
                </div>
            </div>

            <div className="flex mt-5">
                <div className="w-2/5 mr-8">
                    <div className="border border-slate-300 rounded-lg p-2">
                        <h2>Характеристики</h2>
                        <h2>Отзывы {product.ratings_count}</h2>
                    </div>
                </div>
                
                <div className="w-full">

                    <div className="border border-slate-300 rounded-lg w-full p-2">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-5">Характеристики {product.name}</h2>

                        <div>
                            {Object.keys(groupedCharacteristics).map(groupName => (
                                <div className="product-characteristics__group mb-5" key={groupName}>
                                    <h2 className="text-1xl font-bold tracking-tight text-gray-900">{groupName}</h2>
                                    {groupedCharacteristics[groupName].map((char, index) => (
                                        <div className="product-characteristics__spec flex mt-2" key={index}>
                                            <div className="product-characteristics__spec-title border-b w-96">
                                                {char.attribute.name}
                                            </div>
                                            <div className="product-characteristics__spec-value">
                                                {/* TODO */}
                                                {/* Не все значения присутствуют */}
                                                {char.value.value_int} {char.value.value_string} {char.value.unit_type}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        
                    </div>
                
					<div className="border border-slate-300 rounded-lg w-full p-2 mt-5">
						<h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-5">Описание</h2>
						<p>{product.description}</p>
					</div>

					<div className="border border-slate-300 rounded-lg w-full p-2 mt-5">
						<h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-5">Самый популярный отзыв</h2>
					</div>						
												
                </div>

            </div>

        </div>

        

    );
}