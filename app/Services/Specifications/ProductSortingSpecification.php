<?php 

namespace App\Services\Specifications;

use Illuminate\Database\Eloquent\Builder;

interface ProductSortingSpecification
{
    public function apply(Builder $query): Builder;
}