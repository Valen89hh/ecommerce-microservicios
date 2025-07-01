<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CertificateFile extends Model
{
    use HasFactory;

    protected $fillable = [
        'certificate_id', 'file_path', 'file_url', 'file_type'
    ];

    public function certificate()
    {
        return $this->belongsTo(Certificate::class);
    }
}
