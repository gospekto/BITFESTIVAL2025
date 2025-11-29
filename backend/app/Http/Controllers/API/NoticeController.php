<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Notice;
use Illuminate\Http\Request;

class NoticeController extends Controller
{
    public function index()
    {
        return Notice::with('organization', 'registeredUsers')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'           => 'required|string',
            'category'        => 'required|string',
            'date'            => 'required|date',
            'time'            => 'required',
            'description'     => 'required|string',
            'location'        => 'required|string',
            'image_path'      => 'nullable|string',
            'organization_id' => 'required|exists:organizations,id',
            'max_people'      => 'required|integer|min:1',
        ]);

        $notice = Notice::create([
            'title'           => $request->title,
            'category'        => $request->category,
            'date'            => $request->date,
            'time'            => $request->time,
            'description'     => $request->description,
            'location'        => $request->location,
            'image_path'      => $request->image_path,
            'organization_id' => $request->organization_id,
            'max_people'      => $request->max_people,
        ]);

        return response()->json($notice, 201);
    }

    public function show($id)
    {
        return Notice::with('organization', 'registeredUsers')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $notice = Notice::findOrFail($id);

        $request->validate([
            'title'           => 'sometimes|required|string',
            'category'        => 'sometimes|required|string',
            'date'            => 'sometimes|required|date',
            'time'            => 'sometimes|required',
            'description'     => 'sometimes|required|string',
            'location'        => 'sometimes|required|string',
            'image_path'      => 'sometimes|nullable|string',
            'organization_id' => 'sometimes|required|exists:organizations,id',
            'max_people'      => 'sometimes|required|integer|min:1',
        ]);

        $notice->fill($request->all());
        $notice->save();

        return response()->json($notice);
    }

    public function destroy($id)
    {
        Notice::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
