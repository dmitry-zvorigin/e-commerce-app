<?php

namespace App\Models;

use App\Scopes\ReviewCountScope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Product extends Model
{
    use HasFactory, HasSlug;

    // protected static function booted()
    // {
    //     static::addGlobalScope(new ReviewCountScope);
    // }

    public function category() : BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function ratings() : HasMany
    {
        return $this->hasMany(ReviewRating::class);
    }

    public function characteristics() : HasMany
    {
        return $this->hasMany(ProductCharacteristic::class);
    }

    public function images() : HasMany
    {
        return $this->hasMany(ProductImage::class);
    }

    public function getSlugOptions() : SlugOptions
    {
        // Добавление slug
        return SlugOptions::create()->generateSlugsFrom('name')->saveSlugsTo('slug');
    }

    public function reviews() : HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function popularReview()
    {
        // return $this->reviews()
        //     ->with('rating', 'options', 'images', 'user', 'usageTerm', 'likes', 'dislikes')
        //     ->withCount([
        //         'likes as likes_count',
        //         'dislikes as dislikes_count',
        //     ])
        //     ->get()
        //     ->sortByDesc(function ($review) {
        //         return $review->likes_count - $review->dislikes_count;
        //     })
        //     ->first();

            $reviews = $this->reviews()
                ->withCount(['likes as likes_count', 'dislikes as dislikes_count'])
                ->get();

            $popularReview = $reviews->sortByDesc(function ($review) {
                return $review->likes_count - $review->dislikes_count;
            })->first();

            if ($popularReview) {
                $popularReview->load('rating', 'options', 'images', 'user', 'usageTerm', 'likes', 'dislikes');
            }

            return $popularReview;
    }

    public function scopeWithAllReviews(Builder $query)
    {
        return $query->with([
            'images', 
            'ratings', 
            'reviews.additionalAssessments.option',
        ]);
    }

    public function getAllReviewImages()
    {
        return $this->reviews()->with('images')->get()->flatMap(function ($review) {
            return $review->images;
        });
    }

    // public function scopeWithAllReviewsImages(Builder $query)
    // {
    //     return $query->with([
    //         'reviews.images',
    //     ]);
    // }

    public function scopeWithAllReviewsAndImages(Builder $query)
    {
        return $query->with([
            'images', 
            'reviews.images'
        ]);
    }

    public function scopeWithAggregateData(Builder $query)
    {
        return $query->withCount('ratings')
            ->withAvg('ratings', 'rating_value');
    }



}
