<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\Car;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class BookingTest extends TestCase
{
    use RefreshDatabase;

    private function createUser(): User
    {
        return User::create([
            'name' => 'Test User',
            'email' => fake()->unique()->safeEmail(),
            'password' => Hash::make('password'),
        ]);
    }

    public function test_authenticated_user_can_book_an_available_car(): void
    {
        $user = $this->createUser();
        $car = Car::create([
            'brand' => 'Test',
            'model' => 'Car',
            'year' => 2025,
            'price_per_day' => 49.90,
            'seats' => 5,
            'transmission' => 'automatic',
            'fuel_type' => 'hybrid',
        ]);

        $response = $this->actingAs($user, 'sanctum')->postJson('/api/bookings', [
            'car_id' => $car->id,
            'start_date' => '2026-10-05',
            'end_date' => '2026-10-08',
        ]);

        $response->assertCreated()
            ->assertJsonPath('booking.total_price', '149.70')
            ->assertJsonPath('booking.status', 'pending');

        $this->assertDatabaseHas('bookings', [
            'user_id' => $user->id,
            'car_id' => $car->id,
            'total_price' => 149.70,
        ]);
    }

    public function test_a_car_cannot_be_booked_twice_on_overlapping_dates(): void
    {
        $user = $this->createUser();
        $car = Car::create([
            'brand' => 'Test',
            'model' => 'Car',
            'year' => 2025,
            'price_per_day' => 50,
            'seats' => 5,
            'transmission' => 'manual',
            'fuel_type' => 'petrol',
        ]);

        Booking::create([
            'user_id' => $user->id,
            'car_id' => $car->id,
            'start_date' => '2026-10-05',
            'end_date' => '2026-10-08',
            'total_price' => 150,
            'status' => 'confirmed',
        ]);

        $this->actingAs($user, 'sanctum')
            ->postJson('/api/bookings', [
                'car_id' => $car->id,
                'start_date' => '2026-10-07',
                'end_date' => '2026-10-10',
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('car_id');
    }

    public function test_booking_creation_requires_authentication(): void
    {
        $this->postJson('/api/bookings', [
            'car_id' => 1,
            'start_date' => '2026-10-05',
            'end_date' => '2026-10-08',
        ])->assertUnauthorized();
    }
}