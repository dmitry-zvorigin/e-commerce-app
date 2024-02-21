<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CategoryImage extends Model
{
    use HasFactory;

    protected $fillable = ['category_id', 'image_path'];

    public function category() : BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function getImageUrlAttribute()
    {
        return asset('category_images/' . $this->image_path);
    }
}
