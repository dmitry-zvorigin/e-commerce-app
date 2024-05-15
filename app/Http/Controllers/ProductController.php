<?php

namespace App\Http\Controllers;

use App\Breadcrumbs\BreadcrumbsManager;
use App\Models\AttributeGroup;
use App\Models\AttributeGroupOrder;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\ProductCharacteristic;
use App\Models\ReviewAdditionalAssessmentOption;
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
        BreadcrumbsManager::registerProductReviews();
    }


    public function show($productSlug)
    {

        $categoriesMenu = Category::get()->toTree();

        $product = Product::where('slug', $productSlug)
            ->with('images')
            ->withCount('ratings')
            ->withAvg('ratings', 'rating_value')
            ->first();

        $breadcrumbs = Breadcrumbs::generate('product', $product);

        // $productCharacteristics = ProductCharacteristic::where('product_id', $product->id)
        //     ->where('is_visible', true)
        //     ->with(['attribute.group' => function ($query) {
        //         $query->join('attribute_group_orders', 'attribute_groups.id', '=', 'attribute_group_orders.group_id')
        //         ->orderBy('order');
        //     }, 'value'])
        //     ->orderBy('order')
        //     ->get();

        

        // Отсортировать сгруппированные данные по полю 'order' в таблице 'attribute_group_orders'

        // $groupedAttributes = ProductCharacteristic::select(
        //     'product_attributes.*', 
        //     'attribute_values.value_string as attribute_value', 
        //     'attribute_groups.name as group_name'
        //     )
        //     ->join('product_attributes', 'product_characteristics.attribute_id', '=', 'product_attributes.id')
        //     ->join('attribute_group_orders', 'product_attributes.group_id', '=', 'attribute_group_orders.group_id')
        //     ->join('attribute_values', 'product_characteristics.value_id', '=', 'attribute_values.id')
        //     ->join('attribute_groups', 'product_attributes.group_id', '=', 'attribute_groups.id')
        //     ->where('product_characteristics.product_id', $product->id)
        //     ->orderBy('attribute_group_orders.order', 'ASC')
        //     ->get();


        // $product = Product::with(['characteristics' => function ($query) {
        //     $query->with(['attribute' => function ($query) {
        //         $query->with(['group.order' => function ($query) {
        //             $query->orderBy('order');
        //         }]);
        //     }, 'value']);
        // }])->find($product->id);
        
        // $groupedCharacteristics = $product->characteristics->groupBy(function ($item, $key) {
        //     return $item->attribute->group->name;
        // });

        
        $groupedCharacteristics = ProductCharacteristic::where('product_id', $product->id)
            ->where('is_visible', true)
            ->join('product_attributes', 'product_characteristics.attribute_id', '=', 'product_attributes.id')
            ->join('attribute_groups', 'product_attributes.group_id', '=', 'attribute_groups.id')
            ->join('attribute_group_orders', function($join) use ($product) {
                $join->on('product_attributes.group_id', '=', 'attribute_group_orders.group_id')
                    ->where('attribute_group_orders.category_id', '=', $product->category_id);
            })
            ->with(['attribute', 'value'])
            ->orderBy('product_characteristics.order')
            ->get();

        $groupedCharacteristics = $groupedCharacteristics->sortBy(function ($group, $groupName) {
            return $group->order;
        });

        $groupedCharacteristics = $groupedCharacteristics->groupBy('name');


        $popularReview = $product->popularReview();

        if ($popularReview) {
            $popularReview->load('rating', 'options', 'images', 'user', 'usageTerm', 'likes', 'dislikes');
        }

        $reviewsImages = $product->reviews->flatMap(function ($review) {
            return $review->images;
        });

        return Inertia::render('Product', [
            'product' => $product, 
            'categories_menu' => $categoriesMenu, 
            'breadcrumbs' => $breadcrumbs,
            'groupedCharacteristics' => $groupedCharacteristics,
            'popularReview' => $popularReview,
            'reviewImages' => $reviewsImages,
        ]);
    }

    public function reviews($productSlug)
    {
        $categoriesMenu = Category::get()->toTree();

        $product = Product::where('slug', $productSlug)
            ->with('images', 'reviews', 'reviews.rating', 'reviews.options', 'reviews.images', 
            'reviews.user', 'reviews.usageTerm', 'reviews.likes', 'reviews.dislikes')
            ->withCount('ratings')
            ->withAvg('ratings', 'rating_value')
            ->first();

        $breadcrumbs = Breadcrumbs::generate('productReviews', $product);

        $reviewsImages = $product->reviews->flatMap(function ($review) {
            return $review->images;
        });

        $popularReview = $product->popularReview();

        if ($popularReview) {
            $popularReview->load('rating', 'options', 'images', 'user', 'usageTerm', 'likes', 'dislikes');
        }

        return Inertia::render('ProductReviews', [
            'product' => $product,
            'categories_menu' => $categoriesMenu,
            'breadcrumbs' => $breadcrumbs,
            'reviewImages' => $reviewsImages,
            'popularReview' => $popularReview,

        ]);
    }

    public function test() 
    {
        $productId = 3;

        $product = Product::where('id', $productId)
            ->with(
                'reviews', 'reviews.rating', 'reviews.options', 'reviews.images', 
                'reviews.user', 'reviews.usageTerm', 'reviews.likes', 'reviews.dislikes',
            )
            ->first();

        $reviews = $product['reviews'];

        $popularReview = $product->popularReview();

        if ($popularReview) {
            $popularReview->load('rating', 'options', 'images', 'user', 'usageTerm', 'likes', 'dislikes');
        }
        // dd($popularReview);
        
        // dd($product->toArray());

        return Inertia::render('Test', ['reviews' => $reviews, 'popularReview' => $popularReview]);
    }
}
