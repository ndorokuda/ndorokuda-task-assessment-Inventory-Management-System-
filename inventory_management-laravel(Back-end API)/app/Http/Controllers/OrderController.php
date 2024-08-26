<?php

namespace App\Http\Controllers;


use App\Models\User;
use App\Models\Order;
use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;

class OrderController extends Controller implements HasMiddleware
{

    public static function middleware()
    {
        // Protecting Routes using auth:sanctum middleware
        return [
            new Middleware('auth:sanctum', except:['index', 'show'])
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       return Order::with(['user','supplier','product'])->latest()->get();

    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'remarks'=> 'required|string',
            'quantity'=> 'required|numeric',
            'supplier.name'=> 'required|string',
            'product.name'=> 'required|string',
        ]);


        return $request->user()->orders()->create([
            'remarks'=> $validatedData['remarks'],
            'quantity'=> $validatedData['quantity'],
            'supplier_id' => $this->createOrGetSupplier($validatedData['supplier']['name'])->id,
            'product_id' => $this->createOrGetProduct($validatedData['product']['name'])->id,

        ]);
    }

    private function createOrGetSupplier(string $name)
{
    return Supplier::firstOrCreate(['name' => $name]);
}

private function createOrGetProduct(string $name)
{
    return Product::firstOrCreate(['name' => $name]);
}

private function createOrGetUser(string $firstName)
{
    return User::firstOrCreate(['first_name' => $firstName]);
}


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        $validatedData = $request->validate([
            'remarks'=> 'required|string',
            'quantity'=> 'required|numeric',
            'supplier.name'=> 'required|string',
            'product.name'=> 'required|string',
        ]);

        $order = Order::find($id);
        $order = $order->update([
            'remarks'=> $validatedData['remarks'],
            'quantity'=> $validatedData['quantity'],
            'supplier_id' => $this->createOrGetSupplier($validatedData['supplier']['name'])->id,
            'product_id' => $this->createOrGetProduct($validatedData['product']['name'])->id,
        ]);
        return $order;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return Order::destroy($id);
    }
}
