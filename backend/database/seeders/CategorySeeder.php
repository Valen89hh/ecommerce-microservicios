<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            [
                'name' => 'Frutas',
                'description' => 'Frutas frescas y naturales',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Verduras',
                'description' => 'Verduras orgánicas y saludables',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Cereales integrales',
                'description' => 'Cereales con alto contenido en fibra',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Snacks saludables',
                'description' => 'Snacks bajos en calorías y sin azúcar',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Bebidas naturales',
                'description' => 'Jugos, infusiones y batidos naturales',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
