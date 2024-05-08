<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\ReviewAdditionalAssessment;
use App\Models\ReviewAdditionalAssessmentOption;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReviewAdditionalAssessmentOptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            'Процессоры' => [
                'Результат использования',
                'Тепловыделение',
                'Производительность',
                'Энергопотребление',
            ]
        ];


        foreach ($data as $category => $options) {
            $category_id = Category::where('name', $category)->value('id');
            foreach ($options as $option) {
                $additionalAssessment = ReviewAdditionalAssessment::firstOrCreate([
                    'title' => $option,
                ]);

                ReviewAdditionalAssessmentOption::create([
                    'category_id' => $category_id,
                    'option_id' => $additionalAssessment->id,
                ]);
            }
        }
    }
}
