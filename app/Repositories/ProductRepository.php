<?php 

namespace App\Repositories;

use App\Models\Category;
use App\Models\Product;

class ProductRepository
{
    public function getProductByCategory(Category $category)
    {
        return Product::where('category_id', $category->id);
    }
    
}