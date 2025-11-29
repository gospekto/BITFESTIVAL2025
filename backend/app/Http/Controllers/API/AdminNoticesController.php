<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\NoticeResource;
use App\Models\Notice;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminNoticesController extends Controller
{
    public function index(Request $request)
    {
        return response()->json([
            'notices' => NoticeResource::collection(Notice::all()),
        ]);
    }

    public function destroy(Request $request, Notice $notice): JsonResponse
    {
        $notice->delete();

        return response()->json([
            'message' => 'Ogłoszenie zostało usunięte.',
        ]);
    }
}
