<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory;

    // A supplier has many products
    public function products(){
        return $this->hasMany(Product::class);
    }

    //A supplier has many orders
    public function orders(){
        return $this->hasMany(Order::class);
    }
}
