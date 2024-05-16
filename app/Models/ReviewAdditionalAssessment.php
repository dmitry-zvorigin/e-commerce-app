<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ReviewAdditionalAssessment extends Model
{
    use HasFactory;

    public function options() : HasMany
    {
        return $this->hasMany(ReviewAdditionalAssessmentOption::class, 'option_id');
    }

    public function ratings() : BelongsToMany
    {
        return $this->belongsToMany(Review::class, 'review_additional_assessment_ratings', 'option_id', 'review_id')
            ->withPivot('rating_value', 'order');
    }
}
