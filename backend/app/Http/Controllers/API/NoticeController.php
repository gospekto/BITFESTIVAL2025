<?php

namespace App\Http\Controllers\API;

use App\Enums\Category;
use App\Http\Controllers\Controller;
use App\Http\Resources\NoticeResource;
use App\Models\Notice;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class NoticeController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $notices = Notice::where('organization_id', $user->organizations()->first()->id)->with('users')->get();

        return response()->json([
            'notices' => NoticeResource::collection($notices),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $user = $request->user();
        Log::info($request->all());
        $fields = $request->validate([
            'title' => 'required|string|max:255',
            'category' => ['required', 'string', function ($attribute, $value, $fail) {
                if (! in_array($value, array_column(Category::cases(), 'value'))) {
                    $fail('Niepoprawna kategoria.');
                }
            }],
            'date' => 'required|date',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'longitude' => 'required|numeric',
            'latitude' => 'required|numeric',
            'image' => 'nullable|image|max:2048',
            'max_people' => 'required|integer|min:1',
        ]);

        if ($request->hasFile('image')) {
            $fields['image_path'] = $request->file('image')->store('notices', 'public');
        }

        $notice = Notice::create([
            'title' => $fields['title'],
            'category' => $fields['category'],
            'date' => $fields['date'],
            'description' => $fields['description'],
            'latitude' => $fields['latitude'],
            'longitude' => $fields['longitude'],
            'location' => $fields['location'],
            'image_path' => $fields['image_path'] ?? null,
            'organization_id' => $user->organizations()->first()->id,
            'max_people' => $fields['max_people'],
        ]);

        return response()->json([
            'message' => 'Pomyślnie utworzono ogłoszenie.',
            'notice' => new NoticeResource($notice),
        ]);
    }

    public function update(Request $request, Notice $notice): JsonResponse
    {
        $user = $request->user();

        if ($notice->organization_id !== $user->organizations()->first()->id) {
            return response()->json(['message' => 'Brak uprawnień do edycji tego ogłoszenia.'], 403);
        }

        $fields = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'category' => ['sometimes', 'required', 'string', function ($attribute, $value, $fail) {
                if (! in_array($value, array_column(Category::cases(), 'value'))) {
                    $fail('Niepoprawna kategoria.');
                }
            }],
            'date' => 'sometimes|required|date',
            'description' => 'sometimes|required|string',
            'location' => 'sometimes|required|string|max:255',
            'longitude' => 'required|decimal:10,6',
            'latitude' => 'required|decimal:10,6',
            'image' => 'nullable|image|max:2048',
            'max_people' => 'sometimes|required|integer|min:1',
        ]);

        if ($request->hasFile('image')) {
            $fields['image_path'] = $request->file('image')->store('notices', 'public');
        }

        $notice->update($fields);

        return response()->json([
            'message' => 'Ogłoszenie zostało zaktualizowane.',
            'notice' => new NoticeResource($notice),
        ]);
    }

    public function destroy(Request $request, Notice $notice): JsonResponse
    {
        $user = $request->user();

        if ($notice->organization_id !== $user->organizations()->first()->id) {
            return response()->json(['message' => 'Brak uprawnień do usunięcia tego ogłoszenia.'], 403);
        }

        $notice->delete();

        return response()->json([
            'message' => 'Ogłoszenie zostało usunięte.',
        ]);
    }
}
