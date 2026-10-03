<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        abort_unless($request->user() && in_array((string) $request->user()->role, ['1', 'admin'], true), 403);

        return $next($request);
    }
}