<?php

namespace App\Http\Controllers;

use App\Http\Requests\FilterWishlistRequest;
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
use App\Services\ProductFilterService as Filter;
use App\Services\ProductSortingService as Sorting;

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

    public function show(FilterWishlistRequest $request) : Response
    {
        // TODO 
        // Сейчас я запрашиваю все продукты из избранного
        // Хотелось бы переделать. 
        $filtersQuery = $request->filterQuery();

        $user = Auth::user();

        $wishlist = Wishlist::where('user_id', $user->id)
            ->with('product.category')
            ->get();
        
        $categoryOptions = $wishlist->pluck('product.category')->unique('id')->values()->toArray();
        $wishlistProductIds = $wishlist->pluck('product_id')->toArray();

        $baseQuery = Product::query()->whereIn('products.id', $wishlistProductIds);
    
        $productFilterService = new Filter($baseQuery);
        $filteredQuery = $productFilterService->applyFilters($filtersQuery);
    
        $cloneQuery = clone $filteredQuery;

        $allProducts = $cloneQuery->select(['id', 'price'])->get();
    
        $productSortingService = new Sorting($filteredQuery);
        $sortedQuery = $productSortingService->applySorting($filtersQuery['order'], 7);
    
        $products = $sortedQuery->with('images')
            ->withCount('ratings')
            ->withAvg('ratings', 'rating_value')
            ->paginate(5);

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