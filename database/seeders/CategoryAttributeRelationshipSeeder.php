<?php

namespace Database\Seeders;

use App\Models\CategoryAttributeRelationship;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoryAttributeRelationshipSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $category_attributes = [
            427 => [
                [1, false],
                [2, false],
                [3, true],
                [4, false],
                [5, true],
                [6, false],
                [7, true],
                [8, false],
                [9, false],
                [10, true],
                [11, true],
                [12, true],
                [13, false],
                [14, true],
                [15, false],
                [16, false],
                [17, false],
                [18, false],
                [19, false],
                [20, false],
                [21, true],
                [22, false],
                [23, false],
                [24, false],
                [25, false],
                [26, true],
                [27, false],
                [28, false],
                [29, false],
                [30, false],
                [31, true],
                [32, false],
                [33, false],
                [34, true],
                [35, true],
                [36, false],
                [37, false],
                [38, false],
            ]
        ];

        foreach ($category_attributes as $category_id => $attributes) {
            foreach ($attributes as $attirbute) {
                CategoryAttributeRelationship::create([
                    'category_id' => $category_id,
                    'attribute_id' => $attirbute[0],
                    'is_required' => $attirbute[1],
                ]);
            }

        }
    }
}
