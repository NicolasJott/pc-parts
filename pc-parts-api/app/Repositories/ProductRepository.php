<?php

namespace App\Repositories;

use App\Models\Product;

class ProductRepository extends BaseRepository
{
    /**
     * Create a new repository instance.
     *
     * @param  Product $product
     * @return void
     */
    public function __construct(Product $product)
    {
        $this->model = $product;
    }
}
