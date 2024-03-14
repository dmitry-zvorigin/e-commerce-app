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
                [3, 5],
                [4, 2],
                [5, 10],
                [6, 12],
                [7, 14],
                [8, 15],
                [9, 16],
                [10, 18],
                [11, 29],
                [12, 41],
                [14, 50],
                [21, 64],
                [26, 73],
                [31, 79],
                [34, 85],
            ],
            1 => [
                [3, 6],
                [4, 1],
                [5, 9],
                [6, 11],
                [7, 13],
                [8, 15],
                [9, 16],
                [10, 25],
                [11, 30],
                [12, 35],
                [14, 49],
                [21, 67],
                [26, 72],
                [31, 80],
                [34, 85],
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
