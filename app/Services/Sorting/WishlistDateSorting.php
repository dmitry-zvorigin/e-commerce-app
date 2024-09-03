<?php 

namespace App\Services\Sorting;
use App\Services\Specifications\ProductSortingSpecification;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

class WishlistDateSorting implements ProductSortingSpecification
{
    public function apply(Builder $query) : Builder
    {
        $user = Auth::user();

        return $query->join('wishlists', 'products.id', '=', 'wishlists.product_id')
            ->where('wishlists.user_id', $user->id)
            ->orderBy('wishlists.created_at', 'desc');
    }
}