<?php

use App\Http\Controllers\CartController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'cart'], function () {
    Route::post('/', [CartController::class, 'createCart']);
    Route::get('/', [CartController::class, 'getCart']);
    Route::post('/item', [CartController::class, 'addCartItem']);
});
