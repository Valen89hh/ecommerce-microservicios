<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id', 'certifying_body', 'certificate_number', 'type', 'issue_date', 'expiration_date'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function files()
    {
        return $this->hasMany(CertificateFile::class);
    }
}
