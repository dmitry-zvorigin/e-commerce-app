<?php

namespace App\Services;

use App\Services\Sorting\AverageRatingDescendingSorting;
use App\Services\Sorting\DateAscendingSorting;
use App\Services\Sorting\DateDescendingSorting;
use App\Services\Sorting\PriceAscendingSorting;
use App\Services\Sorting\PriceDescendingSorting;
use Illuminate\Database\Eloquent\Builder;

class ProductSortingService
{
    protected Builder $query;
    
    public function __construct(Builder $query)
    {
        $this->query = $query;
    }

    public function applySorting(?int $sortingOption = null, $defaultSort = 1) : Builder
    {
        $sortingOption ??= $defaultSort;

        $specifications = $this->createSpecifications($sortingOption);

        return $specifications->apply($this->query);

    }

    protected function createSpecifications(int $sortingOption)
    {
        return match ($sortingOption) {
            1 => new PriceAscendingSorting(),
            2 => new PriceDescendingSorting(),
            3 => new DateAscendingSorting(),
            4 => new DateDescendingSorting(),
            6 => new AverageRatingDescendingSorting(),
            default => new PriceAscendingSorting(),
        };
    }
}