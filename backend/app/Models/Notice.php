<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Notice extends Model
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'category',
        'date',
        'time',
        'description',
        'location',
        'image_path',
        'organization_id',
        'max_people',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'date' => 'date',
            'time' => 'datetime:H:i',
            'max_people' => 'integer',
            'organization_id' => 'integer',
        ];
    }

    /**
     * Organization that owns the notice.
     */
    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }

    /**
     * Users registered for the notice.
     */
    public function registeredUsers()
    {
        return $this->belongsToMany(User::class, 'notice_user');
    }
}
