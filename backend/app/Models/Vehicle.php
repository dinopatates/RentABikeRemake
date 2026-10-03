<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    protected $fillable = [
        'brand',
        'model',
        'year',
        'price_per_day',
        'description',
        'transmission',
        'fuel_type',
    ];

    protected function casts(): array
    {
        return [
            'year' => 'integer',
            'price_per_day' => 'decimal:2',
        ];
    }

    public function images(): HasMany
    {
        return $this->hasMany(VehicleImage::class);
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'category_vehicle');
    }
}
