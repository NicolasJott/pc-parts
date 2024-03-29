<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'model',
        'price',
        'category',
        'product_image',
        'description',
    ];

    protected $casts = [
        "specifications" => 'array'
    ];

    public function lineItems()
    {
        return $this->hasMany(LineItem::class);
    }
}
