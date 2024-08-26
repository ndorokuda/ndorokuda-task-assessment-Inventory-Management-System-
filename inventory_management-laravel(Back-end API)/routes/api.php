<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\AuthenticationController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// Product Routes
Route::apiResource('products',ProductController::class);


// Category Routes

Route::apiResource('categories',CategoryController::class);


// Order Routes
Route::apiResource('orders',OrderController::class);


// Supplier Routes
Route::apiResource('suppliers',SupplierController::class);



 Route::get('/users',[UserController::class,'index']);


// Authentication Routes
Route::post('/register', [AuthenticationController::class, 'register']);
Route::post('/login', [AuthenticationController::class, 'login']);
Route::post('/logout', [AuthenticationController::class, 'logout'])->middleware('auth:sanctum');;


