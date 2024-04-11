<?php 

namespace App\Services;

use App\Models\Category;
use App\Models\Product;
use App\Services\Filters\ProductFilterService;
use App\Services\Sorting\ProductSorterService;

class ProductService
{
    protected $productFilterService;
    protected $productSorterService;
    protected $productsQuery;

    public function __construct(
        ProductFilterService $productFilterService,
        ProductSorterService $productSorterService,
    ) {
        $this->productFilterService = $productFilterService;
        $this->productSorterService = $productSorterService;
    }


    public function createProductQuery(Category $category)
    {
        $this->productsQuery = Product::where('category_id', $category->id);

        return $this;
    }

    public function filter(array $filtersQuery) 
    {
        $this->productsQuery = $this->productFilterService->filterProducts($this->productsQuery, $filtersQuery);

        return $this;
    }

    public function sort(array $filtersQuery)
    {
        $this->productsQuery = $this->productSorterService->sortingProducts($this->productsQuery, $filtersQuery);

        return $this;
    }

    public function getProductQuery()
    {
        return $this->productsQuery;
    }
}