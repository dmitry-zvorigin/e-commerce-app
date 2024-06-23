<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Review extends Model
{
    use HasFactory;

    // protected static function boot()
    // {
    //     parent::boot();

    //     static::addGlobalScope('commentCount', function ($builder) {
    //         $builder->withCount('comments');
    //     });
    // }

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

    public function additionalAssessments() : HasMany
    {
        return $this->hasMany(ReviewAdditionalAssessmentRating::class, 'review_id');
    }

    public function comments() : HasMany
    {
        return $this->hasMany(ReviewComment::class)->whereNull('parent_id');
    }

    public function scopeFilterRealBuyer(Builder $query, $filterRealBuyer)
    {
        if ($filterRealBuyer) {
            return $query->where('real_buy', true);
        }
        return $query;
    }

    public function scopeFilterWithPhoto(Builder $query, $filterWithPhoto)
    {
        if ($filterWithPhoto) {
            return $query->whereHas('images');
        }
        return $query;
    }

    public function scopeFilterRatings(Builder $query, $filterRating) 
    {
        if (!empty($filterRating)) {
            $filterRating = explode(',', $filterRating);
            return $query->whereHas('rating', function ($query) use ($filterRating) {
                $query->whereIn('rating_value', $filterRating);
            });
        }

        return $query;
    }

    public function scopeSearch(Builder $query, $searchQuery) 
    {
        if (!empty($searchQuery)) {
            return $query->where(function ($query) use ($searchQuery) {
                $query->where('dignites', 'LIKE', '%' . $searchQuery . '%')
                    ->orWhere('disadvantages', 'LIKE', '%' . $searchQuery . '%')
                    ->orWhere('comment', 'LIKE', '%' . $searchQuery . '%');
            });
        }

        return $query;
    }

    public function scopeSortOrder(Builder $query, $order) 
    {
        switch ($order) {
            case '2':
                return $query->leftJoin('review_ratings', 'reviews.id', '=', 'review_ratings.review_id')
                             ->select('reviews.*', 'review_ratings.rating_value')
                             ->orderBy('review_ratings.rating_value', 'desc');
            case '3':
                return $query->leftJoin('review_reactions', 'reviews.id', '=', 'review_reactions.review_id')
                             ->selectRaw('reviews.*, SUM(CASE WHEN review_reactions.estimation = true THEN 1 ELSE -1 END) as popularity')
                             ->groupBy('reviews.id')
                             ->orderBy('popularity', 'desc');
            case '4':
                return $query->orderBy('updated_at', 'desc');
            default:
                return $query->orderBy('created_at', 'desc');
        }
    }
}
