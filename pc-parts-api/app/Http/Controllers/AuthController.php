<?php

namespace App\Http\Controllers;

use App\Events\UserSignedUp;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\SignupRequest;
use App\Http\Resources\AccessTokenResource;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Facades\Response;
use OpenApi\Attributes as OAT;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class AuthController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @param  AuthService  $authService
     * @return void
     */
    public function __construct(private AuthService $authService)
    {
        //
    }

    /**
     * Signup a user.
     *
     * @param  SignupRequest  $request
     * @return JsonResponse
     */
    #[OAT\Post(
        path: '/api/signup',
        operationId: 'AuthController.signup',
        summary: 'Signup a user',
        requestBody: new OAT\RequestBody(
            required: true,
            content: new OAT\JsonContent(ref: '#/components/schemas/SignupRequest')

        ),
        tags: ['auth'],
        responses: [
            new OAT\Response(
                response: HttpResponse::HTTP_CREATED,
                description: 'Created',
                content: new OAT\JsonContent(ref: '#/components/schemas/AccessTokenResource')
            ),
            new OAT\Response(
                response: HttpResponse::HTTP_UNPROCESSABLE_ENTITY,
                description: 'Unprocessable entity',
                content: new OAT\JsonContent(ref: '#/components/schemas/ValidationError')
            ),
        ]
    )]
    public function signup(SignupRequest $request): JsonResponse
    {
        $user = $this->authService->signupUser($request);

        UserSignedUp::dispatch($user);

        $token = $user->createToken('auth-token');


        return Response::json(new AccessTokenResource($token), HttpResponse::HTTP_CREATED);
    }

    /**
     * Login a user.
     *
     * @param  LoginRequest  $request
     * @return JsonResponse
     *
     * @throws HttpException
     * @throws NotFoundHttpException
     */
    #[OAT\Post(
        path: '/api/login',
        operationId: 'AuthController.login',
        summary: 'Login a user',
        requestBody: new OAT\RequestBody(
            required: true,
            content: new OAT\JsonContent(ref: '#/components/schemas/LoginRequest')

        ),
        tags: ['auth'],
        responses: [
            new OAT\Response(
                response: HttpResponse::HTTP_OK,
                description: 'Ok',
                content: new OAT\JsonContent(ref: '#/components/schemas/AccessTokenResource')
            ),
            new OAT\Response(
                response: HttpResponse::HTTP_UNPROCESSABLE_ENTITY,
                description: 'Unprocessable entity',
                content: new OAT\JsonContent(ref: '#/components/schemas/ValidationError')
            ),
            new OAT\Response(
                response: HttpResponse::HTTP_UNAUTHORIZED,
                description: 'Unauthorized',
                content: new OAT\JsonContent(
                    properties: [
                        new OAT\Property(
                            property: 'message',
                            type: 'string',
                            example: 'Invalid credentials.'
                        ),
                    ]
                )
            ),
        ]
    )]
    public function login(LoginRequest $request): JsonResponse
    {
        $user = $this->authService->loginUser($request);
        $token = $user->createToken('auth-token');

        return Response::json(new AccessTokenResource($token));
    }

    /**
     * Logout a user.
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    #[OAT\Post(
        path: '/api/logout',
        operationId: 'AuthController.logout',
        summary: 'Logout a user',
        security: [['BearerToken' => []]],
        tags: ['auth'],
        responses: [
            new OAT\Response(
                response: HttpResponse::HTTP_NO_CONTENT,
                description: 'No content'
            ),
        ]
    )]
    public function logout(Request $request): JsonResponse
    {
        $this->authService->logoutUser($request->user());

        return Response::json(null, HttpResponse::HTTP_NO_CONTENT);
    }
}
