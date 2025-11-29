<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::updateOrCreate([
            'name' => 'admin',
        ], [
            'guard_name' => 'sanctum',
        ]);

        Role::updateOrCreate([
            'name' => 'volunteer',
        ], [
            'guard_name' => 'sanctum',
        ]);

        Role::updateOrCreate([
            'name' => 'organizer',
        ], [
            'guard_name' => 'sanctum',
        ]);
    }
}
