<?php

use App\Http\Controllers\API\AdminNoticesController;
use App\Http\Controllers\API\AdminOrganizationController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\NoticeController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\VolunteerController;
use App\Http\Controllers\API\VolunteerNoticeController;
use App\Http\Controllers\PlaceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [UserController::class, 'user']);
    Route::put('/user', [UserController::class, 'update']);

    Route::middleware('role:organizer')->group(function () {
        Route::get('/notices', [NoticeController::class, 'index']);
        Route::get('/nearby-volunteers', [VolunteerController::class, 'nearbyVolunteers']);
        Route::post('/notices/{notice}/invite/{volunteer}', [VolunteerController::class, 'inviteVolunteer']);
        Route::post('/notices', [NoticeController::class, 'store']);
        Route::put('/notices/{notice}', [NoticeController::class, 'update']);
        Route::delete('/notices/{notice}', [NoticeController::class, 'destroy']);
    });

    Route::middleware('role:volunteer')->group(function () {
        Route::get('/my-notices', [VolunteerNoticeController::class, 'index']);
        Route::get('/notices/{notice}', [VolunteerNoticeController::class, 'show']);
        Route::post('/notices/{notice}/join', [VolunteerNoticeController::class, 'join']);
        Route::post('/notices/{notice}/leave', [VolunteerNoticeController::class, 'leave']);
        Route::get('/notices-in-range', [VolunteerNoticeController::class, 'noticesInRange']);
        Route::get('/ivitations', [VolunteerNoticeController::class, 'invitations']);
        Route::post('/ivitations/{invitation}/accept', [VolunteerNoticeController::class, 'acceptInvitation']);
        Route::delete('/ivitations/{invitation}', [VolunteerNoticeController::class, 'declineInvitation']);
    });

    Route::middleware('role:admin')->group(function () {
        Route::get('/admin-notices', [AdminNoticesController::class, 'index']);
        Route::delete('/admin/notices/{notice}', [AdminNoticesController::class, 'destroy']);
        Route::get('/organizations', [AdminOrganizationController::class, 'index']);
        Route::post('/organization/{organization}/verify', [AdminOrganizationController::class, 'verifyOrganization']);
    });

    Route::get('/all-notices', [VolunteerNoticeController::class, 'allNotices']);
});

Route::get('/search-places', [PlaceController::class, 'search']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/test', function (Request $request) {
    return response()->json([
        'status' => 'ok',
        'message' => 'API działa poprawnie',
        'time' => now(),
    ]);
});
