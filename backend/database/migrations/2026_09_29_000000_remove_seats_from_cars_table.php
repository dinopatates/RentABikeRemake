<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasColumn('cars', 'seats')) {
            Schema::table('cars', function (Blueprint $table) {
                $table->dropColumn('seats');
            });
        }
    }

    public function down(): void
    {
        if (! Schema::hasColumn('cars', 'seats')) {
            Schema::table('cars', function (Blueprint $table) {
                $table->unsignedTinyInteger('seats')->nullable();
            });
        }
    }
};