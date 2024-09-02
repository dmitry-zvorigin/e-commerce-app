<?php 

namespace App\Services\Sorting;

use App\Services\Specifications\ProductSortingSpecification;
use Illuminate\Database\Eloquent\Builder;

class DateAscendingSorting implements ProductSortingSpecification
{
    public function apply(Builder $query): Builder
    {
        return $query->orderBy('products.created_at', 'asc');
    }
}