<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Review;
use App\Models\ReviewAdditionalAssessmentOption;
use App\Models\ReviewAdditionalAssessmentRating;
use App\Models\ReviewImage;
use App\Models\ReviewRating;
use App\Models\ReviewUsageTerms;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = Product::all();
        $user = User::factory()->create();


        foreach ($products as $product) {
           
            $reviews = Review::factory()->count(10)->create(
                [
                    'product_id' => $product->id,
                    'user_id' => $user->id,
                ]
            );

            foreach ($reviews as $review) {

                $categoryOptions = ReviewAdditionalAssessmentOption::where('category_id', $product->category_id)->get();
                $options = $categoryOptions->shuffle();
                $random = mt_rand(-1, $categoryOptions->count() - 1);
                $options = $options->slice(0, $random + 1);
                
                if ($options) {
                    foreach ($options as $option) {
                        ReviewAdditionalAssessmentRating::factory()->create([
                            'review_id' => $review->id,
                            'option_id' => $option->id,
                        ]);
                    }
                }

                $indexImg = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                shuffle($indexImg);
                $random = rand(0, 10);

                for ($i = 0; $i < $random; $i++) {
                    ReviewImage::create([
                        'review_id' => $review->id,
                        'image_url_original' => $indexImg[$i] . '(1).png',
                        'image_url_thumbnail' =>  $indexImg[$i] . '.png',
                        'image_url_detail' =>  $indexImg[$i] . '(1).png',
                    ]);
                }

                
                ReviewRating::factory()->create([
                    'product_id' => $product->id,
                    'review_id' => $review->id,
                ]);


            }
        }
    }
}
