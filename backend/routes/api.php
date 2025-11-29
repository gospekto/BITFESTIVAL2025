<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [UserController::class, 'user']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/test', function (Request $request) {
    return response()->json([
        'status' => 'ok',
        'message' => 'API działa poprawnie',
        'time' => now(),
    ]);
});
