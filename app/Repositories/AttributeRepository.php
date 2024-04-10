<?php 

namespace App\Repositories;

use App\Models\ProductAttribute;

class AttributeRepository
{
    public function getAttributeIdsBySlugs(array $slugs)
    {
        // Получить все атрибуты по ключам из массива
        return ProductAttribute::whereIn('slug', $slugs)->pluck('id', 'slug')->toArray();
    }
}