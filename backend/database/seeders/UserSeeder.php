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
            ['name' => 'Admin Ride Libre', 'email' => 'admin@example.com', 'role' => 'admin'],
            ['name' => 'Test User', 'email' => 'test@example.com', 'role' => 'user'],
            ['name' => 'Marie Dupont', 'email' => 'marie@example.com', 'role' => 'user'],
            ['name' => 'Lucas Martin', 'email' => 'lucas@example.com', 'role' => 'user'],
        ] as $user) {
            DB::table('users')->insert([
                'name' => $user['name'],
                'email' => $user['email'],
                'password' => Hash::make('password'),
                'role' => $user['role'],
            ]);
        }
    }
}
