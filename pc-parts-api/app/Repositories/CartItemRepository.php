<?php

namespace App\Repositories;

use App\Models\CartItem;

class CartItemRepository extends BaseRepository
{
    /**
     * Create a new repository instance.
     *
     * @param  CartItem  $cart_item
     * @return void
     */
    public function __construct(CartItem $cart_item)
    {
        $this->model = $cart_item;
    }
}
