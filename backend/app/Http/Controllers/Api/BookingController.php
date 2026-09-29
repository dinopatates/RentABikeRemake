<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class BookingController extends Controller
{
    // retourne la liste de l'uilisateur connecté
    public function index(Request $request)
    {
        return response()->json([
            'bookings' => $request->user()
                ->bookings()
                ->with('car.images', 'car.categories')
                ->latest()
                ->get(),
        ]);
    }

     // après avoir validé la dispo, crée une réservation
    public function store(Request $request)
    {
        $validated = $request->validate([
            'car_id' => ['required', 'integer', 'exists:cars,id'],
            'start_date' => ['required', 'date', 'after_or_equal:today'],
            'end_date' => ['required', 'date', 'after:start_date'],
        ]);

        $car = Car::findOrFail($validated['car_id']);

        //regarde les moindres conflits de dates
        $overlapExists = $car->bookings()
            ->whereIn('status', ['pending', 'confirmed'])
            ->whereDate('start_date', '<', $validated['end_date'])
            ->whereDate('end_date', '>', $validated['start_date'])
            ->exists();

        if ($overlapExists) {
            throw ValidationException::withMessages([
                'car_id' => ['Ce véhicule est déjà réservé sur cette période.'],
            ]);
        }

        $days = now()->parse($validated['start_date'])
            ->diffInDays(now()->parse($validated['end_date']));

        $booking = $request->user()->bookings()->create([
            'car_id' => $car->id,
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'total_price' => $car->price_per_day * $days,
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Réservation créée avec succès.',
            'booking' => $booking->load('car.images', 'car.categories'),
        ], 201);
    }

    /**
     * Affiche une réservation appartenant à l'utilisateur connecté.
     */
    public function show(Request $request, Booking $booking)
    {
        abort_unless($booking->user_id === $request->user()->id, 404);

        return response()->json($booking->load('car.images', 'car.categories'));
    }

    /**
     * Permet au client d'annuler sa réservation sans supprimer son historique.
     */
    public function destroy(Request $request, Booking $booking)
    {
        abort_unless($booking->user_id === $request->user()->id, 404);

        if ($booking->status === 'cancelled') {
            return response()->json(['message' => 'Cette réservation est déjà annulée.']);
        }

        $booking->update(['status' => 'cancelled']);

        return response()->json(['message' => 'Réservation annulée avec succès.']);
    }
}
