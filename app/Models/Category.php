<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Route;
use Kalnoy\Nestedset\NodeTrait;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Category extends Model
{
    use HasFactory, NodeTrait, HasSlug;

    protected $routeKeyName = 'slug';
    protected $fillable = ['name'];

    public function children() : HasMany
    {
        // Отношение к детям категории
        return $this->hasMany(Category::class, 'parent_id');
    }

    public function images() : HasMany
    {
        // Отношение к изображением
        return $this->hasMany(CategoryImage::class);
    }

    public function products() : HasMany
    {
        // Отношения к продуктам
        return $this->hasMany(Product::class);
    }

    public function getShowUrlAttribute()
    {
        // Генерация поля url_show
        // Вид http://localhost/catalog/osnovnye-komplektuiushhie-dlia-pk
        return Route::has('categories') ? route('categories', $this->slug) : null;
    }

    public function getSlugOptions() : SlugOptions
    {
        // Добавление slug
        return SlugOptions::create()->generateSlugsFrom('name')->saveSlugsTo('slug');
    }
}
