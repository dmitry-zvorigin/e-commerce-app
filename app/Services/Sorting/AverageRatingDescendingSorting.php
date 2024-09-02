<?php

namespace App\Services\Sorting;

use App\Services\Specifications\ProductSortingSpecification;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class AverageRatingDescendingSorting implements ProductSortingSpecification
{
    public function apply(Builder $query): Builder
    {
        return $query->join('review_ratings', 'products.id', '=', 'review_ratings.product_id')
            ->select('products.*', DB::raw('AVG(review_ratings.rating_value) as average_rating'))
            ->groupBy('products.id')
            ->orderByDesc('average_rating');
    }
}