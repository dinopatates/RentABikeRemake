<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LocationSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        foreach ([
            ['city' => 'Paris', 'address' => '12 rue de Lyon'],
            ['city' => 'Lyon', 'address' => '8 place Bellecour'],
            ['city' => 'Marseille', 'address' => '25 avenue du Prado'],
        ] as $location) {
            DB::table('locations')->insert([
                ...$location,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }
    }
}
