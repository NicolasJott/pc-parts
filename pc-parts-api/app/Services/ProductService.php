<?php

namespace App\Services;

use App\Models\Product;
use App\Repositories\ProductRepository;

class ProductService
{
    /**
     * Create a new service instance.
     *
     * @param  ProductRepository  $productRepository
     * @return void
     */
    public function __construct(private ProductRepository $productRepository)
    {
        //
    }


    /**
     * @return mixed
     */
    public function getMulti(): mixed
    {
        return $this->productRepository->all();
    }

    /**
     * @param string $category
     * @return mixed
     */
    public function getByCategory(string $category): mixed
    {
        return $this->productRepository->get(['category' => $category], false);
    }
}
