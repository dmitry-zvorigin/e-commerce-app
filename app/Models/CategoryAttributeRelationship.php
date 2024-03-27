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
        return $this->belongsTo(ProductAttribute::class)->orderBy('slug');
    }

    public function values() 
    {
        return $this->hasMany(AttributeValue::class, 'attribute_id', 'attribute_id')->orderBy('value_string')->orderBy('value_int');;
    }

    public function scopeOrderByValues($query)
    {
        return $query->with(['values' => function ($query) {
            $query->orderBy('value_string');
        }]);
    }


    // public function minValue()
    // {
    //     $values = $this->values()->pluck('name');
    //     $intValues = $values->map(function ($value) {
    //         return (float) $value;
    //     });

    //     return $intValues->min();
    //     // return $this->values()->min('name');
    // }

    // public function maxValue()
    // {
    //     $values = $this->values()->pluck('name');
    //     $intValues = $values->map(function ($value) {
    //         return (float) $value;
    //     });

    //     return $intValues->max();

    //     // return $this->values()->max('name');
    // }

    public function findMinMaxValues()
    {
        $values = $this->values()->pluck('value_int');
        $intValues = $values->map(function ($value) {
            return (float) $value;
        });

        $this->setAttribute('min_value', $intValues->min());
        $this->setAttribute('max_value', $intValues->max());
    }

    public function findMinMaxPrice()
    {
        $minPrice = Product::min('price');
        $maxPrice = Product::max('price');

        $this->setAttribute('min_value', $minPrice);
        $this->setAttribute('max_value', $maxPrice);
    }

    public function getNameAttribute()
    {
        // Добавляю поле name для общего доступа, а не через поля value_string и value_int 
        // TODO можно добавить еще + unit_type (100 + Ггц)
        return $this->values->map(function ($value) {
            $name = !is_null($value->value_int) ? $value->value_int : $value->value_string;
            $value->name = $name;
            return $value;
        });
    }
    
}
