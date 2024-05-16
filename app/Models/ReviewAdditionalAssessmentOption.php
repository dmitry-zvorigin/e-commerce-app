<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ReviewAdditionalAssessmentOption extends Model
{
    use HasFactory;

    public function assessment() : BelongsTo
    {
        return $this->belongsTo(ReviewAdditionalAssessment::class, 'option_id');
    }

    public function ratings() : HasMany
    {
        return $this->hasMany(ReviewAdditionalAssessmentRating::class, 'option_id');
    }
}
