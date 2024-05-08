<?php

namespace Database\Factories;

use App\Models\ReviewUsageTerms;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'usage_terms_id' => rand(0, 10) < 5 ? null : ReviewUsageTerms::inRandomOrder()->value('id'),
            'real_buy' => $this->faker->boolean(),
            'dignites' => $this->faker->optional()->paragraph,
            'disadvantages' => $this->faker->optional()->paragraph,
            'comment' => $this->faker->optional()->paragraph,
        ];
    }
}
