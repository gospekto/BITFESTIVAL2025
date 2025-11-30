<?php

namespace App\Models;

use App\Enums\Category;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Notice extends Model
{
    use HasFactory, HasUuids, Notifiable;

    protected $fillable = [
        'title',
        'category',
        'date',
        'description',
        'location',
        'latitude',
        'longitude',
        'image_path',
        'organization_id',
        'max_people',
    ];

    protected function casts(): array
    {
        return [
            'date' => 'date:Y-m-d H:i:s',
            'category' => Category::class,
        ];
    }

    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
