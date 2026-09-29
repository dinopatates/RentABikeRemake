<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\CarController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\AuthController;

// CARS
Route::get('/cars', [CarController::class, 'index']);
Route::get('/cars/{car}', [CarController::class, 'show']);
Route::post('/cars', [CarController::class, 'store']);
Route::match(['put', 'patch'], '/cars/{car}', [CarController::class, 'update']);
Route::delete('/cars/{car}', [CarController::class, 'destroy']);
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