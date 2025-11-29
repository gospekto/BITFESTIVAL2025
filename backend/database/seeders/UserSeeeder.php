<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::updateOrCreate([
            'email' => 'admin@admin.pl',
        ], [
            'name' => 'admin',
            'surname' => 'adminowy',
            'password' => Hash::make('123'),
        ]);
        $user->assignRole('admin');

        $user = User::updateOrCreate([
            'name' => 'volunteer',
            'surname' => 'volunteerowy',
            'email' => 'vol@vol.pl',
        ], [
            'password' => Hash::make('123'),
        ]);
        $user->assignRole('volunteer');

        $user = User::updateOrCreate([
            'name' => 'organizer',
            'surname' => 'organizerowy',
            'email' => 'org@org.pl',
        ], [
            'password' => Hash::make('123'),
        ]);
        $user->assignRole('organizer');
    }
}
