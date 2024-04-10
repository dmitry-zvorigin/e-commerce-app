<?php 

namespace App\Services\Filters;

use App\Contracts\ProductFilterStrategy;

class AttributeFilterStrategy implements ProductFilterStrategy
{
    public function apply($productsQuery, $attributeId, $filterValues)
    {
        $productsQuery->join('product_characteristics as pc_' . $attributeId, function ($join) use ($attributeId) {
                $join->on('products.id', '=', 'pc_' . $attributeId . '.product_id')
                    ->where('pc_' . $attributeId . '.attribute_id', '=', $attributeId);
            })
            ->whereIn('pc_' . $attributeId . '.value_id', $filterValues);

        return $productsQuery;
    }
}