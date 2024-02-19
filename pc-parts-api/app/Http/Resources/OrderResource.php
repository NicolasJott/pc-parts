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
        new OAT\Property(
            property: 'deliveryAddress',
            properties: [
                new OAT\Property(
                    property: 'id',
                    type: 'integer',
                    example: 1
                ),
                new OAT\Property(
                    property: 'order_id',
                    type: 'integer',
                    example: 1
                ),
                new OAT\Property(
                    property: 'address1',
                    type: 'string',
                    example: '123 Easy Street'
                ),
                new OAT\Property(
                    property: 'address2',
                    type: 'string',
                    example: 'Apt. 309'
                ),
                new OAT\Property(
                    property: 'city',
                    type: 'string',
                    example: 'Youngstown'
                ),
                new OAT\Property(
                    property: 'state',
                    type: 'string',
                    example: 'OH'
                ),
                new OAT\Property(
                    property: 'zipCode',
                    type: 'integer',
                    example: 123456,
                ),
            ],
            type: 'object',
        ),
    ]
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
            'deliveryAddress' => $this->deliveryAddress,
        ];
    }
}
