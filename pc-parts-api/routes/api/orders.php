<?php

use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'orders'], function () {
    Route::post('/', [OrderController::class, 'create']);
    Route::get('/', [OrderController::class, 'readAll']);
    Route::get('/{id}', [OrderController::class, 'read']);
    Route::put('/{id}', [OrderController::class, 'update']);
});
