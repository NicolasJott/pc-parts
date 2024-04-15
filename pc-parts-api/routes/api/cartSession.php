<?php

use App\Http\Controllers\SessionCartController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'cart/session'], function () {
    Route::post('/', [SessionCartController::class, 'createCart']);
    Route::get('/', [SessionCartController::class, 'getCart']);
    Route::post('/item', [SessionCartController::class, 'addCartItem']);
    Route::get('/item/{id}', [SessionCartController::class, 'getCartItem']);
    Route::delete('/item/{id}', [SessionCartController::class, 'removeCartItem']);
    Route::put('/item/{id}', [SessionCartController::class, 'updateCartItem']);
    Route::delete('/', [SessionCartController::class, 'clearCart']);
});



