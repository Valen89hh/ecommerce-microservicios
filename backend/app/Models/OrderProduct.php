<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderProduct extends Model
{
    use HasFactory;

    protected $table = 'order_product';

    protected $fillable = [
        'order_id',
        'product_id',
        'product_snapshot_name',
        'quantity',
        'unit_price',
        'total_price',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    // Relación opcional al producto original (puede estar eliminado)
    public function product()
    {
        return $this->belongsTo(Product::class)->withTrashed(); // En caso implementes softDeletes
    }
}
