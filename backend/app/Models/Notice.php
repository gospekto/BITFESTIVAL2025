<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Notice extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'title',
        'category',
        'date',
        'description',
        'location',
        'image_path',
        'organization_id',
        'max_people',
    ];

    protected function casts(): array
    {
        return [
            'date' => 'date:Y-m-d H:i:s',
        ];
    }

    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }
}
