import { ArrowPathIcon, HeartIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Link } from '@inertiajs/react'
import Rating from "@/MyComponents/Rating";
// import { Inertia } from "@inertiajs/inertia";
import { router, usePage } from '@inertiajs/react'
import { useEffect } from "react";
import { useState } from "react";
import ProductListTest from "../Product/ProductList";
import ProductList from "../Product/ProductList";
import { useLocation } from "react-router-dom";
import { Inertia } from "@inertiajs/inertia";

export default function ProductsView({ products, loading, initialMode }) {

	// const { filters_query } = usePage().props;

	// const mode = filters_query.mode || 'list';

	const mode = initialMode;

	if (loading) {
		return (
			<div className="bg-white">
				<div className="mx-auto max-w-2xl lg:max-w-7xl mt-5 mb-5">
					<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
						{Array.from({ length: 18 }).map((_, index) => (
							<PlaceholderCard key={index} />
						))}
					</div>
				</div>
			</div>
		);
	}

	const renderProducts = {
		grid: (
			<div className="gap-5 grid grid-cols-3">
				{products.map((product) => (
					<ProductList key={product.id} product={product} mode={'grid'}/>
				))}
			</div>
		), 
		list: (
			<div className="gap-5 grid grid-cols-1">
				{products.map((product, index) => (
					<ProductList key={product.id} product={product} mode={'list'}/>
				))}
			</div>
		)
	};


    return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl lg:max-w-7xl mt-5 mb-5">

				{renderProducts[mode] || renderProducts['list']}
			</div>
      	</div>
    )
}

const PlaceholderCard = () => {

	return (
		<div 
			className="border border-slate-300 rounded-lg bg-white hover:drop-shadow-2xl p-3 group flex flex-col justify-between animate-pulse"
		>
			<div>
				<div
					className="font-bold mb-1" 
				>
					<div className="h-52 flex justify-center">
						<div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700 w-full">
							<svg 
								className="h-10 text-gray-200 dark:text-gray-600" 
								aria-hidden="true" 
								xmlns="http://www.w3.org/2000/svg" 
								fill="currentColor" 
								viewBox="0 0 16 20"
							>
								<path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 
									1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 
									1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 
									1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
								<path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
							</svg>
						</div>
					</div>

					<div className="flex mt-2 relative text-" style={{ height: '45px' }}>
						<div className="h-full bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-full"></div>
					</div>
				</div>
			</div>

			<div>
			
				<div className="flex mt-3 mb-3">

					<div className="rounded-md p-1 flex justify-center items-center bg-gray-100 w-full">
						<div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-full"></div>
					</div>

					<div className="ml-2 p-1 rounded-md flex bg-gray-100  items-center hover:bg-gray-200 cursor-pointer w-full">
						<div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-full"></div>
					</div>
					
				</div>
				<div className="flex justify-between items-center w-full">
					<div className="w-full">
						<div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-full"></div>
					</div>
					<div className="flex items-center justify-center w-full gap-5">
						<div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-[50px]"></div>
						<div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-[50px]"></div>
					</div>
				</div>
			</div>

		</div>
	);
};
