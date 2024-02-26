<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Resources\Json\JsonResource;
use JsonSerializable;
use OpenApi\Attributes as OAT;

#[OAT\Schema(
    schema: 'ProductResource',
    properties: [
        new OAT\Property(property: 'id', type: 'integer', example: 1),
        new OAT\Property(property: 'name', type: 'string', example: 'AMD - Ryzen 7 7800X3D 8-Core - 16-Thread 4.2 GHz (5.0 GHz Max Boost) Socket AM5 Unlocked Desktop Processor - Black'),
        new OAT\Property(property: 'model', type: 'string', example: '100-100000910WOF'),
        new OAT\Property(property: 'price', type: 'float', example: 369.00),
        new OAT\Property(property: 'category', type: 'string', example: 'CPU'),
        new OAT\Property(property: 'product_image', type: 'string', example: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6537/6537139cv11d.jpg;maxHeight=200;maxWidth=300'),
        new OAT\Property(property: 'description', type: 'string', example: 'AMD Ryzen 7 7800X3D The dominant gaming processor with AMD 3D V-Cache technology for even more game performance.  Whatever the setting, whatever the resolution, lead your team to victory with this incredible gaming processor.  Plus, enjoy the benefits of next-gen AMD 3D V-Cache technology for lower latency and even more game performance. '),
        new OAT\Property(property: 'specifications', type: 'array', example: ["Socket AM5 (LGA 1718)", "4.2 gigahertz", "5 gigahertz", "8-core", "16", "Yes"]),
    ]
)]

#[OAT\Schema(
    schema: 'ProductResourceCollection',
    type: 'array',
    items: new OAT\Items(ref: '#/components/schemas/ProductResource')
)]

class ProductResource extends JsonResource
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
            'name' => $this->name,
            'model' => $this->model,
            'price' => $this->price,
            'category' => $this->category,
            'product_image' => $this->product_image,
            'description' => $this->description,
            'specifications' => $this->specifications,
        ];
    }
}
