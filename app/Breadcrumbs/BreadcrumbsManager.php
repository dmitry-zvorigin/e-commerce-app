<?php 

namespace App\Breadcrumbs;

use App\Models\Category;
use Diglactic\Breadcrumbs\Breadcrumbs;

class BreadcrumbsManager
{
    public static function registerCatalog()
    {
        Breadcrumbs::for('catalog', function($trail) {
            $trail->push('Главная', route('catalog'));
        });
    }

    public static function registerCatagories()
    {
        Breadcrumbs::for('categories', function($trail, $categories) {
            $trail->parent('catalog');
            foreach ($categories as $category) {
                $trail->push($category->name, $category->show_url);
            }
        });
    }

    public static function registerProduct()
    {
        Breadcrumbs::for('product', function($trail, $product) {
            // Предполагается, что у продукта есть свойство "category",
            // которое хранит связанную категорию продукта
            $category = $product->category;
            $result = Category::ancestorsAndSelf($category->id);
    
            // Генерация хлебных крошек для категории продукта
            Breadcrumbs::generate('categories', $result, $trail);
    
            // Добавление названия продукта в хлебные крошки
            $trail->push($product->name, route('product.show', $product->slug));
        });
    }

    public static function registerProductReviews()
    {
        Breadcrumbs::for('productReviews', function($trail, $product) {
            Breadcrumbs::generate('product', $product, $trail);

            $trail->push('Отзывы');
        });
    }

    public static function registerProductCharacteristics()
    {
        Breadcrumbs::for('productCharacteristics', function($trail, $product) {
            Breadcrumbs::generate('product', $product, $trail);

            $trail->push('Характеристики');
        });
    }
}