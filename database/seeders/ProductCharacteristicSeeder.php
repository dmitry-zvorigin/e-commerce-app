<?php

namespace Database\Seeders;

use App\Models\ProductCharacteristic;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductCharacteristicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $product_characteristics = [
            4 => [
                [4, 2],
                [5, 10],
                [6, 12],
                [7, 14],
                [8, 15],
                [9, 16],
            ],
            1 => [
                [4, 1],
                [5, 9],
                [6, 11],
                [7, 13],
                [8, 15],
                [9, 16],
            ],
        ];

        foreach ($product_characteristics as $product_id => $characteristics) {
            foreach ($characteristics as $characteristic) {
                ProductCharacteristic::create([
                    'product_id' => $product_id,
                    'attribute_id' => $characteristic[0],
                    'value_id' => $characteristic[1],
                ]);
            }
        }
    }
}
