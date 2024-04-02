<?php

namespace Database\Seeders;

use App\Models\AttributeValue;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\ProductCharacteristic;
use App\Models\ProductImage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $imagePath = [
            ['Производитель' => 'AMD', 'path' => 'processor amd.png'],
            ['Производитель' => 'Intel', 'path' => 'processor intel.png'],
        ];

        $productAttributeName = 'Производитель';

        $products = ProductCharacteristic::select('product_id', 'attribute_values.value_string AS value')
            ->join('attribute_values', 'product_characteristics.value_id', '=', 'attribute_values.id')
            ->join('product_attributes', 'product_characteristics.attribute_id', '=', 'product_attributes.id')
            ->whereHas('attribute', function ($query) use ($productAttributeName) {
                $query->where('name', $productAttributeName);
            })
            ->get();

        foreach ($products as $product) {
            $image = collect($imagePath)->firstWhere('Производитель', $product->value);
            
            if ($image) {
                ProductImage::create([
                        'product_id' => $product->product_id,
                        'image_url_original' => $image['path'],
                        'image_url_thumbnail' => $image['path'],
                        'image_url_detail' => $image['path'],
                        'order' => 1,
                        'is_primary' => true,
                ]);
            }
        }

    }
}
