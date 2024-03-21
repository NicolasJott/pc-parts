<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Resources\Json\JsonResource;
use JsonSerializable;
use OpenApi\Attributes as OAT;


class LoggedInUserResource extends JsonResource
{
    /**
     * Create a new Resource instance.
     *
     * @param  User  $user
     * @return void
     */
    public function __construct(private User $user)
    {
        parent::__construct($user);
    }

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|Arrayable|JsonSerializable
     */
    public function toArray($request): array|Arrayable|JsonSerializable
    {
        $token = $this->user->createToken('auth-token');

        return [
            'token' => new AccessTokenResource($token),
        ];
    }
}
