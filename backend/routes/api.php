<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\VehicleController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\AuthController;

// VEHICLES
Route::get('/vehicles', [VehicleController::class, 'index']);
Route::get('/vehicles/{vehicle}', [VehicleController::class, 'show']);
// crud
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
	Route::post('/vehicles', [VehicleController::class, 'store']);
	Route::match(['put', 'patch'], '/vehicles/{vehicle}', [VehicleController::class, 'update']);
	Route::delete('/vehicles/{vehicle}', [VehicleController::class, 'destroy']);
});
// BOOKINGS: les réservations sont privées et nécessitent une session Sanctum.
Route::middleware('auth:sanctum')->group(function () {
	Route::get('/bookings', [BookingController::class, 'index']);
	Route::get('/bookings/{booking}', [BookingController::class, 'show']);
	Route::post('/bookings', [BookingController::class, 'store']);
	Route::delete('/bookings/{booking}', [BookingController::class, 'destroy']);
});

// AUTH
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);