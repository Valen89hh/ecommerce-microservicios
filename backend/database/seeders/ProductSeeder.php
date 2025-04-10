<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::create([
            'name' => 'Balon de futbol',
            'description' => "Balón tamaño profesional",
            'price' => 49.99,
            'imagen' => 'https://picsum.photos/id/1015/600/300'
        ]);
        Product::create([
            'name' => 'Camiseta deportiva',
            'description' => "Camiseta DryFit para entrenamiento",
            'price' => 24.99,
            'imagen' => 'https://picsum.photos/id/1016/600/300'
        ]);
        Product::create([
            'name' => 'Zapatillas de running',
            'description' => "Zapatillas ligeras para correr",
            'price' => 89.99,
            'imagen' => 'https://picsum.photos/id/1018/600/300'
        ]);
    }
}
