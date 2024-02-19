<?php

namespace App\Repositories;

use App\Models\DeliveryAddress;

class DeliveryAddressRepository extends BaseRepository
{
    /**
     * Create a new repository instance.
     *
     * @param  DeliveryAddress  $deliveryAddress
     * @return void
     */
    public function __construct(DeliveryAddress $deliveryAddress)
    {
        $this->model = $deliveryAddress;
    }
}
