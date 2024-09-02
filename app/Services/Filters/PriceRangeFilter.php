<?php 

namespace App\Services\Filters;

use App\Services\Specifications\ProductFilterSpecification;
use Illuminate\Database\Eloquent\Builder;

class PriceRangeFilter implements ProductFilterSpecification
{
    protected float $minPrice;
    protected float $maxPrice;

    public function __construct(float $minPrice, float $maxPrice)
    {
        $this->minPrice = $minPrice;
        $this->maxPrice = $maxPrice;
    }

    public function apply(Builder $query): Builder
    {
        return $query->whereBetween('price', [$this->minPrice, $this->maxPrice]);
    }
}