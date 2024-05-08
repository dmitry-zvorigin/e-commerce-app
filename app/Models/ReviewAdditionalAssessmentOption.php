<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReviewAdditionalAssessmentOption extends Model
{
    use HasFactory;

    public function assessment() : BelongsTo
    {
        return $this->belongsTo(ReviewAdditionalAssessment::class, 'additional_assessment_id');
    }
}
