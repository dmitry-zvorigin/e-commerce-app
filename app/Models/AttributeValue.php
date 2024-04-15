<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class AttributeValue extends Model
{
    use HasFactory;
    protected $appends = ['name'];

    public function attribute() : BelongsTo
    {
        return $this->belongsTo(ProductAttribute::class);
    }

    public function productCharacteristics() : HasMany
    {
        return $this->hasMany(ProductCharacteristic::class, 'value_id');
    }

    public function products() : BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'product_characteristics', 'value_id', 'product_id');
    }

    public function getNameAttribute()
    {
        return $this->value_string ?? $this->value_int;
    }
}
