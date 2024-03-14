import { HeartIcon, ShoppingBagIcon, StarIcon } from "@heroicons/react/24/outline";
import { InertiaLink } from "@inertiajs/inertia-react";


  export default function ProductList({ products }) {

    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl lg:max-w-7xl mt-5 mb-5">
          {/* <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2> */}
  
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products.map((product) => (
              <div 
                key={product.id}
                className="border border-slate-300 rounded-lg bg-white hover:drop-shadow-2xl p-3 group"
              >
                <InertiaLink
                  href="#"
                >
                  <div className="h-52 bg-slate-800"/>
                  <div className="flex justify-center mt-2">
                    <h2 className="font-medium text-gray-900">{product.name}</h2>
                  </div>
                </InertiaLink>
                  <div className="flex justify-between mt-3 mb-3">
                    <div className="rounded-md border border-slate-300 p-1 flex justify-center items-center">
                      <input className="mr-2" type="checkbox"/><p>Сравнить</p>
                    </div>
                    <div className="rounded-md border border-slate-300 flex justify-center items-center">
                      <StarIcon className="w-4"/>
                      <StarIcon className="w-4"/>
                      <StarIcon className="w-4"/>
                      <StarIcon className="w-4"/>
                      <StarIcon className="w-4"/> 
                      <p className="ml-1">433</p>
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
              // <div key={product.id} className="group relative">
              //   <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              //     <img
              //       // src={product.imageSrc}
              //       // alt={product.imageAlt}
              //       className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              //     />
              //   </div>
              //   <div className="mt-4 flex justify-between">
              //     <div>
              //       <h3 className="text-sm text-gray-700">
              //         <InertiaLink
              //           href="#"
              //         >
              //           <span aria-hidden="true" className="absolute inset-0" />
              //           {product.name}
              //         </InertiaLink>
              //         {/* <a href={product.href}>
              //           <span aria-hidden="true" className="absolute inset-0" />
                        
              //         </a> */}
              //       </h3>
              //       {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
              //     </div>
              //     <p className="text-sm font-medium text-gray-900">{product.price}</p>
              //   </div>
              // </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  