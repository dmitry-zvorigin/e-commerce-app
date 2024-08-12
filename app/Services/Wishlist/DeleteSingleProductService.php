<?php 

namespace App\Services\Wishlist;

use App\Models\Wishlist;

class DeleteSingleProductService
{
    public function delete(int $userId, int $productId)
    {
        Wishlist::where('user_id', $userId)
            ->where('product_id', $productId)
            ->delete();
    }
}