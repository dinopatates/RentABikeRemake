<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VehicleCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = DB::table('categories')->pluck('id', 'name');
        $now = now();
        DB::table('category_vehicle')->delete();

        foreach ([
            'Honda|PCX 125' => ['Scooter', '125 cc'],
            'Yamaha|MT-07' => ['Moto'],
            'Piaggio|Liberty 125' => ['Scooter', '125 cc'],
            'Kawasaki|Z650' => ['Moto'],
        ] as $vehicle => $vehicleCategories) {
            [$brand, $model] = explode('|', $vehicle);
            $vehicleId = DB::table('vehicles')
                ->where('brand', $brand)
                ->where('model', $model)
                ->value('id');

            foreach ($vehicleCategories as $category) {
                DB::table('category_vehicle')->insert([
                    'vehicle_id' => $vehicleId,
                    'category_id' => $categories[$category],
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
            }
        }
    }
}
