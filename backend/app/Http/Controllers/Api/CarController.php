<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Car;
use App\Models\Category;
use Illuminate\Http\Request;

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
		return response()->json($car->load('categories', 'images'));
	}

	public function store(Request $request)
	{
		$validated = $this->validateVehicle($request);
		$categoryIds = $validated['category_ids'] ?? [];
		unset($validated['category_ids']);

		$car = Car::create($validated);
		$car->categories()->sync($categoryIds);

		return response()->json($car->load('categories', 'images'), 201);
	}

	public function update(Request $request, Car $car)
	{
		$validated = $this->validateVehicle($request);
		$categoryIds = $validated['category_ids'] ?? [];
		unset($validated['category_ids']);

		$car->update($validated);
		$car->categories()->sync($categoryIds);

		return response()->json($car->load('categories', 'images'));
	}

	public function destroy(Car $car)
	{
		$car->delete();

		return response()->json(['message' => 'Véhicule supprimé.']);
	}

	private function validateVehicle(Request $request): array
	{
		return $request->validate([
			'brand' => ['required', 'string', 'max:100'],
			'model' => ['required', 'string', 'max:100'],
			'year' => ['required', 'integer', 'min:1900', 'max:2100'],
			'price_per_day' => ['required', 'numeric', 'min:0'],
			'description' => ['nullable', 'string'],
			'transmission' => ['required', 'string', 'max:50'],
			'fuel_type' => ['required', 'string', 'max:50'],
			'category_ids' => ['sometimes', 'array'],
			'category_ids.*' => ['integer', 'exists:categories,id'],
		]);
	}
}
