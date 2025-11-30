<?php

namespace Database\Seeders;

use App\Enums\Category;
use App\Models\Notice;
use App\Models\Organization;
use Illuminate\Database\Seeder;

class NoticeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {

        // Punkt referencyjny, np. centrum Twojej lokalizacji
        $centerLat = 51.896;  // zmień na swoją szerokość
        $centerLng = 17.772;  // zmień na swoją długość
        $radiusKm = 10;

        // Pobieramy wszystkie organizacje
        $organizations = Organization::all();

        if ($organizations->isEmpty()) {
            $this->command->info('Brak organizacji do przypisania, seed przerwany.');

            return;
        }

        for ($i = 0; $i < 1; $i++) {
            $angle = fake()->randomFloat(6, 0, 2 * pi());
            $distance = fake()->randomFloat(6, 0, $radiusKm) / 111;
            $lat = $centerLat + $distance * cos($angle);
            $lng = $centerLng + $distance * sin($angle);

            Notice::create([
                'title' => fake()->sentence(3),
                'category' => Category::cases()[array_rand(Category::cases())]->value,
                'date' => fake()->dateTimeBetween('-1 month', '+1 month'),
                'description' => fake()->paragraph(),
                'latitude' => $lat,
                'longitude' => $lng,
                'location' => fake()->address(),
                'image_path' => null,
                'organization_id' => $organizations->random()->id,
                'max_people' => fake()->numberBetween(5, 100),
            ]);
        }
    }
}
