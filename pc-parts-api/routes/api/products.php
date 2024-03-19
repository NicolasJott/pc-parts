<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'products'], function () {
    Route::get('/{id}', [ProductController::class, 'readById']);
    Route::get('/{category}', [ProductController::class, 'readByCategory']);
    Route::get('/', [ProductController::class, 'readAll']);
});
