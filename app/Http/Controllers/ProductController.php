<?php

namespace App\Http\Controllers;

use App\Breadcrumbs\BreadcrumbsManager;
use App\Models\Category;
use App\Models\Product;
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
        BreadcrumbsManager::registerProductReviews();
    }


    public function show(string $productSlug)
    {
        // Категории для меню
        $categoriesMenu = Category::get()->toTree();

        // Получаем продукт
        $product = Product::where('slug', $productSlug)
            ->withAllReviewsAndImages()
            ->withAggregateData()
            ->firstOrFail();

        // Хлебные крошки
        $breadcrumbs = Breadcrumbs::generate('product', $product);
        
        // Получаем видимые характеристики продукта 
        $groupedCharacteristics = ProductCharacteristic::getVisibleCharacteristics($product->id, $product->category_id);
        
        // Получаем самый популярый отзыв
        $popularReview = $product->popularReview();

        // Получить все изображения у отзывов
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

    public function reviews(Request $request, string $productSlug)
    {
        // Категории для меню
        $categoriesMenu = Category::get()->toTree();

        // Получаем продукт
        $product = Product::where('slug', $productSlug)
            ->withAllReviews()
            ->withAggregateData()
            ->firstOrFail();

        // Хлебные крошки
        $breadcrumbs = Breadcrumbs::generate('productReviews', $product);

        // Параметры фильтрации и сортировки
        $order = $request->input('order', '1');
        $filterRealBuyer = $request->input('filter_real_buyer', false);
        $filterWithPhoto = $request->input('filter_with_photo', false);
        $filterRating = $request->input('filter_ratings', '');
        $searchQuery = $request->input('search', '');

        // Создаем запрос для получения отзывов
        $reviews = $product->reviews()
            ->withReviewsAllOptions()
            ->filterRealBuyer($filterRealBuyer)
            ->filterWithPhoto($filterWithPhoto)
            ->filterRatings($filterRating)
            ->search($searchQuery)
            ->sortOrder($order)
            ->paginate(5);

        // Получить все изображения у отзывов
        $reviewsImages = $reviews->flatMap(function ($review) {
            return $review->images;
        });

        // Получаем самый популярый отзыв
        $popularReview = $product->popularReview();

        // Получить рейтинг и их количество
        $ratingsGroups = $product->ratings->groupBy('rating_value')->map(function ($group) {
            return $group->count();
        })->toArray();

        // Получаем дополнительне опции и их средний рейтинг
        $additionalAssessments = $product->reviews->flatMap->additionalAssessments->groupBy('option_id');
        $averageOptionRatings = $additionalAssessments->map(function ($assessments) {
            return [
                'title' => $assessments->first()->option->title,
                'average_rating' => $assessments->avg('rating_value')
            ];
        });

        return Inertia::render('ProductReviews', [
            'product' => $product,
            'categories_menu' => $categoriesMenu,
            'breadcrumbs' => $breadcrumbs,
            'reviewImages' => $reviewsImages,
            'popularReview' => $popularReview,
            'reviews' => $reviews,
            'ratingsGroups' => $ratingsGroups,
            'averageOptionRatings' => $averageOptionRatings,
            'request' => $request->all(),
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