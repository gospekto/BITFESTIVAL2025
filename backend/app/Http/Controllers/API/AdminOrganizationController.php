<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminOrganizationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $organizations = User::role('organizer')->with('organizations')->get();

        return response()->json([
            'organizations' => UserResource::collection($organizations),
        ]);
    }

    public function verifyOrganization(Request $request, Organization $organization): JsonResponse
    {
        $organization->update([
            'verified' => true,
        ]);

        return response()->json([
            'message' => 'Pomyślnie zweryfikowano organizacje.',
        ], 200);
    }
}
