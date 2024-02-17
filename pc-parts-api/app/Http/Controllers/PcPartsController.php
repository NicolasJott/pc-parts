<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Application;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Response;

class PcPartsController extends Controller
{
    /**
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $response['status'] = 'ok';

        if (!App::environment('production')) {
            $response['laravel_version'] = Application::VERSION;
            $response['php_version'] = PHP_VERSION;
            $response['pc-parts_version'] = Config::get('pc-parts.version');
        }

        return Response::json($response);
    }
}
