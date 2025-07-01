<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Employee;
use App\Traits\ApiResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class EmployeeAuthController extends Controller
{
    use ApiResponse;

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if($validator->fails()){
            return $this->errorResponse('Validación Fallida', $validator->errors(), 422);
        }

        $employee = Employee::where('email', $request->email)->first();

        if (!$employee || !Hash::check($request->password, $employee->password)) {
            return $this->errorResponse("Credenciales incorrectas", [], 401);
        }

        $token = Auth::guard('employee')->login($employee);

        return $this->successResponse([
            'employee' => $employee,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer'
            ]
            ], "Inicio de sesión correcta");
    }

    public function me()
    {
        return $this->successResponse([
            'employee' => Auth::guard('employee')->user(),
        ], "Datos obtenidos correctamente");
    }

    public function logout()
    {
        Auth::guard('employee')->logout();
        return $this->successResponse(null, "Sesión cerrada correctamente");
    }

    public function refresh()
    {
        return $this->successResponse([
            'employee' => Auth::guard('employee')->user(),
            'authorisation' => [
                'token' => Auth::guard('employee')->refresh(),
                'type' => 'bearer'
            ]
            ], "Sesión actualizada correctamente");
    }
}
