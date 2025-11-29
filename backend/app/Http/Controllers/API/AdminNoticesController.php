<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\NoticeResource;
use App\Models\Notice;
use Illuminate\Http\Request;

class AdminNoticesController extends Controller
{
    public function index(Request $request)
    {
        return response()->json([
            'notices' => NoticeResource::collection(Notice::all()),
        ]);
    }
}
