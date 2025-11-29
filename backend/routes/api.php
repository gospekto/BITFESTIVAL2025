<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\NoticeController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\VolunteerNoticeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [UserController::class, 'user']);

    Route::middleware('role:organizer')->group(function () {
        Route::get('/notices', [NoticeController::class, 'index']);
        Route::post('/notices', [NoticeController::class, 'store']);
        Route::put('/notices/{notice}', [NoticeController::class, 'update']);
        Route::delete('/notices/{notice}', [NoticeController::class, 'destroy']);
    });

    Route::middleware('role:volunteer')->group(function () {
        Route::get('/all-notices', [VolunteerNoticeController::class, 'allNotices']);
        Route::get('/my-notices', [VolunteerNoticeController::class, 'index']);
        Route::post('/notices/{notice}/join', [VolunteerNoticeController::class, 'join']);
        Route::post('/notices/{notice}/leave', [VolunteerNoticeController::class, 'leave']);
    });
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
