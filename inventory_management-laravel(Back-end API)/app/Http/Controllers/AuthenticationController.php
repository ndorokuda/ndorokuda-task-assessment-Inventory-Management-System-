<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthenticationController extends Controller
{
    public function register(Request $request)
    {
        // Creating new user and providing access token
        $validatedData = $request->validate( [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $validatedData['password'] = bcrypt($validatedData['password']);


        $user = User::create([
            'first_name' => $validatedData['first_name'],
            'last_name' => $validatedData['last_name'],
            'email' => $validatedData['email'],
            'password' => $validatedData['password'],
        ]);

        $token = $user->createToken($validatedData['first_name']);


        return [
            "user"=> $user,
            'token'=> $token->plainTextToken,
        ];
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);


        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return ['message' => 'Invalid credentials'];
        }

        $token = $user->createToken($user->first_name);


        return [
            "user"=> $user,
            'token'=> $token->plainTextToken,
        ];
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return [
            'message' => 'You have been logged out',
        ];
    }
}
