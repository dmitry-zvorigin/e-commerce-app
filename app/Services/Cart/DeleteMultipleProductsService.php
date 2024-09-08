<?php 

namespace App\Services\Cart;

use App\Models\Cart;

class DeleteMultipleProductsService 
{
    public function delete(int $userId, array $cartIds)
    {
        Cart::where('user_id', $userId)
            ->whereIn('id', $cartIds)
            ->delete();
    }
}