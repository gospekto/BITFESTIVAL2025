<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $isOrganizer = filter_var($request->input('is_organizer'), FILTER_VALIDATE_BOOLEAN);

        $fields = $request->validate(
            [
                'name' => 'required|string|max:255',
                'surname' => 'required|string|max:255',
                'email' => 'required|string|email|unique:users,email',
                'password' => 'required|string|confirmed|min:6',
                'address' => 'required|string|max:255',
                'latitude' => 'required|string',
                'longitude' => 'required|string',
                'is_organizer' => 'required|boolean',
                'organization_name' => 'required_if:is_organizer,true|string|max:255',
                'area_of_activity' => 'required_if:is_organizer,true|string|max:255',
                'contact_email' => 'required_if:is_organizer,true|email|max:255',
                'logo' => 'nullable|image|max:2048',
            ],
            [
                'organization_name.required_if' => 'Pole nazwa organizacji jest wymagane gdy konto jest organizacją.',
                'area_of_activity.required_if' => 'Pole obszar działalności jest wymagane gdy konto jest organizacją.',
                'contact_email.required_if' => 'Pole email kontaktowy jest wymagane gdy konto jest organizacją.',
            ]
        );

        $user = User::create([
            'name' => $fields['name'],
            'surname' => $fields['surname'],
            'email' => $fields['email'],
            'password' => Hash::make($fields['password']),
        ]);

        if ($isOrganizer) {
            $logoPath = null;
            if ($request->hasFile('logo')) {
                $logoPath = $request->file('logo')->store('logos', 'public');
            }

            $organization = Organization::create([
                'name' => $fields['organization_name'],
                'area_of_activity' => $fields['area_of_activity'],
                'contact_email' => $fields['contact_email'],
                'address' => $fields['address'],
                'logo_url' => $logoPath,
            ]);
            $uuid = $organization->id;
            $user->organizations()->attach($uuid);
            $user->assignRole('organizer');
        } else {
            $user->assignRole('volunteer');
        }

        $token = $user->createToken('api_token')->plainTextToken;

        return response()->json([
            'user' => new UserResource($user),
            'token' => $token,
        ]);
    }

    public function login(Request $request): JsonResponse
    {
        $fields = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $fields['email'])->first();

        if (! $user || ! Hash::check($fields['password'], $user->password)) {
            return response()->json(['message' => 'Nieprawidłowe dane'], 401);
        }

        $token = $user->createToken('api_token')->plainTextToken;

        return response()->json([
            'user' => new UserResource($user),
            'token' => $token,
        ], 200);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Wylogowano pomyślnie',
        ], 200);
    }
}
