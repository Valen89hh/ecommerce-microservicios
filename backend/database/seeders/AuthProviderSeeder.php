<?php

namespace Database\Seeders;

use App\Models\AuthProvider;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AuthProviderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $providers = ['email', 'google'];

        foreach ($providers as $provider) {
            AuthProvider::firstOrCreate(['provider' => $provider]);
        }
    }
}
