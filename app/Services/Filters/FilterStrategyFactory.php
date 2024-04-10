<?php 

namespace App\Services\Filters;

use App\Services\Filters\AttributeFilterStrategy;
use App\Services\Filters\PriceFilterStrategy;
use App\Services\Filters\RangeFilterStrategy;

class FilterStrategyFactory
{
    public function make($type)
    {
        switch ($type) {
            case 'price':
                return app(PriceFilterStrategy::class);
            case 'range':
                return app(RangeFilterStrategy::class);
            case 'checkbox':
                return app(AttributeFilterStrategy::class);
            default:
                return null;
        }
    }
}