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
            ['Производитель' => 'AMD', 'path_thumb' => 'processor amd.png', 'path_detail' => 'amd_full.png'],
            ['Производитель' => 'Intel', 'path_thumb' => 'processor intel.png', 'path_detail' => 'intel_full.png'],

            ['Производитель' => 'ASRock', 'path_thumb' => 'thumb_asrock.png', 'path_detail' => 'full_asrock.png'],
            ['Производитель' => 'GIGABYTE', 'path_thumb' => 'tumb_gigabyte.png', 'path_detail' => 'full_gigabyte.png'],
            ['Производитель' => 'Palit', 'path_thumb' => 'thumb_palit.png', 'path_detail' => 'full_palit.png'],
            ['Производитель' => 'Sapphire', 'path_thumb' => 'thumb_sapphire.png', 'path_detail' => 'full_sapphire.png'],
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
                        'image_url_original' => $image['path_detail'],
                        'image_url_thumbnail' => $image['path_thumb'],
                        'image_url_detail' => $image['path_detail'],
                        'order' => 1,
                        'is_primary' => true,
                ]);
            }
        }

    }
}
