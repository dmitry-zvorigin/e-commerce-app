<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class ProductAttribute extends Model
{
    use HasFactory, HasSlug;

    public function group() : BelongsTo
    {
        return $this->belongsTo(AttributeGroup::class);
    }
    
    public function productCharacteristics() : HasMany
    {
        return $this->hasMany(ProductCharacteristic::class);
    }
    
    public function values() : HasMany
    {
        return $this->hasMany(AttributeValue::class, 'attribute_id', 'id');
    }
    
    public function getSlugOptions() : SlugOptions
    {
        // Добавление slug
        return SlugOptions::create()->generateSlugsFrom('name')->saveSlugsTo('slug');
    }

}
