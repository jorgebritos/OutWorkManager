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
        'date',
        'in_time',
        'in_time_confirm',
        'out_time',
        'out_time_confirm',
        'is_check',
        'is_check_enterprise',
        "enterprise_id"
    ];

    public function documents()
    {
        return $this->hasMany(Document::class);
    }

    public function enterprise()
    {
        return $this->belongsTo(Enterprise::class);
    }
}
