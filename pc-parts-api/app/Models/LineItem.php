<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class LineItem extends Model
{
    use HasFactory;

    /**
     * Get the product that owns the line item
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
