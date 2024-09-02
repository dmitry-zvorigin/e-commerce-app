<?php 

namespace App\Services\Filters;

use App\Contracts\ProductFilterStrategy;

class PriceFilterStrategy implements ProductFilterStrategy
{
    public function apply($productsQuery, $attributeId, $filterValues)
    {
        $minPrice = $filterValues[0];
        $maxPrice = $filterValues[1]; 

        $productsQuery->whereBetween('price', [$minPrice, $maxPrice]);
        
        return $productsQuery;
    }
}