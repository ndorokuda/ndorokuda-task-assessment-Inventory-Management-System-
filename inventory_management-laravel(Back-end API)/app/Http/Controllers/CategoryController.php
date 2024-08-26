<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

           return Category::latest()->get();

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validatedData = $request->validate([
            'name'=> 'required|string',
            'description'=> 'required|string',
        ]);


        return Category::create([
            'name'=> $validatedData['name'],
            'description'=> $validatedData['description']
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $category = Category::find($id);
        $validatedData = $request->validate([
            'name'=> 'required|string',
            'description'=> 'required|string',
        ]);
        $category = $category->update([
            'name'=> $validatedData['name'],
            'description'=> $validatedData['description']
        ]);
        return $category;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return Category::destroy($id);
    }
}
