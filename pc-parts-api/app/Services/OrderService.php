<?php

namespace App\Services;

use App\Models\Order;
use App\Repositories\OrderRepository;
use App\Repositories\DeliveryAddressRepository;
use App\Http\Requests\Orders\CreateOrderRequest;

class OrderService
{
    /**
     * Create a new service instance.
     *
     * @param OrderRepository $orderRepository
     * @param DeliveryAddressRepository $deliveryAddressRepository
     * @return void
     */
    public function __construct(private OrderRepository $orderRepository, private DeliveryAddressRepository $deliveryAddressRepository)
    {
        //
    }

    /**
     * Create an order.
     *
     * @param  CreateOrderRequest  $request
     * @return Order
     */
    public function createOrder(CreateOrderRequest $request): Order
    {
        $order = $this->orderRepository->create([
            'firstName' => $request->firstName,
            'lastName' => $request->lastName,
            'email' => $request->email,
            'phoneNumber' => $request->phoneNumber,
        ]);

        $this->deliveryAddressRepository->create([
            'order_id' => $order->id,
            'address1' => $request->deliveryAddress['address1'],
            'address2' => $request->deliveryAddress['address2'],
            'city' => $request->deliveryAddress['city'],
            'state' => $request->deliveryAddress['state'],
            'zipCode' => $request->deliveryAddress['zipCode'],
        ]);

        return $order;
    }

     /**
      * Read all orders.
      *
      * @return \Illuminate\Database\Eloquent\Collection
      */
     public function readAllOrders(): \Illuminate\Database\Eloquent\Collection
     {
         return $this->orderRepository->all();
     }


}
