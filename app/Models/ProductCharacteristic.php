<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductCharacteristic extends Model
{
    use HasFactory;

    public function attribute() : BelongsTo
    {
        return $this->belongsTo(ProductAttribute::class);
    }

    public function value() : BelongsTo
    {
        return $this->belongsTo(AttributeValue::class);
    }

    public function product() : BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public static function getVisibleCharacteristics(int $productId, int $categoryId)
    {
        return self::where('product_id', $productId)
            ->where('is_visible', true)
            ->join('product_attributes', 'product_characteristics.attribute_id', '=', 'product_attributes.id')
            ->join('attribute_groups', 'product_attributes.group_id', '=', 'attribute_groups.id')
            ->join('attribute_group_orders', function($join) use ($categoryId) {
                $join->on('product_attributes.group_id', '=', 'attribute_group_orders.group_id')
                    ->where('attribute_group_orders.category_id', '=', $categoryId);
            })
            ->with(['attribute', 'value', 'attribute.group.order'])
            ->orderBy('product_characteristics.order')
            ->get()
            // Сортировка групп и характеристик
            ->groupBy('attribute.group.name')
            ->sortBy(function ($group) {
                return $group->first()->attribute->group->order;
            });
    }
}
