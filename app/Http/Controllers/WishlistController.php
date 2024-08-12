<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Wishlist;
use App\Services\Wishlist\DeleteMultipleProductsService;
use App\Services\Wishlist\DeleteSingleProductService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

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

    public function show(Request $request) 
    {
        // dd($request);
        // TODO 
        // Сейчас я запрашиваю все продукты из избранного
        // Хотелось бы переделать. 

        $user = Auth::user();

        // Получаем все id нужных товаров в избранном
        $wishlistProductIds = Wishlist::where('user_id', $user->id)->pluck('product_id');

        // Получаем все товары с полями id и price (Для выбора всех)
        $allProducts = Product::whereIn('id', $wishlistProductIds)
            ->select(['id', 'price'])
            ->get();
        $totalProducts = $allProducts->count();
        // TODO округление денежных значений
        $totalAmount = round($allProducts->sum('price'), 2);

        $products = Product::whereIn('id', $wishlistProductIds)
            ->with('images')
            ->withCount('ratings')
            ->withAvg('ratings', 'rating_value')
            ->paginate(5);

        return Inertia::render('Profile/Wishlist', [
            'products' => $products,
            'total_products' => $totalProducts,
            'total_amount' => $totalAmount,
            'filter_query' => $request->all(),
            'all_products' => $allProducts,
        ]);
    }

    public function add(Request $request)
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

    public function delete(Request $request)
    {
        // dd($request);
        $user = Auth::user();
        $productIds = $request->input('product_ids');

        if (is_array($productIds)) {
            $this->deleteMultipleProductService->delete($user->id, $productIds);
        } else {
            $this->deleteSingleProductService->delete($user->id, $productIds);
        }

        return redirect()->back()->with('success', 'Продукт(ы) успешно удалены из избранного');
    }
}