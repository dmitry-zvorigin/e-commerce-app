<?php 

namespace App\Contracts;

interface ProductFilterStrategy
{
    public function apply($productsQuery, $attributeId, $filterValues);
}