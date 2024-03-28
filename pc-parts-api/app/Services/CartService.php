<?php

namespace App\Services;

use App\Models\Cart;
use App\Repositories\CartRepository;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Http\Response as HttpResponse;

class CartService
{

    /**
     * Create a new service instance.
     *
     * @param  CartRepository  $cartRepository
     * @return void
     */
    public function __construct(private CartRepository $cartRepository)
    {
        //
    }

    /**
     * Create a cart.
     *
     * @param  string  $user_id
     * @return Cart
     */
    public function createCart(int $user_id): Cart
    {

        $cart = $this->cartRepository->get(['user_id' => $user_id]);

        if ($cart) {
            throw new HttpException(HttpResponse::HTTP_BAD_REQUEST, 'Cart already exists');
        }

        return $this->cartRepository->create([
            'user_id' => $user_id,
            'total' => 0
        ]);
    }

    /**
     * Update the total of a cart.
     *
     * @param  Cart  $cart
     * @param  int  $total
     * @return Cart
     */
    public function updateCartTotal(Cart $cart, float $total): Cart
    {
        $cart->total = $total;
        $cart->save();

        return $cart;
    }

    /**
     * Get a cart by user id.
     *
     * @param  string  $user_id
     * @return Cart
     */
    public function getCartByUserId(int $user_id): Cart
    {
        $cart = $this->cartRepository->get(['user_id' => $user_id]);

        if (!$cart) {
            throw new HttpException(HttpResponse::HTTP_NOT_FOUND, 'Cart not found');
        }

        return $cart;
    }




}
