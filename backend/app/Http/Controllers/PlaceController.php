<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PlaceController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->get('search');
        if (!$query) return [];

        $key = env('GOOGLE_PLACES_KEY');

        // Autocomplete, ograniczenie do Polski
        $response = Http::get('https://maps.googleapis.com/maps/api/place/autocomplete/json', [
            'input' => $query,
            'language' => 'pl',
            'components' => 'country:pl',
            'key' => $key,
        ])->json();

        $predictions = collect($response['predictions'] ?? [])->take(5);

        $results = $predictions->map(function ($item) use ($key) {
            $details = Http::get('https://maps.googleapis.com/maps/api/place/details/json', [
                'place_id' => $item['place_id'],
                'key' => $key,
                'fields' => 'geometry/location,formatted_address,name,address_components'
            ])->json();

            $place = $details['result'] ?? [];

            return [
                'name' => $place['name'] ?? null,
                'address' => $place['formatted_address'] ?? null,
                'latitude' => $place['geometry']['location']['lat'] ?? null,
                'longitude' => $place['geometry']['location']['lng'] ?? null,
            ];
        });

        return $results;
    }
}
