<?php 

namespace App\Services\Filters;

use App\Services\Specifications\ProductFilterSpecification;
use Illuminate\Database\Eloquent\Builder;

class AttributeFilter implements ProductFilterSpecification
{
    protected int $attributeId;
    protected array $filterValues;

    public function __construct(int $attributeId, array $filterValues)
    {
        $this->attributeId = $attributeId;
        $this->filterValues = $filterValues;
    }

    public function apply(Builder $query): Builder
    {
        $alias = 'pc_' . $this->attributeId;
            return $query->join('product_characteristics as ' . $alias, function ($join) use ($alias) {
                $join->on('products.id', '=', $alias . '.product_id')
                    ->where($alias . '.attribute_id', '=', $this->attributeId);
            })
            ->whereIn($alias . '.value_id', $this->filterValues);

    }
}