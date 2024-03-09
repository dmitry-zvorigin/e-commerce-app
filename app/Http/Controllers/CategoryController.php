<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Diglactic\Breadcrumbs\Breadcrumbs;
use Illuminate\Http\Request;
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
    public function catalog() 
    {
        $categories = Category::whereNull('parent_id')->with('children', 'images')->get();

        $categoriesMenu = Category::get()->toTree();
        
        $breadcrumbs = Breadcrumbs::generate('catalog');

        return Inertia::render('Catalog', ['categories' => $categories, 'breadcrumbs' => $breadcrumbs, 'categories_menu' => $categoriesMenu]);
    }

    public function categories($categorySlug)
    {
        // $categories = Category::with(['children', 'children.images'])->find($category);

        $category = Category::where('slug', $categorySlug)->first();

        $categoriesMenu = Category::get()->toTree();

        $result = Category::ancestorsAndSelf($category->id);
        $breadcrumbs = Breadcrumbs::generate('categories', $result);

        if($category->is_final) {
            $products = $category->products;
            return Inertia::render('Products', ['category' => $category, 'products' => $products, 'categories_menu' => $categoriesMenu, 'breadcrumbs' => $breadcrumbs]);
        }

        $categories = Category::where('slug', $categorySlug)->with(['children', 'children.images'])->first();
  
        $result = Category::ancestorsAndSelf($category->id);
        $breadcrumbs = Breadcrumbs::generate('categories', $result);
        

        return Inertia::render('Categories', ['categories' => $categories, 'breadcrumbs' => $breadcrumbs, 'categories_menu' => $categoriesMenu]);

    }

    public function showCategories() 
    {
        $categories = Category::whereNull('parent_id')->with('children', 'images')->get();

        return Inertia::render('Cart', ['categories' => $categories]);
    }

    public function testShowMegaMenu()
    {
        $categories = Category::where('id', 425)->with(['children', 'children.children'])->first();
        return Inertia::render('newPage', ['categories' => $categories]);
    }
}
