<?php

namespace App\Repositories;

use App\Models\Cart;

class CartRepository extends BaseRepository
{
    /**
     * Create a new repository instance.
     *
     * @param  Cart  $cart
     * @return void
     */
    public function __construct(Cart $cart)
    {
        $this->model = $cart;
    }
}
