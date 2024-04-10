<?php

namespace App\Models;

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

    public function category() : BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function ratings() : HasMany
    {
        return $this->hasMany(Rating::class);
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

}
