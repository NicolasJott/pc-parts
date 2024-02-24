<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Http\Resources\OrderResource;
use App\Services\OrderService;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Facades\Response;
use OpenApi\Attributes as OAT;

class ProfileController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @param  UserService  $authService
     * @param  OrderService  $orderService
     * @return void
     */
    public function __construct(private UserService $userService, private OrderService $orderService)
    {
        //
    }

    /**
     * Get the authenticated user.
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    #[OAT\Get(
        path: '/api/profile',
        operationId: 'ProfileController.me',
        summary: 'me',
        security: [['BearerToken' => []]],
        tags: ['profile'],
        responses: [
            new OAT\Response(
                response: HttpResponse::HTTP_OK,
                description: 'Ok',
                content: new OAT\JsonContent(ref: '#/components/schemas/UserResource')
            ),
        ]
    )]
    public function me(Request $request): JsonResponse
    {
        return Response::json(new UserResource($request->user()));
    }

    /**
     * Get the authenticated user's orders.
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    #[OAT\Get(
        path: '/api/profile/orders',
        operationId: 'ProfileController.myOrders',
        summary: 'my orders',
        security: [['BearerToken' => []]],
        tags: ['profile'],
        responses: [
            new OAT\Response(
                response: HttpResponse::HTTP_OK,
                description: 'Ok',
                content: new OAT\JsonContent(ref: '#/components/schemas/OrderResourceCollection'),
            ),
        ]
    )]
    public function myOrders(Request $request): JsonResponse
    {

        $orders = $this->orderService->getOrdersForUser($request->user());
        return Response::json(OrderResource::collection($orders));
    }

    /**
     * Delete the authenticated user.
     *
     * @param Request $request
     * @return JsonResponse
     */
    #[OAT\Delete(
        path: '/api/profile',
        operationId: 'ProfileController.delete',
        summary: 'delete current user',
        security: [['BearerToken' => []]],
        tags: ['profile'],
        responses: [
            new OAT\Response(
                response: HttpResponse::HTTP_NO_CONTENT,
                description: 'No content'
            ),
        ]
    )]
    public function delete(Request $request): JsonResponse
    {
        $this->userService->delete($request->user());

        return Response::json(null, HttpResponse::HTTP_NO_CONTENT);
    }
}
