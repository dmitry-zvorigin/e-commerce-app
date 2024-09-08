<?php 

namespace App\Services\Cart;

use App\Models\Cart;

class DeleteSingleProductService
{
    public function delete(int $userId, int $cartIds)
    {
        Cart::where('user_id', $userId)
            ->where('id', $cartIds)
            ->delete();
    }
}