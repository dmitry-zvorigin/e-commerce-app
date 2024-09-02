<?php 

namespace App\Services\Filters;
use App\Contracts\ProductFilterStrategy;

class RangeFilterStrategy implements ProductFilterStrategy
{
    public function apply($productsQuery, $attributeId, $filterValues)
    {
        $minValue = $filterValues[0];
        $maxValue = $filterValues[1];

        $productsQuery->join('product_characteristics as pc_' . $attributeId, function ($join) use ($attributeId, $minValue, $maxValue) {
            $join->on('products.id', '=', 'pc_' . $attributeId . '.product_id')
                ->join('attribute_values as av' . $attributeId, 'pc_' . $attributeId.'.value_id', '=', 'av' . $attributeId . '.id')
                ->where('av' . $attributeId . '.attribute_id', '=', $attributeId)
                ->whereBetween('av' . $attributeId . '.value_int', [$minValue, $maxValue]);
        });
        return $productsQuery;        
    }
}