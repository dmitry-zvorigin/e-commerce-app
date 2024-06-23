<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
use Illuminate\Support\Carbon;

class ReviewComment extends Model
{
    use HasFactory;

    // protected static function boot()
    // {
    //     parent::boot();

    //     static::addGlobalScope('commentCount', function ($builder) {
    //         $builder->withCount('review');
    //     });
    // }

    public function review() : BelongsTo
    {
        return $this->belongsTo(Review::class);
    }

    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function userReply() : HasOneThrough
    {
        // return $this->belongsTo(User::class, 'reply_id', 'id');
        
        return $this->hasOneThrough(User::class, ReviewComment::class,  'id', 'id', 'reply_id', 'user_id');
    }

    public function parent() : BelongsTo
    {
        return $this->belongsTo(ReviewComment::class, 'parent_id');
    }

    public function children() : HasMany
    {
        return $this->hasMany(ReviewComment::class, 'parent_id');
    }

    public function replies() : HasMany
    {
        // return $this->hasMany(ReviewComment::class, 'parent_id')->with('replies');
        return $this->hasMany(ReviewComment::class, 'parent_id');
    }


    public function allReplies()
    {
        return $this->replies()->with('allReplies');
    }

    
    // Accessor to format created_at attribute
    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => Carbon::parse($value)->translatedFormat('j F Y г. H:i'),
        );
    }

    // Accessor to format updated_at attribute
    protected function updatedAt() : Attribute
    {
        return Attribute::make(
            get: fn (string $value) => Carbon::parse($value)->translatedFormat('j F Y г. H:i'),
        );
    }

}
