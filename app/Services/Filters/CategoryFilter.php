<?php 

namespace App\Services\Filters;

use App\Services\Specifications\ProductFilterSpecification;
use Illuminate\Database\Eloquent\Builder;

class CategoryFilter implements ProductFilterSpecification
{
    protected array $categoryIds;

    public function __construct(array $categoryIds)
    {
        $this->categoryIds = $categoryIds;
    }

    public function apply(Builder $query): Builder
    {
        return $query->whereIn('category_id', $this->categoryIds);
    }
}