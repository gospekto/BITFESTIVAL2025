<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = [
            'id' => $this->id,
            'name' => $this->name,
            'surname' => $this->surname,
            'email' => $this->email,
            'longitude' => $this->longitude,
            'latitude' => $this->latitude,
            'address' => $this->address,
            'role' => $this->getRoleNames()->first(),
        ];
        if ($this->hasRole('organizer') && $organization = $this->organizations()->first()) {
            $data['organization'] = [
                'id' => $organization->id,
                'organization_name' => $organization->name,
                'area_of_activity' => $organization->area_of_activity,
                'contact_email' => $organization->contact_email,
                'verified' => $organization->verified,
                'logo_url' => $organization->logo_url ? Storage::url($organization->logo_url) : null,
            ];
        }

        return $data;
    }
}
