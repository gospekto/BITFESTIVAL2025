<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class NoticeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'category' => $this->category,
            'date' => $this->date->format('Y-m-d'),
            'description' => $this->description,
            'location' => $this->location,
            'max_people' => $this->max_people,
            'image_url' => $this->image_path ? Storage::url($this->image_path) : null,
            'organization' => $this->organization ? [
                'id' => $this->organization->id,
                'name' => $this->organization->name,
                'area_of_activity' => $this->organization->area_of_activity,
                'contact_email' => $this->organization->contact_email,
                'address' => $this->organization->address,
                'logo_url' => $this->organization->logo_url ? Storage::url($this->organization->logo_url) : null,
            ] : null,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
