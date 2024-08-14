<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Wishlist;
use App\Services\Wishlist\DeleteMultipleProductsService;
use App\Services\Wishlist\DeleteSingleProductService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class WishlistController extends Controller
{
    protected $deleteSingleProductService;
    protected $deleteMultipleProductService;

    public function __construct(
        DeleteSingleProductService $deleteSingleProductService,
        DeleteMultipleProductsService $deleteMultipleProductService,
    ) {
        $this->deleteSingleProductService = $deleteSingleProductService;
        $this->deleteMultipleProductService = $deleteMultipleProductService;
    }

    public function show(Request $request) : Response
    {
        // TODO 
        // Сейчас я запрашиваю все продукты из избранного
        // Хотелось бы переделать. 

        $user = Auth::user();

        $categoryOptions = $user->wishlist()
            ->with('product.category')
            ->get()
            ->pluck('product.category')
            ->unique('id')
            ->values()
            ->toArray();

        $wishlistProductIds = Wishlist::where('user_id', $user->id)->pluck('product_id');

        $query = Product::whereIn('products.id', $wishlistProductIds);
        $queryAllProducts = Product::whereIn('products.id', $wishlistProductIds);

        if ($request->has('filters')) {
            $filters = explode(',', $request->input('filters'));

            // Применение фильтров для наличия и уведомлений
            if (in_array('in_stock', $filters)) {
                // $query->where('stock', '>', 0);
            }
            if (in_array('out_of_stock', $filters)) {
                // $query->where('stock', '=', 0);
            }
            if (in_array('with_notifications', $filters)) {
                // $query->where('notifications', true);
            }

            // Фильтрация по категориям, когда slug вместо id
            $categorySlugs = array_filter($filters, function($filter) {
                return !in_array($filter, ['in_stock', 'out_of_stock', 'with_notifications']);
            });

            if ($categorySlugs) {
                // Находим соответствующие ID категорий по переданным slug
                $categoryIds = Category::whereIn('slug', $categorySlugs)->pluck('id')->toArray();
                // Фильтруем продукты по найденным ID категорий
                if (!empty($categoryIds)) {
                    $query->whereIn('category_id', $categoryIds);
                    $queryAllProducts->whereIn('category_id', $categoryIds);
                }
            }
        }

        if ($request->has('order')) {
            $order = $request->input('order');
            switch ($order) {
                case 'price_desc':
                    $query->orderBy('price', 'desc');
                    break;
                case 'price_asc':
                    $query->orderBy('price', 'asc');
                    break;
                default:
                    $query->join('wishlists', 'products.id', '=', 'wishlists.product_id')
                        ->where('wishlists.user_id', $user->id)
                        ->orderBy('wishlists.created_at', 'desc');
            }
        } else {
            // Сортировка по умолчанию (по дате добавления в wishlist)
            $query->join('wishlists', 'products.id', '=', 'wishlists.product_id')
                ->where('wishlists.user_id', $user->id)
                ->orderBy('wishlists.created_at', 'desc');
        }

        $products = $query->with('images')
                            ->withCount('ratings')
                            ->withAvg('ratings', 'rating_value')
                            ->paginate(5);

        $allProducts = $queryAllProducts->select(['id', 'price'])->get();

        return Inertia::render('Profile/Wishlist', [
            'products' => $products,
            'filter_query' => $request->all(),
            'all_products' => $allProducts,
            'categoryOptions' => $categoryOptions,
        ]);
        
    }

    public function add(Request $request) : RedirectResponse
    {
        $user = Auth::user();

        $productId = $request->input('product_id');

        $wishlist = Wishlist::where('user_id', $user->id)->where('product_id', $productId)->first();

        if ($wishlist) {
            $wishlist->delete();
        } else {
            Wishlist::create([
                'user_id' => $user->id,
                'product_id' => $productId,
            ]);
        }

        return Redirect::back()->with('success', 'Успешно');
    }

    public function index(Request $request)
    {
        // Проверка авторизации
        if (Auth::check()) {
            // Получение избранного пользователя
            $userId = Auth::id();
            $wishlist = Wishlist::where('user_id', $userId)->pluck('product_id')->toArray();
            
            // Возвращаем данные в JSON-формате
            return response()->json(['wishlist' => $wishlist]);
        } else {
            // Возвращаем пустой список, если пользователь не авторизован
            return response()->json(['wishlist' => []]);
        }
    }

    public function delete(Request $request) : RedirectResponse
    {
        // dd($request);
        $user = Auth::user();
        $productIds = $request->input('product_ids');

        if (is_array($productIds)) {
            $this->deleteMultipleProductService->delete($user->id, $productIds);
        } else {
            $this->deleteSingleProductService->delete($user->id, $productIds);
        }

        return Redirect::back()->with('success', 'Продукт(ы) успешно удалены из избранного');
    }
}