<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Car;
use App\Models\Category;

class CarController extends Controller
{
	public function index()
	{
        // envoi de la liste des voitures et des catégories
		return response()->json([
			'cars' => Car::with('categories', 'images')->get(),
			'categories' => Category::orderBy('name')->get(['id', 'name']),
		]);
	}

	public function show(Car $car)
	{
        // envoi une voiture avec catégories et images
		return response()->json($car->load('categories', 'images'));
	}
}
