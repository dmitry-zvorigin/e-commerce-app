<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\CategoryAttributeRelationship;
use App\Models\Product;
use App\Models\ProductCharacteristic;
use Diglactic\Breadcrumbs\Breadcrumbs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
        // $categories = Category::with(['children', 'children.images'])->find($category);

        // dump($request->all());

        $category = Category::where('slug', $categorySlug)->first();

        $categoriesMenu = Category::get()->toTree();

        $result = Category::ancestorsAndSelf($category->id);
        $breadcrumbs = Breadcrumbs::generate('categories', $result);

        if($category->is_final) {
            $products = $category->products;
            // $filters = $category->requiredAttributes();
            // dump($filters);

            // $attributeIds = $category->attributeRelationships()->where('is_required', true)->get()->pluck('attribute_id');

            // $attributes = $category->attributeRelationships()
            //     ->where('is_required', true)
            //     ->get();

            // $category_id = 427;

            $relationships = CategoryAttributeRelationship::with('values')
                ->where('category_id', $category->id)
                ->where('is_required', true)
                ->with('attribute')
                ->get();
            
            // dd($relationships);
            
            // $filters = ProductCharacteristic::whereIn('attribute_id', $attributeIds)
            //     ->with(['attribute', 'value']) // предполагается, что у вас есть соответствующие отношения в модели ProductCharacteristic
            //     ->get()
            //     ->groupBy('attribute.name')
            //     ->map(function ($attributeGroup) {
            //         return $attributeGroup->pluck('value.name')->unique();
            //     });

            // $category_id = 427;
            // $attributes = DB::table('category_attribute_relationships')
            //     ->join('product_attributes', 'category_attribute_relationships.attribute_id', '=', 'product_attributes.id')
            //     ->join('attribute_values', 'product_attributes.id', '=', 'attribute_values.attribute_id')
            //     ->select('product_attributes.name as attribute_name', 'attribute_values.name as value_name')
            //     ->where('category_attribute_relationships.category_id', '=', $category_id)
            //     ->where('category_attribute_relationships.is_required', '=', true)
            //     ->get()
            //     ->groupBy('attribute_name');

            // dd($attributes);


            // $filters = ProductCharacteristic::whereIn('attribute_id', $attributeIds)
            //     ->with(['attribute', 'value']) // предполагается, что у вас есть соответствующие отношения в модели ProductCharacteristic
            //     ->get()
            //     ->groupBy('attribute.name')
            //     ->map(function ($attributeGroup) {
            //         return $attributeGroup->pluck('value.name')->unique();
            //     });
            
            // dump($filters);
            
            return Inertia::render('Products', [
                'category' => $category, 
                'products' => $products, 
                'categories_menu' => $categoriesMenu, 
                'breadcrumbs' => $breadcrumbs,
                'filters' => $relationships,
                'filters_query' => $request->all('filter'),
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


    // public function showCategories() 
    // {
    //     $categories = Category::whereNull('parent_id')->with('children', 'images')->get();

    //     return Inertia::render('Cart', ['categories' => $categories]);
    // }

    // public function testShowMegaMenu()
    // {
    //     $categories = Category::where('id', 425)->with(['children', 'children.children'])->first();
    //     return Inertia::render('newPage', ['categories' => $categories]);
    // }

}
