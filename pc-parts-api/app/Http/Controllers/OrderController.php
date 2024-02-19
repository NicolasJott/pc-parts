<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Services\OrderService;
use App\Http\Requests\Orders\CreateOrderRequest;
use App\Http\Resources\OrderResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Facades\Response;
use OpenApi\Attributes as OAT;

class OrderController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @param  OrderService  $orderService
     * @return void
     */
    public function __construct(private OrderService $orderService)
    {
        //
    }

    /**
     * Create an Order.
     *
     * @param  CreateOrderRequest  $request
     * @return JsonResponse
     */
    #[OAT\Post(
        path: '/api/orders',
        operationId: 'OrderController.create',
        summary: 'Create order',
        security: [['BearerToken' => []]],
        requestBody: new OAT\RequestBody(
            required: true,
            content: new OAT\JsonContent(ref: '#/components/schemas/CreateOrderRequest')

        ),
        tags: ['orders'],
        responses: [
            new OAT\Response(
                response: HttpResponse::HTTP_OK,
                description: 'Ok',
                content: new OAT\JsonContent(ref: '#/components/schemas/OrderResource')
            ),
        ]
    )]
    public function create(CreateOrderRequest $request): JsonResponse
    {
        $order = $this->orderService->createOrder($request);

        return Response::json(new OrderResource($order));
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
