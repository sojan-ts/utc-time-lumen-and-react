<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->post('/dates', ['uses' => 'DateController@store' ]);
$router->get('/dates', ['uses' => 'DateController@index' ]);
$router->get('/datestz', ['uses' => 'DateController@getDateTimeForAllTimezones' ]);
$router->get('/datesspecifictz', ['uses' => 'DateController@getDateTimeForTimezone' ]);
