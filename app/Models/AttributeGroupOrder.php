<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AttributeGroupOrder extends Model
{
    use HasFactory;

    public function group() : BelongsTo
    {
        return $this->belongsTo(AttributeGroup::class);
    }
}
