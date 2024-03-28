<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Resources\Json\JsonResource;
use JsonSerializable;
use OpenApi\Attributes as OAT;

#[OAT\Schema(
    schema: 'CartItemResource',
    properties: [
        new OAT\Property(
            property: 'id',
            type: 'integer',
            example: 1,
        ),
        new OAT\Property(
            property: 'quantity',
            type: 'integer',
            example: 1,
        ),
        new OAT\Property(
            property: 'cart_id',
            type: 'integer',
            example: 1,
        ),
    ]
)]

#[OAT\Schema(
    schema: 'CartItemResourceCollection',
    type: 'array',
    items: new OAT\Items(ref: '#/components/schemas/CartItemResource')
)]

class CartItemResource extends JsonResource
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
            'quantity' => $this->quantity,
            'cart_id' => $this->cart_id,
        ];
    }
}
