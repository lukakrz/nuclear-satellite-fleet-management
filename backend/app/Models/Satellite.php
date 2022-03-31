<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Satellite extends Model
{
    use HasFactory;

    protected $fillable = [
        'side_number',
        'manufacturer',
        'model',
        'current_version',
        'year',
        'lanuched_at',
        'ammount_ammo',
        'orbit_altitude',
        'is_ai',
        'created_at',
        'updated_at',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
