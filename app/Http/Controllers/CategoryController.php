<?php

namespace App\Http\Controllers;

use App\Breadcrumbs\BreadcrumbsManager;
use App\Http\Requests\FilterProductRequest;
use App\Models\Category;
use App\Models\CategoryAttributeRelationship;
use App\Models\Product;
use Diglactic\Breadcrumbs\Breadcrumbs;
use Inertia\Inertia;
use App\Services\ProductFilterService as Filter;
use App\Services\ProductSortingService as Sorting;

class CategoryController extends Controller
{
    public function __construct()
    {
        BreadcrumbsManager::registerCatalog();
        BreadcrumbsManager::registerCatagories();
    }

    public function catalog() 
    {
        $categories = Category::whereNull('parent_id')->with('children', 'images')->get();
        
        $breadcrumbs = Breadcrumbs::generate('catalog');

        return Inertia::render('Catalog', [
            'categories' => $categories, 
            'breadcrumbs' => $breadcrumbs, 
        ]);
    }

    public function categories($categorySlug, FilterProductRequest $request)
    {
        $category = Category::where('slug', $categorySlug)->first();

        $result = Category::ancestorsAndSelf($category->id);
        $breadcrumbs = Breadcrumbs::generate('categories', $result);

        if ($category->is_final) {
            return $this->renderProductsView($category, $request, $breadcrumbs);
        } else {
            return $this->renderCategoryView($category, $breadcrumbs);
        }
    }

    protected function renderCategoryView(Category $category, $breadcrumbs)
    {
        $categories = $category->load('children.images');

        return Inertia::render('Categories', [
            'categories' => $categories, 
            'breadcrumbs' => $breadcrumbs, 
        ]);
    }

    protected function renderProductsView(Category $category, FilterProductRequest $request, $breadcrumbs)
    {
        // dd($request->all());
        // $filters = CategoryAttributeRelationship::withRequiredFilters($category->id)->get()->pluck('attribute.slug')->toArray();
        // $filtersValue = $request->only($filters);
        // dd($filtersValue);
    
        $filtersQuery = $request->filterQuery();

        $query = Product::query()->where('category_id', $category->id);

        $productFilterService = new Filter($query);
        $filteredQuery = $productFilterService->applyFilters($filtersQuery);

        $productSortingService = new Sorting($filteredQuery);
        $sortingQuery = $productSortingService->applySorting($filtersQuery['order']);

        
        $products = $sortingQuery
            ->with(['images'])
            ->withCount('ratings')
            ->withAvg('ratings', 'rating_value')
            ->paginate(18);

        // $products = $this->productService
        //     ->whereCategory([$category->id])
        //     ->filter($filtersQuery['checkbox'])
        //     ->sort($filtersQuery['order'])
        //     ->getProductQuery()
        //     ->with(['images'])
        //     ->withCount('ratings')
        //     ->withAvg('ratings', 'rating_value')
        //     ->paginate(18);
        
        // Фильтруем, сортируем продукты, так же получаем отношения.
        // $products = $this->productService
        //     ->createProductQuery(['category_ids' => [$category->id]])
        //     ->filter($filtersQuery)
        //     ->sort($filtersQuery)
        //     ->getProductQuery()
        //     ->with(['images'])
        //     ->withCount('ratings')
        //     ->withAvg('ratings', 'rating_value')
        //     ->paginate(18);

        // Получаем фильтры которые относятся к определенной категориям. 
        $filters = CategoryAttributeRelationship::withRequiredFilters($category->id)->get();

        foreach ($filters as $filter) {
            if ($filter->type === 'price') {
                // Для типа price получаем минимальную и максимальную цену у продуктов
                $filter->findMinMaxPrice($filter->category_id);
            } elseif ($filter->type === 'range') {
                // Для типа range получаем минимальное и максимальное значение
                $filter->findMinMaxValues($filter->category_id);
            }
        }
        
        return Inertia::render('Products', [
            'category' => $category, 
            'products' => $products, 
            'breadcrumbs' => $breadcrumbs,
            'filters' => $filters,
            'filters_query' => $request->all(),
        ]);
    }

}
