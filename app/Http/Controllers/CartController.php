<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Services\Cart\DeleteMultipleProductsService;
use App\Services\Cart\DeleteSingleProductService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class CartController extends Controller
{
    protected $deleteMultipleProductService;
    protected $deleteSingleProductService;

    public function __construct(
        DeleteMultipleProductsService $deleteMultipleProductsService,
        DeleteSingleProductService $deleteSingleProductService,
    ) {
        $this->deleteMultipleProductService = $deleteMultipleProductsService;
        $this->deleteSingleProductService = $deleteSingleProductService;
    }

    public function show()
    {
        $user = Auth::user();
        
        $products = Cart::where('user_id', $user->id)->with('product.images')->get();

        return Inertia::render('Cart', ['data' => $products]);
    }

    public function add(Request $request)
    {
        $user = Auth::user();
        $productId = $request->input('product_id');

        $existingCartItem = Cart::where('user_id', $user->id)
            ->where('product_id', $productId)
            ->first();

        if ($existingCartItem) {
            return Redirect::back()->with('error', 'Продукт уже есть в корзине');
        }

        Cart::create([
            'user_id' => $user->id,
            'product_id' => $productId,
            'quantity' => 1,
        ]);

        return Redirect::back()->with('success', 'Продукт успешно добавлен в корзину');
    }

    public function delete(Request $request) : RedirectResponse
    {
        $user = Auth::user();
        $cartIds = $request->input('cart_ids');

        if (is_array($cartIds)) {
            $this->deleteMultipleProductService->delete($user->id, $cartIds);
        } else {
            $this->deleteSingleProductService->delete($user->id, $cartIds);
        }

        return Redirect::back()->with('success', 'Продукт(ы) успешно удалены из корзины');
    }

    public function update(Request $request) 
    {

    }
}
