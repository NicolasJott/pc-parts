<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Resources\Json\JsonResource;
use JsonSerializable;
use OpenApi\Attributes as OAT;

#[OAT\Schema(
    schema: 'CartResource',
    properties: [
        new OAT\Property(property: 'id', type: 'integer', example: 1),
        new OAT\Property(property: 'user_id', type: 'integer', example: 1),
        new OAT\Property(property: 'session_id', type: 'string', example: "12345"),
        new OAT\Property(property: 'total', type: 'float', example: 100.00),
        new OAT\Property(property: 'cartItems', ref: '#/components/schemas/CartItemResourceCollection'),
    ]
)]



class CartResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|Arrayable|JsonSerializable
     */
    public function toArray($request): array|Arrayable|JsonSerializable
    {

        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'session_id' => $this->session_id,
            'total' => $this->total,
            'cartItems' => CartItemResource::collection($this->cartItems)
        ];
    }
}
