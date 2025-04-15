<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AuthProvider extends Model
{
    protected $fillable = [
        'id',
        'provider',
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
