<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Date;
use Carbon\Carbon;

class DateController extends Controller
{
    public function store(Request $request)
    {
        // Insert the current date in UTC
        $date = new Date();
        $date->utc_date = Carbon::now('UTC');
        $date->save();
        return response()->json(['message' => 'Date saved successfully'], 201);
    }

    public function index()
    {
        // Retrieve all dates as timestamps
        $dates = Date::all();
        $timestamps = [];
        foreach ($dates as $date) {
            $timestamps[] = strtotime($date->utc_date);
        }
        return response()->json($timestamps);
    }
}
