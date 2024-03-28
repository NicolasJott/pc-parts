<?php

namespace App\Services;

use App\Models\CartItem;
use App\Repositories\CartItemRepository;
use App\Http\Requests\Cart\AddCartItemRequest;

class CartItemService
{

    /**
     * Create a new service instance.
     *
     * @param  CartItemRepository  $cartItemRepository
     * @return void
     */
    public function __construct(private CartItemRepository $cartItemRepository)
    {
        //
    }

    /**
     * Create a cart item.
     *
     * @param  int  $cart_id
     * @param  int  $product_id
     * @param  int  $quantity
     * @return CartItem
     */
    public function createCartItem(int $cart_id, AddCartItemRequest $request): CartItem
    {
        return $this->cartItemRepository->create([
            'cart_id' => $cart_id,
            'product_id' => $request->product_id,
            'quantity' => $request->quantity
        ]);
    }




}
