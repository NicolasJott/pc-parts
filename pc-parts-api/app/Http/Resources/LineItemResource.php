<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Resources\Json\JsonResource;
use JsonSerializable;
use OpenApi\Attributes as OAT;

#[OAT\Schema(
    schema: 'LineItemResource',
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
            property: 'product_id',
            type: 'integer',
            example: 1,
        ),
        new OAT\Property(
            property: 'quantity',
            type: 'integer',
            example: 1,
        ),
        new OAT\Property(
            property: 'price',
            type: 'number',
            example: 100.00,
        ),

    ]
)]

#[OAT\Schema(
    schema: 'LineItemResourceCollection',
    type: 'array',
    items: new OAT\Items(ref: '#/components/schemas/LineItemResource')
)]

class LineItemResource extends JsonResource
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
            'order_id' => $this->order_id,
            'product_id' => $this->product_id,
            'quantity' => $this->quantity,
            'price' => $this->price,
        ];
    }
}
