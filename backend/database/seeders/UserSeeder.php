<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        foreach ([
            ['name' => 'Test User', 'email' => 'test@example.com'],
            ['name' => 'Marie Dupont', 'email' => 'marie@example.com'],
            ['name' => 'Lucas Martin', 'email' => 'lucas@example.com'],
        ] as $user) {
            DB::table('users')->insert([
                'name' => $user['name'],
                'email' => $user['email'],
                'password' => Hash::make('password'),
            ]);
        }
    }
}
