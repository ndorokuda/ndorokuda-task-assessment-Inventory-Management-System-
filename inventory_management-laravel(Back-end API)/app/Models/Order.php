<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    // An order/purchase from the Supplier belongs to a user
    public function user(){
        return $this->belongsTo(User::class);
    }

    // An order belongs to a supplier
    public function supplier(){
        return $this->belongsTo(Supplier::class);
    }

    // An order belongs to a product
    public function product(){
        return $this->belongsTo(Product::class);
    }
}
