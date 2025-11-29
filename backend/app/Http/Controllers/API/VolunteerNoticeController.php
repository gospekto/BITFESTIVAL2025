<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\NoticeResource;
use App\Models\Notice;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VolunteerNoticeController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $notices = Notice::whereHas('users', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->get();

        return response()->json([
            'notices' => NoticeResource::collection($notices),
        ]);
    }

    public function join(Request $request, Notice $notice): JsonResponse
    {
        $user = $request->user();

        if ($notice->users()->where('user_id', $user->id)->exists()) {
            return response()->json(['message' => 'Już dołączyłeś do tego ogłoszenia.'], 400);
        }

        $notice->users()->attach($user->id);

        return response()->json(['message' => 'Pomyślnie dołączono do ogłoszenia.']);
    }

    public function leave(Request $request, Notice $notice): JsonResponse
    {
        $user = $request->user();

        if (! $notice->users()->where('user_id', $user->id)->exists()) {
            return response()->json(['message' => 'Nie jesteś zapisany na to ogłoszenie.'], 400);
        }

        $notice->users()->detach($user->id);

        return response()->json(['message' => 'Pomyślnie opuszczono ogłoszenie.']);
    }
}
