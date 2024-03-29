<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Order extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'firstName',
        'lastName',
        'email',
        'phoneNumber'
    ];

    public function deliveryAddress()
    {
        return $this->hasOne(DeliveryAddress::class);
    }

    public function lineItems()
    {
        return $this->hasMany(LineItem::class);
    }
}
