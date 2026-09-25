<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CarImageSeeder extends Seeder
{
    public function run(): void
    {
        $images = [
            'Toyota|Yaris' => 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80',
            'Tesla|Model 3' => 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80',
            'Ford|Mustang Mach-E' => 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
            'BMW|Serie 3' => 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
        ];

        $now = now();
        foreach ($images as $car => $imageUrl) {
            [$brand, $model] = explode('|', $car);
            $carId = DB::table('cars')
                ->where('brand', $brand)
                ->where('model', $model)
                ->value('id');

            DB::table('car_images')->insert([
                'car_id' => $carId,
                'image_url' => $imageUrl,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }
    }
}
