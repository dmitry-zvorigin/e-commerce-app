<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TestImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $images = [
            [
                'image_url_original' => 'FX-4300 1(2).png', 
                'image_url_thumbnail' => 'FX-4300 1.png', 
                'image_url_detail' => 'FX-4300 1(1).png', 
                'order' => 1, 
                'is_primary' => 1
            ],
            [
                'image_url_original' => 'FX-4300 2(2).png',
                'image_url_thumbnail' => 'FX-4300 2.png', 
                'image_url_detail' => 'FX-4300 2(1).png', 
                'order' => 2, 
                'is_primary' => 0
            ],
            [
                'image_url_original' => 'FX-4300 3(2).png',
                'image_url_thumbnail' => 'FX-4300 3.png', 
                'image_url_detail' => 'FX-4300 3(1).png', 
                'order' => 3, 
                'is_primary' => 0
            ],
            [
                'image_url_original' => 'FX-4300 4(2).png',
                'image_url_thumbnail' => 'FX-4300 4.png', 
                'image_url_detail' => 'FX-4300 4(1).png', 
                'order' => 4, 
                'is_primary' => 0
            ],
            [
                'image_url_original' => 'FX-4300 5(2).png',
                'image_url_thumbnail' => 'FX-4300 5.png', 
                'image_url_detail' => 'FX-4300 5(1).png', 
                'order' => 5, 
                'is_primary' => 0
            ],
            [
                'image_url_original' => 'FX-4300 6(2).png',
                'image_url_thumbnail' => 'FX-4300 6.png', 
                'image_url_detail' => 'FX-4300 6(1).png', 
                'order' => 6, 
                'is_primary' => 0
            ],
            [
                'image_url_original' => 'FX-4300 7(2).png',
                'image_url_thumbnail' => 'FX-4300 7.png', 
                'image_url_detail' => 'FX-4300 7(1).png', 
                'order' => 7, 
                'is_primary' => 0
            ],
            [
                'image_url_original' => 'FX-4300 8(2).png',
                'image_url_thumbnail' => 'FX-4300 8.png', 
                'image_url_detail' => 'FX-4300 8(1).png', 
                'order' => 8, 
                'is_primary' => 0
            ],
            [
                'image_url_original' => 'FX-4300 9(2).png',
                'image_url_thumbnail' => 'FX-4300 9.png', 
                'image_url_detail' => 'FX-4300 9(1).png', 
                'order' => 9, 
                'is_primary' => 0
            ],
        ];

        // $product = Product::find(3);
        ProductImage::where('product_id', 3)->delete();
        
        foreach ($images as $image) {
            ProductImage::create(
                [
                    'product_id' => 3,
                    'image_url_original' => $image['image_url_original'],
                    'image_url_thumbnail' => $image['image_url_thumbnail'],
                    'image_url_detail' => $image['image_url_detail'],
                    'order' => $image['order'],
                    'is_primary' => $image['is_primary'],
                ]
            );
        }
    }
}
