<?php 

namespace App\Services\Filters;

use App\Services\Specifications\ProductFilterSpecification;
use Illuminate\Database\Eloquent\Builder;

class ProductIdFilter implements ProductFilterSpecification
{
    protected array $productIds;

    public function __construct(array $productIds)
    {
        $this->productIds = $productIds;
    }

    public function apply(Builder $query): Builder
    {
        return $query->whereIn('id', $this->productIds);
    }
}