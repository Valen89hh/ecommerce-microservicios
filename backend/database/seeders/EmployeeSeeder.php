<?php

namespace Database\Seeders;

use App\Models\Employee;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Employee::create([
            'name' => 'Admin Employee',
            'email' => 'admin@empresa.com',
            'password' => Hash::make('admin123'), // Usa Hash::make para encriptar la contraseña
            'status' => 'admin',
            'phone_number' => '999999999',
            'is_active' => true,
        ]);
    }
}
