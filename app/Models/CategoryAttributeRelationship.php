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

    public function findMinMaxValues($categoryId)
    {
        $intValues = $this->values()
            ->whereHas('productCharacteristics.product', function ($query) use ($categoryId) {
                $query->where('category_id', $categoryId);
            })
            ->pluck('value_int')
            ->map(function ($value) {
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

        $this->setAttribute('min_value', $prices->min_price);
        $this->setAttribute('max_value', $prices->max_price);
    }    
}
