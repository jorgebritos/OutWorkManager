<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\EnterpriseResource;
use Illuminate\Http\Request;
use App\Models\User;
use Database\Seeders\EnterpriseSeeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;
use PHPOpenSourceSaver\JWTAuth\JWTAuth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email|max:255',
            'password' => 'required|string|min:8',
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
        try {
            $newToken = auth()->refresh();

            return response()->json([
                'token' => $newToken
            ]);
        } catch (JWTException $e) {
            return response()->json([
                'error' => 'Token no valid or expired'
            ], 401);
        }
    }

    public function login(Request $request)
    {
        Validator::make($request->all(), [
            'email' => 'required|email|max:255',
            'password' => 'required|string',
        ]);

        $credentials = request(['email', 'password']);

        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user = User::where('email', $request->email)->first();

        $enterprise = $user->enterprise;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            "user" => [
                'id' => $user->id,
                "name" => $user->name,
                "rol" => $user->rol
            ],
            'enterprise' => $enterprise ? EnterpriseResource::make($enterprise) : null
        ]);
    }

    public function me(Request $request)
    {

        $enterprise = $request->user->enterprise;

        return response()->json([
            "user" => [
                "id" => $request->user()->id,
                "name" => $request->user()->name,
                "rol" => $request->user()->rol
            ],
            'enterprise' => $enterprise ? EnterpriseResource::make($enterprise) : null
        ], 201);
    }
}
