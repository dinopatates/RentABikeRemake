<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use App\Models\Category;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
	public function index()
	{
		return response()->json([
			'vehicles' => Vehicle::with('categories', 'images')->get(),
			'categories' => Category::orderBy('name')->get(['id', 'name']),
		]);
	}

	public function show(Vehicle $vehicle)
	{
		return response()->json($vehicle->load('categories', 'images'));
	}

	public function store(Request $request)
	{
		$validated = $this->validateVehicle($request);
		$categoryIds = $validated['category_ids'] ?? [];
		unset($validated['category_ids']);

		$vehicle = Vehicle::create($validated);
		$vehicle->categories()->sync($categoryIds);

		return response()->json($vehicle->load('categories', 'images'), 201);
	}

	public function update(Request $request, Vehicle $vehicle)
	{
		$validated = $this->validateVehicle($request);
		$categoryIds = $validated['category_ids'] ?? [];
		unset($validated['category_ids']);

		$vehicle->update($validated);
		$vehicle->categories()->sync($categoryIds);

		return response()->json($vehicle->load('categories', 'images'));
	}

	public function destroy(Vehicle $vehicle)
	{
		$vehicle->delete();

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
