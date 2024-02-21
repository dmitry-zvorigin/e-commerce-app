<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function catalog() 
    {
        $categories = Category::whereNull('parent_id')->with('children', 'images')->get();
        
        $categories->each(function ($category) {
            $category->append('show_url');
    
            $category->children->each(function ($child) {
                $child->append('show_url');
            });
        });

        return Inertia::render('Catalog', ['categories' => $categories]);
    }

    public function categories($category)
    {
        // $categories = Category::with(['children', 'children.images'])->find($category);

        $categories = Category::where('slug', $category)->with(['children', 'children.images'])->first();
        $categories->children->each(function ($category) {
            $category->append('show_url');
        });

        return Inertia::render('Categories', ['categories' => $categories]);

    }
}
