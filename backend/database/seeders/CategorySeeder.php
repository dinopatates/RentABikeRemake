<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        $names = ['Scooter', 'Moto', 'Electrique', '125 cc'];
        $existingIds = DB::table('categories')->orderBy('id')->pluck('id')->all();

        foreach ($names as $index => $name) {
            if (isset($existingIds[$index])) {
                DB::table('categories')->where('id', $existingIds[$index])->update([
                    'name' => $name,
                    'updated_at' => $now,
                ]);
            } else {
                DB::table('categories')->insert([
                    'name' => $name,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
            }
        }

        if (count($existingIds) > count($names)) {
            DB::table('categories')->whereIn('id', array_slice($existingIds, count($names)))->delete();
        }
    }
}
