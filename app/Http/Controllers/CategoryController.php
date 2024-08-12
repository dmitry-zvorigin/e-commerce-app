<?php

namespace App\Http\Controllers;

use App\Breadcrumbs\BreadcrumbsManager;
use App\Http\Requests\FilterProductRequest;
use App\Models\Category;
use App\Models\CategoryAttributeRelationship;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Services\Filters\ProductFilterService;
use App\Services\ProductService;
use App\Services\Sorting\ProductSorterService;
use Diglactic\Breadcrumbs\Breadcrumbs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request as Requ;
use Inertia\Inertia;

class CategoryController extends Controller
{
    protected $productFilterService;
    protected $productSortingSerivce;
    protected $productService;

    public function __construct(ProductFilterService $productFilterService, ProductSorterService $productSorterService, ProductService $productService)
    {
        $this->productFilterService = $productFilterService;
        $this->productSortingSerivce = $productSorterService;
        $this->productService = $productService;
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

    public function categoriesTest($categorySlug, Request $request)
    {
        $category = Category::where('slug', $categorySlug)->first();

        $categoriesMenu = Category::get()->toTree();

        $result = Category::ancestorsAndSelf($category->id);
        $breadcrumbs = Breadcrumbs::generate('categories', $result);


        if($category->is_final) {

            // TODO Если значение просто go ?
            $filters_query = [];
            foreach ($request->all() as $key => $values) {
                $filters_query[$key] = explode(',', $values[0]);
            }
            
            $productsQuery = Product::query()->where('category_id', $category->id);

            $slugs = array_keys($filters_query);
            // Получить все атрибуты по их слагам и сохранить результат в ассоциативный массив
            $attributesBySlug = ProductAttribute::whereIn('slug', $slugs)->pluck('id', 'slug')->toArray();

            foreach ($filters_query as $key => $filterValues) {

                if (isset($attributesBySlug[$key])) {
                    $attributeId = $attributesBySlug[$key];
                    $attributeType = CategoryAttributeRelationship::where('attribute_id', $attributeId)->value('type');
            
                    if ($key === 'price') {
                        $minPrice = $filterValues[0];
                        $maxPrice = $filterValues[1]; 

                        $productsQuery->whereBetween('price', [$minPrice, $maxPrice]);

                    } elseif ($attributeType === 'range') {
                        $minValue = $filterValues[0];
                        $maxValue = $filterValues[1];

                        $productsQuery->join('product_characteristics as pc_' . $attributeId, function ($join) use ($attributeId, $minValue, $maxValue) {
                            $join->on('products.id', '=', 'pc_' . $attributeId . '.product_id')
                                ->join('attribute_values as av' . $attributeId, 'pc_' . $attributeId.'.value_id', '=', 'av' . $attributeId . '.id')
                                ->where('av' . $attributeId . '.attribute_id', '=', $attributeId)
                                ->whereBetween('av' . $attributeId . '.value_int', [$minValue, $maxValue]);
                        });

                    } else {
                        
                        $productsQuery->join('product_characteristics as pc_' . $attributeId, function ($join) use ($attributeId) {
                            $join->on('products.id', '=', 'pc_' . $attributeId . '.product_id')
                                ->where('pc_' . $attributeId . '.attribute_id', '=', $attributeId);
                        })
                        ->whereIn('pc_' . $attributeId . '.value_id', $filterValues);

                    }
                }
            }

            if (isset($filters_query['order'])) {
                $sortingOption = $filters_query['order'][0];
                // Применяем сортировку в зависимости от значения ключа 'sorting'
                switch ($sortingOption) {
                    case 1:
                        $productsQuery->orderBy('price');
                        break;
                    case 2:
                        $productsQuery->orderByDesc('price');
                        break;
                    case 3:
                        $productsQuery->orderBy('products.created_at');
                        break;
                    case 4:
                        $productsQuery->orderByDesc('products.created_at');
                        break;
                    case 6: 
                        $productsQuery->join('ratings', 'products.id', '=', 'ratings.product_id')
                            ->select('products.*', DB::raw('AVG(ratings.rating_value) as average_rating'))
                            ->groupBy('products.id')
                            ->orderByDesc('average_rating');
                        break;
                    default:
                        // Если значение 'sorting' не соответствует ни одному из ожидаемых, ничего не делаем
                        break;
                }
            } else {
                $productsQuery->orderBy('price');
            }

            // 18
            $products = $productsQuery
                ->with(['images'])
                ->withCount('ratings')
                ->withAvg('ratings', 'rating_value')
                ->paginate(18)
                ->appends(Requ::all());

            // dump($products);
            

            $relationships = CategoryAttributeRelationship::with('values', 'attribute')
                ->where('category_id', $category->id)
                ->where('is_required', true)
                // ->with('attribute')
                ->orderBy('order')
                ->get();


            foreach ($relationships as $relationship) {

                // $relationship->values->product_count = $relationship->values()
                //     ->select('attribute_values.*', DB::raw('COUNT(products.id) as product_count'))
                //     ->leftJoin('product_characteristics', 'product_characteristics.value_id', '=', 'product_characteristics.id')
                //     ->leftJoin('products', 'products.id', '=', 'product_characteristics.product_id')
                //     ->groupBy('attribute_values.id')
                //     ->get();

                $valuesWithCount = [];
                // TODO
                foreach ($relationship->values as $value) {
                    $count = Product::whereHas('characteristics', function ($query) use ($value) {
                        $query->where('value_id', $value->id);
                    })->count();

                    $value->product_count = $count;
                    $valuesWithCount[] = $value;
                }

                // TODO ищу фильтр цены по id
                if ($relationship->attribute->slug === 'price') {
                    $relationship->findMinMaxPrice();
                } elseif ($relationship->type === 'range') {
                    $relationship->findMinMaxValues();
                }
                $relationship->getNameAttribute();
            }        

            // dump($relationships[7]);


            return Inertia::render('Products', [
                'category' => $category, 
                'products' => $products, 
                'categories_menu' => $categoriesMenu, 
                'breadcrumbs' => $breadcrumbs,
                'filters' => $relationships,
                'filters_query' => $filters_query,
            ]);
        }

        $categories = Category::where('slug', $categorySlug)->with(['children', 'children.images'])->first();
  
        $result = Category::ancestorsAndSelf($category->id);
        $breadcrumbs = Breadcrumbs::generate('categories', $result);
        
        return Inertia::render('Categories', [
            'categories' => $categories, 
            'breadcrumbs' => $breadcrumbs, 
            'categories_menu' => $categoriesMenu
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
    
        $filtersQuery = $request->filtersQuery();

        // Фильтруем, сортируем продукты, так же получаем отношения.
        $products = $this->productService
            ->createProductQuery($category)
            ->filter($filtersQuery)
            ->sort($filtersQuery)
            ->getProductQuery()
            ->with(['images'])
            ->withCount('ratings')
            ->withAvg('ratings', 'rating_value')
            ->paginate(18);

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