<?php 

namespace App\Services\Filters;

use App\Services\Specifications\ProductFilterSpecification;
use Illuminate\Database\Eloquent\Builder;

class AttributeRangeFilter implements ProductFilterSpecification
{
    protected int $attributeId;
    protected float $minValue;
    protected float $maxValue;

    public function __construct(int $attributeId, float $minValue, float $maxValue)
    {
        $this->attributeId = $attributeId;
        $this->minValue = $minValue;
        $this->maxValue = $maxValue;
    }

    public function apply(Builder $query): Builder
    {
        $alias = 'pc_' . $this->attributeId;
        $avAlias = 'av' . $this->attributeId;

        return $query->join('product_characteristics as ' . $alias, function ($join) use ($alias, $avAlias) {
                $join->on('products.id', '=', $alias . '.product_id')
                     ->join('attribute_values as ' . $avAlias, $alias . '.value_id', '=', $avAlias . '.id')
                     ->where($avAlias . '.attribute_id', '=', $this->attributeId)
                     ->whereBetween($avAlias . '.value_int', [$this->minValue, $this->maxValue]);
        });
    }
}