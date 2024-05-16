<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReviewAdditionalAssessmentRating extends Model
{
    use HasFactory;

    public function review() : BelongsTo
    {
        return $this->belongsTo(Review::class, 'review_id');
    }

    public function option() : BelongsTo
    {
        return $this->belongsTo(ReviewAdditionalAssessmentOption::class, 'option_id');
    }
}
