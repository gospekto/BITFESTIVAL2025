<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PlaceController extends Controller
{
    public function search(Request $request)
    {
        $search = $request->get('search');
        $key = env('GOOGLE_PLACES_KEY');

        if (!$search) {
            return [];
        }

        $auto = Http::get('https://maps.googleapis.com/maps/api/place/autocomplete/json', [
            'input' => $search,
            'types' => 'establishment',
            'components' => 'country:pl',
            'key' => $key,
        ])->json();

        $predictions = collect($auto['predictions'])->take(5);

        $results = $predictions->map(function ($item) use ($key) {
            $details = Http::get('https://maps.googleapis.com/maps/api/place/details/json', [
                'place_id' => $item['place_id'],
                'key' => $key,
                'fields' => 'geometry/location,formatted_address,name'
            ])->json();

            $loc = $details['result']['geometry']['location'] ?? null;

            return [
                'name' => $details['result']['name'] ?? null,
                'address' => $details['result']['formatted_address'] ?? null,
                'latitude' => $loc['lat'] ?? null,
                'longitude' => $loc['lng'] ?? null,
            ];
        });

        return $results;
    }
}
