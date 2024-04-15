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

    // /**
    //  * Read all Orders.
    //  *
    //  *
    //  * @return JsonResponse
    //  */
    // #[OAT\Get(
    //     path: '/api/orders',
    //     operationId: 'OrderController.readAll',
    //     summary: 'Read all orders',
    //     security: [['BearerToken' => []]],
    //     tags: ['orders'],
    //     responses: [
    //         new OAT\Response(
    //             response: HttpResponse::HTTP_OK,
    //             description: 'Ok',
    //             content: new OAT\JsonContent(ref: '#/components/schemas/OrderResourceCollection'),
    //         ),
    //     ]
    // )]
    // public function readAll(): JsonResponse
    // {
    //     $orders = $this->orderService->readAllOrders();

    //     return Response::json(OrderResource::collection($orders));
    // }

    /**
     * Read an Order
     *
     * @param int $id
     * @return JsonResponse
     */
    #[OAT\Get(
        path: '/api/orders/{id}',
        operationId: 'OrderController.read',
        summary: 'Read single order',
        tags: ['orders'],
        parameters: [
            new OAT\Parameter(
                name: 'id',
                in: 'path',
                required: true,
            ),
        ],
        responses: [
            new OAT\Response(
                response: HttpResponse::HTTP_OK,
                description: 'Ok',
                content: new OAT\JsonContent(ref: '#/components/schemas/OrderResource'),
            ),
        ]
    )]
    public function read(int $id): JsonResponse
    {
        $order = $this->orderService->getSingle($id);

        return Response::json(new OrderResource($order));
    }

    /**
     * Update an Order.
     *
     * @param string $id
     * @param CreateOrderRequest $request
     * @return JsonResponse
     */
    #[OAT\Put(
        path: '/api/orders/{id}',
        operationId: 'OrderController.update',
        summary: 'Update single order',
        requestBody: new OAT\RequestBody(
            required: true,
            content: new OAT\JsonContent(ref: '#/components/schemas/CreateOrderRequest')

        ),
        tags: ['orders'],
        parameters: [
            new OAT\Parameter(
                name: 'id',
                in: 'path',
                required: true,
            ),
        ],
        responses: [
            new OAT\Response(
                response: HttpResponse::HTTP_OK,
                description: 'Ok',
                content: new OAT\JsonContent(ref: '#/components/schemas/OrderResource'),
            ),
        ]
    )]
    public function update(string $id, CreateOrderRequest $request): JsonResponse
    {
        $order = $this->orderService->getSingle($id);

        return Response::json(new OrderResource($this->orderService->update($order, $request)));

    }

    /**
     * Delete an order.
     *
     * @param string $id
     * @return JsonResponse
     */
    #[OAT\Delete(
        path: '/api/orders/{id}',
        operationId: 'OrderController.delete',
        summary: 'Delete single order',
        tags: ['orders'],
        parameters: [
            new OAT\Parameter(
                name: 'id',
                in: 'path',
                required: true,
            ),
        ],
        responses: [
            new OAT\Response(
                response: HttpResponse::HTTP_NO_CONTENT,
                description: 'No content'
            ),
        ]
    )]
    public function delete(string $id): JsonResponse
    {
        $order = $this->orderService->getSingle($id);

        $this->orderService->delete($order);

        return Response::json(null, HttpResponse::HTTP_NO_CONTENT);

    }
}
