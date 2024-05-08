<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Review extends Model
{
    use HasFactory;

    public function rating() : HasOne
    {
        return $this->hasOne(ReviewRating::class);
    }

    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function usageTerm() : BelongsTo
    {
        return $this->belongsTo(ReviewUsageTerms::class, 'usage_terms_id', 'id');
    }

    public function images() : HasMany
    {
        return $this->hasMany(ReviewImage::class);
    }

    public function reactions() : HasMany
    {
        return $this->hasMany(ReviewReaction::class);
    }

    public function likes() : HasMany
    {
        return $this->hasMany(ReviewReaction::class)->where('estimation', true);
    }

    public function dislikes() : HasMany
    {
        return $this->hasMany(ReviewReaction::class)->where('estimation', false);
    }


    public function getCreatedAtAttribute($value)
    {
        return date('d.m.Y', strtotime($value));
    }

    public function options() : BelongsToMany
    {
        return 
            $this->belongsToMany(ReviewAdditionalAssessment::class, 
                'review_additional_assessment_ratings', 'review_id', 
                'option_id'
                )
        ->withPivot('rating_value', 'order');
    }
}
