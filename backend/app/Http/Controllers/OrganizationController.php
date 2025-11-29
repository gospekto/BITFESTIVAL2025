<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrganizationRequest;

class OrganizationController extends Controller
{
    public function index() {}

    public function store(OrganizationRequest $request)
    {

        return response()->json($organization, 201);
    }
}
