<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // récup les infos envoyées et fait une validation
        $request->validate([
            'name' => 'required|string|max:50',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        // créer un nouvel user et hash le mdp
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        // créer un token qui stock les infos de l'user
        $token = $user->createToken('auth_token')->plainTextToken;

        // retourne les infos de l'user et le token
        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function login(Request $request)
    {
        // récup les infos envoyées et fait une validation
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        // vérifie si l'email correspond bien et le mdp à son hash
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid login details'
            ], 401);
        }
        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;
        // user mis dedans, plus rapide et + simple
        return response()->json([
            'user' => $user,
            'message' => 'Hi '.$user->name,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }
}
