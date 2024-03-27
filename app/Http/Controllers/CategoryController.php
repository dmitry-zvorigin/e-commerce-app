<?php

namespace App\Http\Controllers;

use App\Models\AttributeValue;
use App\Models\Category;
use App\Models\CategoryAttributeRelationship;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\ProductCharacteristic;
use Diglactic\Breadcrumbs\Breadcrumbs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request as Requ;
use Inertia\Inertia;

Breadcrumbs::for('catalog', function($trail) {
    $trail->push('Главная', route('catalog'));
});

Breadcrumbs::for('categories', function($trail, $categories) {
    $trail->parent('catalog');
    foreach($categories as $category) {
        $trail->push($category->name, $category->show_url);
    } 
});

class CategoryController extends Controller
{
    public function test()
    {
        $str = 'Привет';

        return Inertia::render('Compare', ['str' => $str]);
    }


    public function catalog() 
    {
        $categories = Category::whereNull('parent_id')->with('children', 'images')->get();

        $categoriesMenu = Category::get()->toTree();
        
        $breadcrumbs = Breadcrumbs::generate('catalog');

        return Inertia::render('Catalog', [
            'categories' => $categories, 
            'breadcrumbs' => $breadcrumbs, 
            'categories_menu' => $categoriesMenu
        ]);
    }

    public function categories($categorySlug, Request $request)
    {
        $category = Category::where('slug', $categorySlug)->first();

        $categoriesMenu = Category::get()->toTree();

        $result = Category::ancestorsAndSelf($category->id);
        $breadcrumbs = Breadcrumbs::generate('categories', $result);


        if($category->is_final) {

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
            
                    // dump(isset($attributesBySlug['price']));
                    if (isset($attributesBySlug['price'])) {
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
                    default:
                        // Если значение 'sorting' не соответствует ни одному из ожидаемых, ничего не делаем
                        break;
                }
            } else {
                $productsQuery->orderBy('price');
            }

            // 18
            $products = $productsQuery->paginate(18)->appends(Requ::all());

            // dump($products);
            

            $relationships = CategoryAttributeRelationship::with('values', 'attribute')
                ->where('category_id', $category->id)
                ->where('is_required', true)
                // ->with('attribute')
                ->orderBy('order')
                ->get();


            foreach ($relationships as $relationship) {
                // TODO ищу фильтр цены по id
                if ($relationship->attribute->slug === 'price') {
                    $relationship->findMinMaxPrice();
                } elseif ($relationship->type === 'range') {
                    $relationship->findMinMaxValues();
                }
                $relationship->getNameAttribute();
            }        

            // dump($relationships);


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
}
