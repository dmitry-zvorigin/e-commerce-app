<?php 

namespace App\Services\Specifications;

use Illuminate\Database\Eloquent\Builder;

interface ProductFilterSpecification
{
    public function apply(Builder $query) : Builder;

}