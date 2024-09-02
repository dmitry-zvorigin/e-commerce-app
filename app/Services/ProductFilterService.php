<?php

namespace App\Services;

use App\Services\Filters\AttributeFilter;
use App\Services\Filters\AttributeRangeFilter;
use App\Services\Filters\PriceRangeFilter;
use Illuminate\Database\Eloquent\Builder;

class ProductFilterService
{
    protected Builder $query;

    public function __construct(Builder $query)
    {
        $this->query = $query;
    }

    public function applyFilters(array $filtersQuery) : Builder
    {

        $specifications = $this->createSpecifications($filtersQuery);

        foreach ($specifications as $specification) {
            $this->query = $specification->apply($this->query);
        }

        return $this->query;
    }

    protected function createSpecifications(array $filtersQuery) : array
    {
        $specifications = [];
        
        foreach ($filtersQuery['checkbox'] as $attributeId => $values) {
            $specifications[] = new AttributeFilter($attributeId, $values);
        }

        if (!empty($filtersQuery['price'])) {
            $specifications[] = new PriceRangeFilter($filtersQuery['price']['min'], $filtersQuery['price']['max']);
        }

        if (!empty($filtersQuery['range'])) {
            foreach ($filtersQuery['range'] as $attributeId => $range) {
                $specifications[] = new AttributeRangeFilter($attributeId, $range['min'], $range['max']);
            }
        }

        return $specifications;
    }
}