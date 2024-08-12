<?php 

namespace App\Services\Wishlist;

use App\Models\Wishlist;

class DeleteMultipleProductsService
{
    public function delete(int $userId, array $productIds)
    {
        Wishlist::where('user_id', $userId)
            ->whereIn('product_id', $productIds)
            ->delete();
    }
}