<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AuthenticateFromCookie
{
    /**
     * Le frontend reçoit le token Sanctum dans un cookie HttpOnly nommé
     * auth_token. Sanctum sait lire un token Bearer, mais pas ce nom de cookie
     * personnalisé : on le convertit donc avant l'exécution du guard.
     */
    public function handle(Request $request, Closure $next)
    {
        if ($request->cookie('auth_token') && !$request->bearerToken()) {
            $request->headers->set('Authorization', 'Bearer '.$request->cookie('auth_token'));
        }

        return $next($request);
    }
}