<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\SatelliteController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// public routes
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

// protected routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/satellites', [SatelliteController::class, 'index']);
    Route::post('/satellites', [SatelliteController::class, 'store']);
    Route::get('/satellites/{id}', [SatelliteController::class, 'show']);
    Route::put('/satellites/{id}', [SatelliteController::class, 'update']);
    Route::delete('/satellites/{id}', [SatelliteController::class, 'destroy']);

    Route::get('/user', [UserController::class, 'index']);
    Route::put('/user', [UserController::class, 'update']);

    Route::post('/auth/logout', [AuthController::class, 'logout']);
});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
