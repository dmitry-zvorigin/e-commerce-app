<?php

namespace Database\Seeders;

use App\Models\Review;
use App\Models\ReviewReaction;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReviewReactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::factory()->count(10)->create();

        $reviews = Review::all();

        foreach ($reviews as $review) {
            foreach ($users as $user) {
                $reactions = [null, true, false];
                $randomIndex = rand(0, count($reactions) - 1);
                if(!is_null($reactions[$randomIndex])) {
                    ReviewReaction::create([
                            'user_id' => $user->id,
                            'review_id' => $review->id,
                            'estimation' => $reactions[$randomIndex],
                    ]);
                }
            }
        }
    }
}
