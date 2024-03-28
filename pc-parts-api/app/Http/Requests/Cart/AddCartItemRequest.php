<?php

namespace App\Http\Requests\Cart;

use Illuminate\Foundation\Http\FormRequest;
use OpenApi\Attributes as OAT;

#[OAT\Schema(
    schema: 'AddCartItemRequest',
    required: ['product_id', 'quantity', 'cart_id'],
    properties: [
        new OAT\Property(
            property: 'product_id',
            type: 'integer',
            example: 1
        ),
        new OAT\Property(
            property: 'quantity',
            type: 'integer',
            example: 1,
        ),
    ]
)]
class AddCartItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'product_id' => [
                'required',
                'integer',
            ],
            'quantity' => [
                'required',
                'integer',
            ],
        ];
    }
}
