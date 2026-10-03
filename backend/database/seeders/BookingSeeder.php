<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BookingSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();
        $users = DB::table('users')->pluck('id', 'email');
        $vehicles = DB::table('vehicles')->get()->keyBy(fn ($vehicle) => $vehicle->brand.'|'.$vehicle->model);

        DB::table('bookings')->insert([
            [
                'user_id' => $users['test@example.com'],
                'vehicle_id' => $vehicles['Honda|PCX 125']->id,
                'start_date' => '2026-10-05',
                'end_date' => '2026-10-08',
                'total_price' => 119.70,
                'status' => 'confirmed',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'user_id' => $users['marie@example.com'],
                'vehicle_id' => $vehicles['Yamaha|MT-07']->id,
                'start_date' => '2026-11-12',
                'end_date' => '2026-11-15',
                'total_price' => 239.70,
                'status' => 'pending',
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}
