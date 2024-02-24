<?php

namespace App\Http\Requests\Orders;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use OpenApi\Attributes as OAT;

#[OAT\Schema(
    schema: 'CreateOrderRequest',
    required: ['firstName', 'lastName', 'email', 'phoneNumber', 'deliveryAddress'],
    properties: [
        new OAT\Property(
            property: 'firstName',
            type: 'string',
            example: 'John'
        ),
        new OAT\Property(
            property: 'lastName',
            type: 'string',
            example: 'Doe'
        ),
        new OAT\Property(
            property: 'email',
            type: 'string',
            format: 'email',
            example: 'user@example.com'
        ),
        new OAT\Property(
            property: 'phoneNumber',
            type: 'string',
            example: '123-456-7890'
        ),
        new OAT\Property(
            property: 'products',
            type: 'array',
            example: [1, 2]
        ),
        new OAT\Property(
            property: 'deliveryAddress',
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
            ],
            type: 'object',
        ),
    ]
)]
class CreateOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'firstName' => [
                'required',
                'string',
            ],
            'lastName' => [
                'required',
                'string',
            ],
            'email' => [
                'required',
                'email',
            ],
            'phoneNumber' => [
                'required',
                'string',
            ],
            'deliveryAddress' => [
                'required',
                'array',
            ],
            'deliveryAddress.address1' => [
                'required',
                'string',
            ],
            'deliveryAddress.address2' => [
                'nullable',
                'string',
            ],
            'deliveryAddress.city' => [
                'required',
                'string',
            ],
            'deliveryAddress.state' => [
                'required',
                'string',
            ],
            'deliveryAddress.zipCode' => [
                'required',
                'integer',
            ],
            'products' => [
                'required',
                'array',
            ]
        ];
    }
}
