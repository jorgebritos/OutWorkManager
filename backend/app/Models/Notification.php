<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'content',
        'enterprise_id',
        'job_id',
    ];

    public function job() {
        return $this->belongsTo(Job::class);
    }
}
