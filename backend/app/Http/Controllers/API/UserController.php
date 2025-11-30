<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function user(Request $request): JsonResponse
    {
        return response()->json([
            'user' => new UserResource($request->user()),
        ]);
    }

    public function update(Request $request): JsonResponse
    {
        $user = $request->user();
        $isOrganizer = $user->hasRole('organizer');

        $fields = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'surname' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|confirmed|min:6',
            'address' => 'required|string|max:255',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'organization_name' => 'required_if:is_organizer,true|string|max:255',
            'area_of_activity' => 'required_if:is_organizer,true|string|max:255',
            'contact_email' => 'required_if:is_organizer,true|email|max:255',
            'logo' => 'nullable|image|max:2048',
        ], [
            'organization_name.required_if' => 'Pole nazwa organizacji jest wymagane gdy konto jest organizacją.',
            'area_of_activity.required_if' => 'Pole obszar działalności jest wymagane gdy konto jest organizacją.',
            'contact_email.required_if' => 'Pole email kontaktowy jest wymagane gdy konto jest organizacją.',
        ]);

        $user->update([
            'name' => $fields['name'] ?? $user->name,
            'surname' => $fields['surname'] ?? $user->surname,
            'address' => $fields['address'] ?? $user->address,
            'latitude' => $fields['latitude'] ?? $user->latitude,
            'longitude' => $fields['longitude'] ?? $user->longitude,
            'email' => $fields['email'] ?? $user->email,
            'password' => isset($fields['password']) ? Hash::make($fields['password']) : $user->password,
        ]);

        if ($isOrganizer) {
            $logoPath = $request->hasFile('logo') ? $request->file('logo')->store('logos', 'public') : null;
            $organization = $user->organizations()->first();
            if ($organization) {
                $organization->update(array_merge(
                    $fields,
                    $logoPath ? ['logo_url' => $logoPath] : []
                ));
            }
        }

        return response()->json([
            'user' => new UserResource($user),
        ]);
    }
}
