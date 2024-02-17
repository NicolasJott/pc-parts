<?php

use App\Http\Controllers\PcPartsController;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Route;

Route::get('/', [PcPartsController::class, 'index']);

if (Config::get('app.debug')) {
    Route::get('/logs', '\Rap2hpoutre\LaravelLogViewer\LogViewerController@index');
}

if (Config::get('pc-parts.api_doc.display_swagger_ui')) {
    Route::get('/swagger-ui', function () {
        return view('swagger.index');
    });
}

if (Config::get('pc-parts.api_doc.display_redoc')) {
    Route::get('/redoc', function () {
        return view('openapi-spec.redoc');
    });
}

if (Config::get('pc-parts.api_doc.display_swagger_ui')) {
    Route::get('/swagger-ui', function () {
        return view('openapi-spec.swagger');
    });
}
