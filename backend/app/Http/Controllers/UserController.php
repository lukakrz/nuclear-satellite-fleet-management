<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index()
    {
        return Auth::user();
    }

    public function update(UpdateUserRequest $request)
    {
        $fields = $request->validated();
        $user = User::find(Auth::user()->id);

        if ($request->filled('password')) {
            $user->update([
                'name' => $fields['name'],
                'email' => $fields['email'],
                'origin' => $fields['origin'],
                'has_atomic_button' => $fields['has_atomic_button'],
                'password' => bcrypt($fields['password'])
            ]);
        }
        $user->update([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'origin' => $fields['origin'],
            'has_atomic_button' => $fields['has_atomic_button']
        ]);

        return $user;
    }
}
