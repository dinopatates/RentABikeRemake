<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CarCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = DB::table('categories')->pluck('id', 'name');
        $now = now();

        foreach ([
            'Honda|PCX 125' => ['Scooter', '125 cc'],
            'Yamaha|MT-07' => ['Moto'],
            'Piaggio|Liberty 125' => ['Scooter', '125 cc'],
            'Kawasaki|Z650' => ['Moto'],
        ] as $car => $carCategories) {
            [$brand, $model] = explode('|', $car);
            $carId = DB::table('cars')
                ->where('brand', $brand)
                ->where('model', $model)
                ->value('id');

            foreach ($carCategories as $category) {
                DB::table('car_category')->insert([
                    'car_id' => $carId,
                    'category_id' => $categories[$category],
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
            }
        }
    }
}
