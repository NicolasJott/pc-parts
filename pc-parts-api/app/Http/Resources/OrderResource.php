<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Resources\Json\JsonResource;
use JsonSerializable;
use OpenApi\Attributes as OAT;

#[OAT\Schema(
    schema: 'OrderResource',
    properties: [
        new OAT\Property(property: 'id', type: 'integer', example: 1),
        new OAT\Property(property: 'firstName', type: 'string', example: 'John'),
        new OAT\Property(property: 'lastName', type: 'string', example: 'Doe'),
        new OAT\Property(property: 'email', type: 'string', example: 'john@example.com'),
        new OAT\Property(property: 'phoneNumber', type: 'string', example: '123-456-7890'),
        new OAT\Property(property: 'created_at', type: 'datetime', example: '2022-08-27T16:14:46.000000Z'),
        new OAT\Property(property: 'deliveryAddress', ref: '#/components/schemas/DeliveryAddressResource', type: 'object'),
        new OAT\Property(property: 'lineItems', ref: '#/components/schemas/LineItemResourceCollection'),
    ]
)]

#[OAT\Schema(
    schema: 'OrderResourceCollection',
    type: 'array',
    items: new OAT\Items(ref: '#/components/schemas/OrderResource')
)]

class OrderResource extends JsonResource
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
            'firstName' => $this->firstName,
            'lastName' => $this->lastName,
            'email' => $this->email,
            'phoneNumber' => $this->phoneNumber,
            'created_at' => $this->created_at,
            'deliveryAddress' => new DeliveryAddressResource($this->deliveryAddress),
            'lineItems' => LineItemResource::collection($this->lineItems),
        ];
    }
}
