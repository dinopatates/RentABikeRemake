<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CarSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        foreach ([
            [
                'brand' => 'Toyota',
                'model' => 'Yaris',
                'year' => 2023,
                'price_per_day' => 39.90,
                'description' => 'Une citadine agile et economique pour les trajets urbains.',
                'seats' => 5,
                'transmission' => 'Automatique',
                'fuel_type' => 'Hybride',
            ],
            [
                'brand' => 'Tesla',
                'model' => 'Model 3',
                'year' => 2024,
                'price_per_day' => 79.90,
                'description' => 'Une berline electrique confortable avec une grande autonomie.',
                'seats' => 5,
                'transmission' => 'Automatique',
                'fuel_type' => 'Electrique',
            ],
            [
                'brand' => 'Ford',
                'model' => 'Mustang Mach-E',
                'year' => 2023,
                'price_per_day' => 94.50,
                'description' => 'Un SUV electrique spacieux, ideal pour les longs trajets.',
                'seats' => 5,
                'transmission' => 'Automatique',
                'fuel_type' => 'Electrique',
            ],
            [
                'brand' => 'BMW',
                'model' => 'Serie 3',
                'year' => 2022,
                'price_per_day' => 69.90,
                'description' => 'Une berline dynamique et elegante pour voyager avec style.',
                'seats' => 5,
                'transmission' => 'Automatique',
                'fuel_type' => 'Essence',
            ],
        ] as $car) {
            DB::table('cars')->insert([
                ...$car,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }
    }
}
