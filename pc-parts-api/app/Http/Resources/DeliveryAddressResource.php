<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Resources\Json\JsonResource;
use JsonSerializable;
use OpenApi\Attributes as OAT;

#[OAT\Schema(
    schema: 'DeliveryAddressResource',
    properties: [
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
    ]
)]

class DeliveryAddressResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  array  $excludeFields Fields to exclude from the resource.
     * @return array|Arrayable|JsonSerializable
     */
    public function toArray($request, array $excludeFields = []): array|Arrayable|JsonSerializable
    {
        $data = [
            'address1' => $this->address1,
            'address2' => $this->address2,
            'city' => $this->city,
            'state' => $this->state,
            'zipCode' => $this->zipCode,
        ];

        foreach ($excludeFields as $field) {
            unset($data[$field]);
        }

        return $data;

    }
}
