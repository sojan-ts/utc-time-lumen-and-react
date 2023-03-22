<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Date;
use Carbon\Carbon;

class DateController extends Controller
{
    public function store(Request $request)
    {
        $date = new Date();
        $date->utc_date = Carbon::now('UTC');
        $date->save();
        return response()->json(['message' => 'Date saved successfully'], 201);
    }

    public function index()
    {

        $dates = Date::all();
        $timestamps = [];
        foreach ($dates as $date) {
            $timestamps[] = strtotime($date->utc_date);
        }
        return response()->json($timestamps);
    }


    public function getDateTimeForAllTimezones()
{
    $dates = Date::all();
    $timezones = \DateTimeZone::listIdentifiers();
    $result = [];
    foreach ($dates as $date) {
        $utc_date = Carbon::parse($date->utc_date);
        $datesByTimezone = [];
        foreach ($timezones as $timezone) {
            $formattedDate = $utc_date->copy()->tz($timezone)->format('Y-m-d H:i:s');
            $timezoneName = str_replace('_', ' ', $timezone);
            $datesByTimezone[] = ['timezone' => $timezoneName, 'datetime' => $formattedDate];
        }
        $result[] = ['utc_date' => $date->utc_date, 'dates' => $datesByTimezone];
    }
    return response()->json(['result' => $result]);
}

public function getDateTimeForTimezone(Request $request)
{
    $timezone = $request->input('timezone');
    $date = Date::first();
    $now = Carbon::parse($date->utc_date)->timezone($timezone)->format('Y-m-d H:i:s');

    return response()->json(['datetime' => $now]);
}


}
