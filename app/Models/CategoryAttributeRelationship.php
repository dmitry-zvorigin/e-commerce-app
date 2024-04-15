<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CategoryAttributeRelationship extends Model
{
    use HasFactory;

    public function category() : BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function attribute() : BelongsTo
    {
        return $this->belongsTo(ProductAttribute::class);
    }

    public function values() : HasMany
    {
        return $this->hasMany(AttributeValue::class, 'attribute_id', 'attribute_id');
    }

    public function findMinMaxValues()
    {
        $intValues = $this->values()->pluck('value_int')->map(function ($value) {
            return (float) $value;
        });
    
        $this->setAttribute('min_value', $intValues->min());
        $this->setAttribute('max_value', $intValues->max());
    }

    public function findMinMaxPrice($categoryId)
    {
        $prices = Product::where('category_id', $categoryId)
            ->selectRaw('MIN(price) as min_price, MAX(price) as max_price')
            ->first();

        $minPrice = $prices->min_price;
        $maxPrice = $prices->max_price;

        $this->setAttribute('min_value', $minPrice);
        $this->setAttribute('max_value', $maxPrice);
    }    
}
