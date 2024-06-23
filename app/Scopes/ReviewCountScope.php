<?php 

namespace App\Scopes;

use App\Models\Review;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class ReviewCountScope implements Scope
{   
    public function apply(Builder $builder, Model $model)
    {
        $builder->addSelect([
            'reviews_count' => function ($query) {
                $query->selectRaw('count(*)')
                    ->from('reviews')
                    ->whereColumn('reviews.product_id', 'products.id');
            }
        ]);
    }
    
}