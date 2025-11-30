<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\InvitationResource;
use App\Http\Resources\NoticeResource;
use App\Models\Invitation;
use App\Models\Notice;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VolunteerNoticeController extends Controller
{
    public function allNotices(Request $request): JsonResponse
    {
        $notices = Notice::with('users')->withCount('users')->get();

        return response()->json([
            'notices' => NoticeResource::collection($notices),
        ]);
    }

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

    public function show(Request $request, Notice $notice): JsonResponse
    {
        $notice->load('users')->loadCount('users');
        return response()->json([
            'notice' => new NoticeResource($notice),
        ]);
    }

    public function noticesInRange(Request $request): JsonResponse
    {
        $user = $request->user();

        $lat = $request->input('latitude', $user->latitude);
        $lng = $request->input('longitude', $user->longitude);
        $radius = $request->input('radius', 10);
        $notices = Notice::select('*')
            ->selectRaw('
            (6371 * acos(
                cos(radians(?)) *
                cos(radians(latitude)) *
                cos(radians(longitude) - radians(?)) +
                sin(radians(?)) *
                sin(radians(latitude))
            )) AS distance
        ', [$lat, $lng, $lat])
            ->having('distance', '<=', $radius)
            ->orderBy('distance')
            ->get();

        return response()->json([
            'notices' => NoticeResource::collection($notices),
        ]);
    }


    public function invitations(Request $request): JsonResponse
    {
        $user = $request->user();

        $invitations = $user->invitations()
            ->with(['notice' => function ($query) {
                $query->withCount('users');
            }])
            ->get();


        return response()->json([
            'invitations' => InvitationResource::collection($invitations),
        ]);
    }

    public function acceptInvitation(Request $request, Invitation $invitation): JsonResponse
    {
        $user = $request->user();

        $invitation->notice->users()->attach($user->id);

        $invitation->update(['accepted' => true]);

        return response()->json(['message' => 'Pomyślnie dołączono do ogłoszenia.']);
    }

    public function declineInvitation(Request $request, Invitation $invitation): JsonResponse
    {
        $invitation->delete();

        return response()->json(['message' => 'Pomyślnie odrzucono zaproszenie.']);
    }

    public function myUpcomingNotices(Request $request): JsonResponse
    {
        $user = $request->user();

        $notices = Notice::where('date', '>=', now())
            ->whereHas('users', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->orderBy('date', 'asc')
            ->limit(3)
            ->get();

        return response()->json([
            'notices' => NoticeResource::collection($notices),
        ]);
    }
}
