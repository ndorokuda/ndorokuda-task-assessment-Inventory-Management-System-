<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Product;
use App\Models\Category;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;

class ProductController extends Controller implements HasMiddleware
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
        return Product::with(['supplier', 'user', 'category'])->latest()->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name'=> 'required|string',
            'description'=> 'required|string',
            'unit_price'=> 'required|numeric',
            'quantity'=> 'required|numeric',
            'supplier.name'=> 'required|string',
            'category.name'=> 'required|string',
        ]);




        return $request->user()->products()->create([
            'name'=> $validatedData['name'],
            'description'=> $validatedData['description'],
            'unit_price'=> $validatedData['unit_price'],
            'quantity'=> $validatedData['quantity'],
            'supplier_id' => $this->createOrGetSupplier($validatedData['supplier']['name'])->id,
            'category_id' => $this->createOrGetCategory($validatedData['category']['name'])->id,
        ]);

    }

    private function createOrGetSupplier(string $name)
{
    return Supplier::firstOrCreate(['name' => $name]);
}

private function createOrGetCategory(string $name)
{
    return Category::firstOrCreate(['name' => $name]);
}

   /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Flushing the Cache before updating
        Cache::forget('products_list');


        $validatedData = $request->validate([
            'name'=> 'required|string',
            'description'=> 'required|string',
            'unit_price'=> 'required|numeric',
            'quantity'=> 'required|numeric',
            'supplier.name'=> 'required|string',
            'category.name'=> 'required|string',
        ]);




        $product = Product::find($id);
        $product = $product->update([
            'name'=> $validatedData['name'],
            'description'=> $validatedData['description'],
            'unit_price'=> $validatedData['unit_price'],
            'quantity'=> $validatedData['quantity'],
            'supplier_id' => $this->createOrGetSupplier($validatedData['supplier']['name'])->id,
            'category_id' => $this->createOrGetCategory($validatedData['category']['name'])->id,

        ]);
        return $product;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return Product::destroy($id);
    }
}
