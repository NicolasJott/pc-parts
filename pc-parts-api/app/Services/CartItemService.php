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
     * @param 
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

    /**
     * Get a cart item.
     *
     * @param  int  $id
     * @return CartItem
     */
    public function getCartItem(int $id): CartItem
    {
        return $this->cartItemRepository->get(['id' => $id]);
    }

    /**
     * Remove a cart item.
     *
     * @param  CartItem  $cartItem
     * @return void
     */
    public function removeCartItem(CartItem $cartItem): void
    {
        $this->cartItemRepository->delete($cartItem);
    }

    /**
     * Increment quantity to a cart item.
     *
     * @param  CartItem  $cartItem
     * @return bool
     */
    public function addQuantity(CartItem $cartItem): bool
    {
        return $this->cartItemRepository->update($cartItem, [
            'quantity' => $cartItem->quantity + 1
        ]);

    }

    /**
     * Decrement quantity to a cart item.
     *
     * @param  CartItem  $cartItem
     * @return bool
     */
    public function removeQuantity(CartItem $cartItem): bool
    {
        return $this->cartItemRepository->update($cartItem, [
            'quantity' => $cartItem->quantity - 1
        ]);
    }




}
