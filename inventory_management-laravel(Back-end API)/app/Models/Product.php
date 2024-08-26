<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    // A product created belongs to a user
    public function user(){
        return $this->belongsTo(User::class);
    }

    // A product belongs to a category
    public function category(){
        return $this->belongsTo(Category::class);
    }

    // A product belongs to a category
    public function supplier(){
        return $this->belongsTo(Supplier::class);
    }

    public function order(){
        return $this->belongsTo(Order::class);
    }

    // A product is for one sale
    public function sales(){
        return $this->hasMany(Sale::class);

    }
}
