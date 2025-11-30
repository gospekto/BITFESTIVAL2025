<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\Notice;
use App\Models\User;
use Illuminate\Http\Request;

class VolunteerController extends Controller
{
    public function nearbyVolunteers(Request $request, Notice $notice)
    {
        $lat = $request->input('latitude', $notice->latitude);
        $lng = $request->input('longitude', $notice->longitude);
        $radius = $request->input('radius', 10);

        $volunteers = User::role('volunteer')
            ->select('*')
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
            'volunteers' => UserResource::collection($volunteers),
        ]);
    }

    public function inviteVolunteer(Request $request, Notice $notice, User $volunteer)
    {
        $notice->users()->attach($volunteer);
    }
}
