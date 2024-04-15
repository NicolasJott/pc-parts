<?php

use App\Http\Controllers\CartController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'cart'], function () {
    Route::post('/', [CartController::class, 'createCart']);
    Route::get('/', [CartController::class, 'getCart']);
    Route::post('/item', [CartController::class, 'addCartItem']);
    Route::get('/item/{id}', [CartController::class, 'getCartItem']);
    Route::delete('/item/{id}', [CartController::class, 'removeCartItem']);
    Route::put('/item/{id}', [CartController::class, 'updateCartItem']);
    Route::delete('/', [CartController::class, 'clearCart']);
});



