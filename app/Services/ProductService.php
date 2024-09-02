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
        $this->productsQuery = Product::query();
    }


    // public function createProductQuery(array $params = [])
    // {
    //     $this->productsQuery = Product::query();

    //     // Фильтрация по категориям
    //     if (!empty($params['category_ids']) && is_array($params['category_ids'])) {
    //         $this->productsQuery->whereIn('category_id', $params['category_ids']);
    //     }

    //     // dd($params);
    //     // Фильтрация по продуктам
    //     if (!empty($params['product_ids']) && is_array($params['product_ids'])) {
    //         $this->productsQuery->whereIn('id', $params['product_ids']);
    //     }

    //     return $this;

    //     // $this->productsQuery = Product::where('category_id', $category->id);

    // }

    public function whereCategory(array $params)
    {
        $this->productsQuery->whereIn('category_id', $params);
        return $this;
    }

    public function whereProduct(array $params)
    {
        $this->productsQuery->whereIn('id', $params);
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