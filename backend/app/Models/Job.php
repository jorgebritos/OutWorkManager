<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'description',
        'in_datetime',
        'in_datetime_confirm',
        'out_datetime',
        'out_datetime_confirm',
        'is_check',
        'is_check_enterprise',
        "enterprise_id"
    ];

    public function documents()
    {
        return $this->hasMany(Document::class);
    }
    
    public function notification()
    {
        return $this->hasOne(Job::class);
    }

    public function enterprise()
    {
        return $this->belongsTo(Enterprise::class);
    }
}
