<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\EnterpriseResource;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email|max:255',
            'password' => 'required|string|min:8',
            'confirm_password' => 'required|string|min:8|same:password',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            "rol" => "Enterprise"
        ]);

        return response()->json([], 201);
    }

    public function refresh()
    {
        $newToken = auth()->refresh();

        return response()->json([
            'token' => $newToken
        ]);
    }

    public function update(UserUpdateRequest $request)
    {
        $user = $request->user();

        $data = $request->validated();

        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        if ($request->hasFile('image')) {
            $data['image'] = "storage/" . $request->file('image')->store('users', 'public');
        }

        $user->update($data);

        return response()->json($user);
    }


    public function login(Request $request)
    {
        Validator::make($request->all(), [
            'email' => 'required|email|exists:users,id',
            'password' => 'required|string',
        ]);

        $credentials = request(['email', 'password']);

        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Password invalid'], 402);
        }

        $user = User::where('email', $request->email)->first();

        $enterprise = $user->enterprise;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            "user" => [
                'id' => $user->id,
                "image" => $user->image,
                "name" => $user->name,
                "email" => $user->email,
                "rol" => $user->rol
            ],
            'enterprise' => $enterprise ? EnterpriseResource::make($enterprise) : null
        ]);
    }

    public function me(Request $request)
    {
        $enterprise = $request->user()->enterprise;

        return response()->json([
            "user" => [
                "id" => $request->user()->id,
                "image" => $request->user()->image,
                "name" => $request->user()->name,
                "email" => $request->user()->email,
                "rol" => $request->user()->rol
            ],
            'enterprise' => $enterprise ? EnterpriseResource::make($enterprise) : null
        ]);
    }
}
