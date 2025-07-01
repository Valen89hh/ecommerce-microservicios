<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'recipient_name',
        'recipient_phone',
        'recipient_email',
        'shipping_address',
        'shipping_city',
        'shipping_region',
        'shipping_zip',
        'shipping_country',
        'payment_method',
        'is_paid',
        'total_amount',
        'status',
    ];

    public function products()
    {
        return $this->hasMany(OrderProduct::class);
    }
}
