<?php

namespace App\Models;

use App\Scopes\ReviewCountScope;
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
        return $this->reviews()
            ->withCount([
                'likes as likes_count',
                'dislikes as dislikes_count',
            ])
            ->get()
            ->sortByDesc(function ($review) {
                return $review->likes_count - $review->dislikes_count;
            })
            ->first();
    }

}
