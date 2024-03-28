<?php

namespace App\Http\Controllers;

use App\Http\Requests\Cart\AddCartItemRequest;
use App\Http\Resources\CartItemResource;
use App\Http\Resources\CartResource;
use App\Services\CartService;
use App\Services\CartItemService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Facades\Response;
use OpenApi\Attributes as OAT;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class CartController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @param  CartService  $cartService
     * @return void
     */
    public function __construct(private CartService $cartService, private CartItemService $cartItemService)
    {
        //
    }

    /**
     * create a cart
     *
     * @return JsonResponse
     */
    #[OAT\Post(
        path: '/api/cart',
        operationId: 'CartController.createCart',
        summary: 'Create a new cart',
        security: [['BearerToken' => []]],
        tags: ['cart'],
        responses: [
            new OAT\Response(
                response: HttpResponse::HTTP_CREATED,
                description: 'Created',
                content: new OAT\JsonContent(ref: '#/components/schemas/CartResource')
            ),
            new OAT\Response(
                response: HttpResponse::HTTP_UNPROCESSABLE_ENTITY,
                description: 'Unprocessable entity',
                content: new OAT\JsonContent(ref: '#/components/schemas/ValidationError')
            ),
        ]
    )]
    public function createCart(Request $request): JsonResponse
    {

        $cart = $this->cartService->createCart($request->user()->id);

        return Response::json(new CartResource($cart));
    }

    /**
     * Get a cart
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    #[OAT\Get(
        path: '/api/cart',
        operationId: 'CartController.getCart',
        summary: 'Get a cart',
        security: [['BearerToken' => []]],
        tags: ['cart'],
        responses: [
            new OAT\Response(
                response: HttpResponse::HTTP_OK,
                description: 'OK',
                content: new OAT\JsonContent(ref: '#/components/schemas/CartResource')
            ),
            new OAT\Response(
                response: HttpResponse::HTTP_NOT_FOUND,
                description: 'Not found',
                content: new OAT\JsonContent(ref: '#/components/schemas/ValidationError')
            ),
        ]
    )]
    public function getCart(Request $request): JsonResponse
    {
        $cart = $this->cartService->getCartByUserId($request->user()->id);

        if (!$cart) {
            throw new NotFoundHttpException('Cart not found');
        }

        return Response::json(new CartResource($cart));
    }

    /**
     * Add item to cart
     * 
     * @param AddCartItemRequest $request
     */
    #[OAT\Post(
        path: '/api/cart/item',
        operationId: 'CartController.addCartItem',
        summary: 'Add item to cart',
        security: [['BearerToken' => []]],
        tags: ['cart'],
        requestBody: new OAT\RequestBody(
            required: true,
            content: new OAT\JsonContent(ref: '#/components/schemas/AddCartItemRequest')

        ),
        responses: [
            new OAT\Response(
                response: HttpResponse::HTTP_OK,
                description: 'OK',
                content: new OAT\JsonContent(ref: '#/components/schemas/CartItemResource')
            ),
            new OAT\Response(
                response: HttpResponse::HTTP_NOT_FOUND,
                description: 'Not found',
                content: new OAT\JsonContent(ref: '#/components/schemas/ValidationError')
            ),
        ]
    )]
    public function addCartItem(AddCartItemRequest $request)
    {
        $cart = $this->cartService->getCartByUserId($request->user()->id);


        $cartItem = $this->cartItemService->createCartItem($cart->id, $request);

        return Response::json(new CartItemResource($cartItem));
    }


}
