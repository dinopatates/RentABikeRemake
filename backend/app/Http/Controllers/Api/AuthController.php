<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // validation des données envoyées
        $validated = $request->validate([
            'name' => 'required|string|max:50',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);
        // création du user et de son token
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);
        $token = $user->createToken('auth_token')->plainTextToken;
            return response()->json([
            'user' => $user,
            ])->cookie($this->authCookie($token));
    }

    public function login(Request $request)
    {
        // validation des données envoyées
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // recherche de l'utilisateur par son email
        $user = User::where('email', $validated['email'])->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'message' => 'Identifiants invalides.',
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'message' => 'Hi '.$user->name,
            ])->cookie($this->authCookie($token));
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Déconnexion réussie.',
            ])->withoutCookie('auth_token');
        }

        private function authCookie(string $token)
        {
            return cookie(
                'auth_token',
                $token,
                60 * 24 * 7,
                '/',
                null,
                app()->environment('production'),
                true,
                false,
                'lax',
            );
    }
}
