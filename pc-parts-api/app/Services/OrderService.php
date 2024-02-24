<?php

namespace App\Services;

use App\Models\Order;
use App\Repositories\OrderRepository;
use App\Repositories\DeliveryAddressRepository;
use App\Repositories\LineItemRepository;
use App\Http\Requests\Orders\CreateOrderRequest;

class OrderService
{
    /**
     * Create a new service instance.
     *
     * @param OrderRepository $orderRepository
     * @param DeliveryAddressRepository $deliveryAddressRepository
     * @param LineItemRepository $lineItemRepository
     * @return void
     */
    public function __construct(private OrderRepository $orderRepository, private DeliveryAddressRepository $deliveryAddressRepository, private LineItemRepository $lineItemRepository, private ProductService $productService)
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


        foreach ($request->products as $item) {
            $product = $this->productService->getById($item['id']);
            $formattedPrice = str_replace('$', '', $product->price);


            $this->lineItemRepository->create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'quantity' => $item['quantity'],
                'price' => $formattedPrice,
            ]);
        }


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

    /**
     * Get single order.
     *
     * @param string $id
     * @return Order
     */
    public function getSingle(string $id): Order
    {
        $order = $this->orderRepository->get(['id' => $id]);

        if (!$order) {
            return abort(404, "Order with this id does not exist.");
        }

        return $this->orderRepository->get(['id' => $id]);
    }

    /**
     * Update single order.
     *
     * @param Order $order
     * @param CreateOrderRequest $request
     * @return Order
     */
    public function update(Order $order, CreateOrderRequest $request): Order
    {
        $this->orderRepository->update($order, [
            'firstName' => $request->firstName,
            'lastName' => $request->lastName,
            'email' => $request->email,
            'phoneNumber' => $request->phoneNumber,
        ]);

        $deliveryAddress = $this->deliveryAddressRepository->get(['order_id' => $order->id]);

        $this->deliveryAddressRepository->update($deliveryAddress, [
            'address1' => $request->deliveryAddress['address1'],
            'address2' => $request->deliveryAddress['address2'],
            'city' => $request->deliveryAddress['city'],
            'state' => $request->deliveryAddress['state'],
            'zipCode' => $request->deliveryAddress['zipCode'],
        ]);

        return $this->getSingle($order->id);

    }


    /**
     * Delete single order
     *
     * @param Order $order
     * @return bool
     */
    public function delete(Order $order): bool
    {
        return $this->orderRepository->delete($order);
    }
}
