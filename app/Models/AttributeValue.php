<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class AttributeValue extends Model
{
    use HasFactory;

    public function attribute() : BelongsTo
    {
        return $this->belongsTo(ProductAttribute::class);
    }

    public function productCharacteristics() : HasMany
    {
        return $this->hasMany(ProductCharacteristic::class);
    }

    // public function getSlugOptions() : SlugOptions
    // {
    //     // Добавление slug
    //     return SlugOptions::create()->generateSlugsFrom('name')->saveSlugsTo('slug');
    // }


}
