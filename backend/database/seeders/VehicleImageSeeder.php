<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VehicleImageSeeder extends Seeder
{
    public function run(): void
    {
        $images = [
            'Honda|PCX 125' => 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80',
            'Yamaha|MT-07' => 'https://images.unsplash.com/photo-1558980664-10ea0a71e9e3?auto=format&fit=crop&w=1200&q=80',
            'Piaggio|Liberty 125' => 'https://images.unsplash.com/photo-1558980394-0c7f0b5f6c5b?auto=format&fit=crop&w=1200&q=80',
            'Kawasaki|Z650' => 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80',
        ];

        $now = now();
        DB::table('vehicle_images')->delete();
        foreach ($images as $vehicle => $imageUrl) {
            [$brand, $model] = explode('|', $vehicle);
            $vehicleId = DB::table('vehicles')
                ->where('brand', $brand)
                ->where('model', $model)
                ->value('id');

            DB::table('vehicle_images')->insert([
                'vehicle_id' => $vehicleId,
                'image_url' => $imageUrl,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }
    }
}
