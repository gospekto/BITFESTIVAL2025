<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    use HasUuids;

    protected $fillable = [
        'name',
        'area_of_activity',
        'contact_email',
        'address',
        'logo_url',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'organization_user');
    }
}
