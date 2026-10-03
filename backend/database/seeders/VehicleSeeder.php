<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VehicleSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        $vehicles = [
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
        ];

        $existingIds = DB::table('vehicles')->orderBy('id')->pluck('id')->all();
        foreach ($vehicles as $index => $vehicle) {
            $attributes = [...$vehicle, 'updated_at' => $now];

            if (isset($existingIds[$index])) {
                DB::table('vehicles')->where('id', $existingIds[$index])->update($attributes);
            } else {
                DB::table('vehicles')->insert([...$attributes, 'created_at' => $now]);
            }
        }

        if (count($existingIds) > count($vehicles)) {
            DB::table('vehicles')->whereIn('id', array_slice($existingIds, count($vehicles)))->delete();
        }
    }
}
