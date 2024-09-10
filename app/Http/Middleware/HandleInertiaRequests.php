<?php

namespace App\Http\Middleware;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = Auth::user();

        if ($user) {
            $cartItems = $user->cart()->with('product.images')->get()->map(function ($cartItem) {
                return [
                    'id' => $cartItem->id,
                    'product' => [
                        'id' => $cartItem->product->id,
                        'name' => $cartItem->product->name,
                        'slug' => $cartItem->product->slug,
                        'image' => $cartItem->product->images->first()?->image_url_thumbnail ?? null,
                        'price' => $cartItem->product->price,
                        'quantity' => $cartItem->quantity,
                    ],
                ];
            });

            $wishlist = $user->wishlist->pluck('product_id');
        } else {
            $cartItems = collect();
            $wishlist = collect();
        }

        // $wishlist = $user ? $user->wishlist->pluck('product_id') : [];
        // $cart = $user ? $user->cart->product->pluck('id', ) : [];

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
                'wishlist' => $wishlist,
                'cart' => $cartItems,
            ],
            'categoriesMenu' => Category::get()->toTree(),
        ];
    }
}
