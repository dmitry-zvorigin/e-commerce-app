<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name,
            'description' => $this->faker->paragraph,
            'price' => $this->faker->randomFloat(2, 1599, 85000),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Product $product) {
            $categoryId = $product->category_id;
            
            $prefix = '';
            switch ($categoryId) {
                case 427:
                    $prefix = 'Процессор';
                    break;
                
                case 429: 
                    $prefix = 'Видеокарта';
                default:
                    break;
            }

            $productName = $prefix . ' ' . $product->name;

            $product->update(['name' => $productName]);
        });
    }
}
