<?php

namespace App\Http\Controllers;

use App\Breadcrumbs\BreadcrumbsManager;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\ProductCharacteristic;
use Illuminate\Http\Request;
use Diglactic\Breadcrumbs\Breadcrumbs;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function __construct()
    {
        BreadcrumbsManager::registerCatalog();
        BreadcrumbsManager::registerCatagories();
        BreadcrumbsManager::registerProduct();
    }


    public function show($productSlug)
    {
        $product = Product::where('slug', $productSlug)
            ->with('images')
            ->withCount('ratings')
            ->withAvg('ratings', 'rating_value')
            ->first();

        $categoriesMenu = Category::get()->toTree();

        $breadcrumbs = Breadcrumbs::generate('product', $product);

        $productCharacteristics = ProductCharacteristic::with('attribute.group', 'value')->where('product_id', $product->id)->get();
        $groupedCharacteristics = $productCharacteristics->groupBy('attribute.group.name');

        return Inertia::render('Product', [
            // 'category' => $category, 
            'product' => $product, 
            'categories_menu' => $categoriesMenu, 
            'breadcrumbs' => $breadcrumbs,
            'groupedCharacteristics' => $groupedCharacteristics,
            // 'filters' => $relationships,
            // 'filters_query' => $filters_query,
        ]);
    }
}
