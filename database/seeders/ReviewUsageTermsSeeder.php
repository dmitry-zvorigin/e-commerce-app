<?php

namespace Database\Seeders;

use App\Models\ReviewUsageTerms;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReviewUsageTermsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $terms = [
            'Менее месяца',
            'Не более года',
            'Более года',
        ];

        foreach ($terms as $term) {
            ReviewUsageTerms::create([
                'title' => $term
            ]);
        }
    }
}
