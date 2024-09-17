// import ProductList from "../Product/ProductList";
import ProductList from "../Product/ProductList";
import ProductPlaceholderCard from "../Product/ProductPlaceholderCard";

export default function ProductsView({ products, loading, initialMode }) {

	const renderProducts = {
		grid: (
			<div className="gap-5 grid grid-cols-3">
				{loading ? (
					<ProductPlaceholderCard mode="grid" count={6} />
				) : (
					<>
						{products.map((product) => (
							<ProductList key={product.id} product={product} mode={'grid'}/>
						))}
					</>
				)}
			</div>
		), 
		list: (
			<div className="gap-5 grid grid-cols-1">
				{loading ? (
					<ProductPlaceholderCard mode='list' count={6}/>
				) : (
					<>
						{products.map((product, index) => (
							<ProductList key={product.id} product={product} mode={'list'}/>
						))}
					</>
				)}

			</div>
		)
	};


    return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl lg:max-w-7xl mt-5 mb-5">

				{renderProducts[initialMode] || renderProducts['list']}
			</div>
      	</div>
    )
}