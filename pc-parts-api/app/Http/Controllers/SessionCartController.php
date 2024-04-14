<?php

namespace App\Http\Controllers;

use App\Http\Requests\Cart\AddCartItemRequest;
use App\Http\Resources\CartItemResource;
use App\Http\Resources\CartResource;
use App\Services\CartService;
use App\Services\CartItemService;
use App\Services\ProductService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Facades\Response;
use OpenApi\Attributes as OAT;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class SessionCartController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @param  CartService  $cartService
     * @param  CartItemService  $cartItemService
     * @param  ProductService  $productService
     * @return void
     */
    public function __construct(private CartService $cartService, private CartItemService $cartItemService, private ProductService $productService)
    {
        //
    }

    /**
     * create a cart
     *
     * @return JsonResponse
     */
    #[OAT\Post(
        path: '/api/cart/session',
        operationId: 'SessionCartController.createCart',
        summary: 'Create a new cart',
        tags: ['cart/session'],
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
        $cart = $this->cartService->createWithSessionId($request->cookie('cart_id'));

        return Response::json(new CartResource($cart));
    }

    /**
     * Get a cart
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    #[OAT\Get(
        path: '/api/cart/session',
        operationId: 'SessionCartController.getCart',
        summary: 'Get a cart',
        tags: ['cart/session'],
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


        $cart = null;

        if (!$cart && $request->cookie('cart_id')) {
            $cartId = $request->cookie('cart_id');
            $cart = $this->cartService->getCartBySessionId($cartId);

            if (!$cart) {
                $cart = $this->cartService->createWithSessionId($cartId);
            }
        }

        return Response::json(new CartResource($cart));
    }

    /**
     * Add item to cart
     * 
     * @param AddCartItemRequest $request
     */
    #[OAT\Post(
        path: '/api/cart/session/item',
        operationId: 'SessionCartController.addCartItem',
        summary: 'Add item to cart',
        tags: ['cart/session'],
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
        $sessionId = $request->cookie('cart_id');
        $cart = $this->cartService->getCartBySessionId($sessionId);

        if (!$cart) {
            $cart = $this->cartService->createWithSessionId($sessionId);
        }

        $product = $this->productService->getById($request->product_id);

        if (!$product) {
            throw new NotFoundHttpException('Product not found');
        }

        $cartItem = $this->cartItemService->createCartItem($cart->id, $request);

        $this->cartService->updateCartTotal($cart, $cart->total + ($product->price * $request->quantity));

        return Response::json(new CartItemResource($cartItem));
    }

    /**
     * Get cart item
     * 
     * @param int $id
     */
    #[OAT\Get(
        path: '/api/cart/session/item/{id}',
        operationId: 'SessionCartController.getCartItem',
        summary: 'Get cart item by id',
        tags: ['cart/session'],
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
                description: 'OK',
                content: new OAT\JsonContent(ref: '#/components/schemas/CartItemResource')
            ),
            new OAT\Response(
                response: HttpResponse::HTTP_NO_CONTENT,
                description: 'No content',
            ),
            new OAT\Response(
                response: HttpResponse::HTTP_NOT_FOUND,
                description: 'Not found',
                content: new OAT\JsonContent(ref: '#/components/schemas/ValidationError')
            ),
        ]
    )]
    public function getCartItem(int $id)
    {
        $cartItem = $this->cartItemService->getCartItem($id);

        if (!$cartItem) {
            throw new NotFoundHttpException('Cart item not found');
        }

        return Response::json(new CartItemResource($cartItem));
    }


    /**
     * Remove item from cart
     * 
     * @param int $id
     */
    #[OAT\Delete(
        path: '/api/cart/session/item/{id}',
        operationId: 'SessionCartController.removeCartItem',
        summary: 'Remove item from cart',
        tags: ['cart/session'],
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
                description: 'No content',
            ),
            new OAT\Response(
                response: HttpResponse::HTTP_NOT_FOUND,
                description: 'Not found',
                content: new OAT\JsonContent(ref: '#/components/schemas/ValidationError')
            ),
        ]
    )]
    public function removeCartItem(int $id)
    {
        $cartItem = $this->cartItemService->getCartItem($id);

        if (!$cartItem) {
            throw new NotFoundHttpException('Cart item not found');
        }

        $this->cartService->updateCartTotal($cartItem->cart, $cartItem->cart->total - ($cartItem->product->price * $cartItem->quantity));

        $this->cartItemService->removeCartItem($cartItem);

        return Response::json(null, HttpResponse::HTTP_NO_CONTENT);
    }

    /**
     * Update cart item
     * 
     * @param int $id
     * @param string $method
     */
    #[OAT\Put(
        path: '/api/cart/session/item/{id}',
        operationId: 'SessionCartController.updateCartItem',
        summary: 'Update cart item',
        tags: ['cart/session'],
        parameters: [
            new OAT\Parameter(
                name: 'id',
                in: 'path',
                required: true,
            ),
            new OAT\Parameter(
                name: 'method',
                in: 'query',
                required: true,
            ),
        ],
        responses: [
            new OAT\Response(
                response: HttpResponse::HTTP_NO_CONTENT,
                description: 'No content',
            ),
            new OAT\Response(
                response: HttpResponse::HTTP_NOT_FOUND,
                description: 'Not found',
                content: new OAT\JsonContent(ref: '#/components/schemas/ValidationError')
            ),
        ]
    )]
    public function updateCartItem(int $id, Request $request)
    {
        $cartItem = $this->cartItemService->getCartItem($id);
        $method = $request->query('method');

        if (!$cartItem) {
            throw new NotFoundHttpException('Cart item not found');
        }

        if ($method === 'add') {
            $this->cartService->updateCartTotal($cartItem->cart, $cartItem->cart->total + $cartItem->product->price);
            $this->cartItemService->addQuantity($cartItem);
        } else if ($method === 'remove') {
            $this->cartService->updateCartTotal($cartItem->cart, $cartItem->cart->total - $cartItem->product->price);
            $this->cartItemService->removeQuantity($cartItem);
        }

        return Response::json(null, HttpResponse::HTTP_NO_CONTENT);
    }

}
