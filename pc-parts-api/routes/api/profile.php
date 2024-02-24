<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'profile'], function () {
    Route::get('/', [ProfileController::class, 'me']);
    Route::get('/orders', [ProfileController::class, 'myOrders']);
    Route::delete('/', [ProfileController::class, 'delete']);
});
