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
                'brand' => 'Honda',
                'model' => 'PCX 125',
                'year' => 2023,
                'price_per_day' => 39.90,
                'description' => 'Un scooter urbain agile et economique, ideal pour les trajets quotidiens.',
                'transmission' => 'Automatique',
                'fuel_type' => 'Essence',
            ],
            [
                'brand' => 'Yamaha',
                'model' => 'MT-07',
                'year' => 2024,
                'price_per_day' => 79.90,
                'description' => 'Une moto polyvalente et nerveuse, parfaite pour la ville comme pour la route.',
                'transmission' => 'Manuelle',
                'fuel_type' => 'Essence',
            ],
            [
                'brand' => 'Piaggio',
                'model' => 'Liberty 125',
                'year' => 2023,
                'price_per_day' => 94.50,
                'description' => 'Un scooter leger et maniable pour circuler facilement en ville.',
                'transmission' => 'Automatique',
                'fuel_type' => 'Essence',
            ],
            [
                'brand' => 'Kawasaki',
                'model' => 'Z650',
                'year' => 2022,
                'price_per_day' => 69.90,
                'description' => 'Une moto dynamique et elegante pour les balades et les trajets quotidiens.',
                'transmission' => 'Manuelle',
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
