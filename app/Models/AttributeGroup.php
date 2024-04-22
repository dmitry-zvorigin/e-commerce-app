<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class AttributeGroup extends Model
{
    use HasFactory, HasSlug;

    public function getSlugOptions() : SlugOptions
    {
        // Добавление slug
        return SlugOptions::create()->generateSlugsFrom('name')->saveSlugsTo('slug');
    }

    public function order() : HasOne
    {
        return $this->hasOne(AttributeGroupOrder::class, 'group_id');
    }
}
