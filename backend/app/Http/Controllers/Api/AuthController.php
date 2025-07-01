<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AuthProvider;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
        ]);

        $provider = AuthProvider::where('provider', 'email')->first();

        if (!$provider) {
            return response()->json([
                'status' => 'error',
                'provider' => $provider,
                'message' => 'Proveedor de autenticación "email" no encontrado.',
            ], 422);
        }

        $user = User::where('email', $request->email)->first();

        if ($user && $user->authProvider->provider !== 'email') {
            return response()->json(['message' => 'Este usuario esta authenticado con '.$user->authProvider->provider], 401);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'auth_provider_id' => $provider->id,
        ]);

        $token = Auth::login($user);

        return response()->json([
            'status' => 'success',
            'message' => 'User cerado correctamente',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer'
            ]
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if(!$user){
            return response()->json([
                "success" => false,
                "message" => "El usuario no existe"
            ]);
        }

        if ($user->authProvider->provider !== 'email') {
            return response()->json(['message' => 'Este usuario esta authenticado con '.$user->authProvider->provider], 401);
        }

        $token = Auth::attempt($request->only('email', 'password'));

        if (!$token) {
            return response()->json(['message' => 'Credenciales incorrectas'], 401);
        }


        return response()->json([
            'status' => 'success',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer'
            ]
        ]);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'satus' => 'success',
            'message' => 'Cierre de sesión exitoso'
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer'
            ]
        ]);
    }

    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        $googleUser = Socialite::driver('google')->user();
        $user = User::where('email', $googleUser->getEmail())->first();

        if ($user) {
            if ($user->authProvider->provider !== 'google') {
                return redirect()->to(config('app.frontend_url') . '/auth/error?reason=method_conflict');
            }
        } else {
            $provider = AuthProvider::where('provider', 'google')->first();
            $user = User::create([
                'name' => $googleUser->getName(),
                'email' => $googleUser->getEmail(),
                'password' => null,
                'image' => $googleUser->getAvatar(),
                'auth_provider_id' => $provider->id,
            ]);
        }

        $token = Auth::login($user);

        // Redirigir con token en query string o establecer cookie httpOnly
        return redirect()->to(config('app.frontend_url') . "/auth/callback?token={$token}");
    }

    public function me()
    {
        return response()->json([
            'user' => Auth::user()
        ]);
    }
}
