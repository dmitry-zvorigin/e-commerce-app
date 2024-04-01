<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Rating;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RatingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = Product::all();
        $user = User::factory()->create();

        $products->each(function ($product) use ($user) {
            $random_count = rand(40, 70);
            Rating::factory()->count($random_count)->create([
                'product_id' => $product->id,
                'user_id' => $user->id,
            ]);
        });
    }
}
