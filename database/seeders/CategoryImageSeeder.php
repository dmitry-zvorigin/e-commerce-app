<?php

namespace Database\Seeders;

use App\Models\CategoryImage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoryImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categoriesImage = [
            1 => '2aaaee8f9cf22a2eecd75ee28f9a88ec74ea03b26015438fb04590fd89d0da24.png',
            146 => '7b8a5c451455d2c09e9891e428ffd196ce0821568705cbf4c82ef80a71161f3a.png',
            323 => 'a233ea8a2c9ad8bcd719e885cd9b5474338ae756a1b1fc492310f9c1d4607038.png',
            425 => 'a5bfd608589b06c177dc9e3ff35f8c4761ba8df3818648f48d386b09ae5cd7ba.png',
            513 => 'cc5aa264a759c9e3c2b31eb188364e858232272eb9050bba08e45256023b91f4.png',
            584 => '91cb6e331adbca4ef08d278172c9f624fddcca89dc630d6aa56e9197061196ed.png',
            426 => '4b97445b101cbc23f24c271d9f6352e55d32a22dec5f3fc9048ae849f7c2dfb9.png',
            474 => '001e15e1b809f1dacbfa7d2eb3f95dba5cb5552ea55c1b84aa6a8f1bca495fac.jpg',
            484 => '746949c94e4c9edf6616a18338c0690448fe99dff702eb94ad2b741b6ded5880.jpg',
            500 => '1e15d6c32b6caeb028b29178f21bbc8bee0ade279d5354ee307dfb67906b9396.jpg',
            427 => 'processors.png',
        ];

        foreach ($categoriesImage as $categoryId => $imagePath) {
            CategoryImage::create(['category_id' => $categoryId, 'image_path' => $imagePath]);
        }
    }
}
