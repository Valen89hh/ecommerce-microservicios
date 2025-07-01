<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'category_id', 'employee_id', 'name', 'short_description', 'full_description',
        'cost_price', 'sale_price', 'discounted_price', 'stock', 'maximun_stock',
        'minimun_stock', 'unit_amount', 'available_units', 'unit_measurement',
        'weight', 'length', 'width', 'height', 'is_perceptible', 'expiration_date',
        'storage_type', 'shipping_unit', 'is_active'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function certificates()
    {
        return $this->hasMany(Certificate::class);
    }
}
