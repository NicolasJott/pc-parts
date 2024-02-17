<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use OpenApi\Attributes as OAT;

#[
    OAT\Info(
        version: '1.0.0',
        description: "## Introduction\n\n API documentation for PC Parts - REST API starter kit powered by Laravel, OpenAPI, Sanctum.\n\n- [GitHub](https://github.com/NicolasJott/pc-parts)",
        title: 'PC Parts',
    ),
    OAT\Server(url: 'http://127.0.0.1:8000', description: 'Local API server'),
    OAT\SecurityScheme(
        securityScheme: 'BearerToken',
        type: 'http',
        bearerFormat: 'JWT',
        scheme: 'bearer'
    ),
    OAT\Tag(name: 'auth', description: 'User authentication'),
    OAT\Tag(name: 'adminAuth', description: 'Admin authentication'),
    OAT\Tag(name: 'profile', description: 'User profile'),
    OAT\Tag(name: 'adminProfile', description: 'Admin profile'),
    OAT\Schema(
        schema: 'ValidationError',
        properties: [
            new OAT\Property(property: 'message', type: 'string', example: 'The given data was invalid.'),
            new OAT\Property(
                property: 'errors',
                properties: [
                    new OAT\Property(
                        property: 'key 1',
                        type: 'array',
                        items: new OAT\Items(type: 'string', example: 'Error message 1')
                    ),
                    new OAT\Property(
                        property: 'key 2',
                        type: 'array',
                        items: new OAT\Items(type: 'string', example: 'Error message 2')
                    ),
                ],
                type: 'object'
            ),

        ]
    )
]
class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
}
