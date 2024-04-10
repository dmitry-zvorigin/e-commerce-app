<?php 

namespace App\Services\Sorting;

use Illuminate\Support\Facades\DB;

class ProductSorterService
{
    public function sortingProducts($productsQuery, $filterValues)
    {
        if (isset($filterValues['order'])) {
            $sortingOption = $filterValues['order'][0];
            // Применяем сортировку в зависимости от значения ключа 'sorting'
            switch ($sortingOption) {
                case 1:
                    $productsQuery->orderBy('price');
                    break;
                case 2:
                    $productsQuery->orderByDesc('price');
                    break;
                case 3:
                    $productsQuery->orderBy('products.created_at');
                    break;
                case 4:
                    $productsQuery->orderByDesc('products.created_at');
                    break;
                case 6: 
                    $productsQuery->join('ratings', 'products.id', '=', 'ratings.product_id')
                        ->select('products.*', DB::raw('AVG(ratings.rating_value) as average_rating'))
                        ->groupBy('products.id')
                        ->orderByDesc('average_rating');
                    break;
                default:
                    // Если значение 'sorting' не соответствует ни одному из ожидаемых, ничего не делаем
                    break;
            }
        } else {
            $productsQuery->orderBy('price');
        }

        return $productsQuery;
    }
}