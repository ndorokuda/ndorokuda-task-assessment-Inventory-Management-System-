<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Supplier::latest()->get();

    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name'=> 'required|string',
            'email_address'=> 'required|email',
            'phone_number'=> 'required',
        ]);

        return Supplier::create([
            'name'=> $validatedData['name'],
            'email_address'=> $validatedData['email_address'],
            'phone_number'=> $validatedData['phone_number'],
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        // Flushing the Cache before updating
        Cache::forget('suppliers_list');


        $supplier = Supplier::find($id);
        $validatedData = $request->validate([
            'name'=> 'required|string',
            'email_address'=> 'required|email',
            'phone_number'=> 'required',
        ]);
        $supplier = $supplier->update([
            'name'=> $validatedData['name'],
            'email_address'=> $validatedData['email_address'],
            'phone_number'=> $validatedData['phone_number'],
        ]);
        return $supplier;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return Supplier::destroy($id);
    }
}
