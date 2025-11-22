<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Department;
use App\Models\SubDepartment;
use App\Models\Gateway;
use App\Models\Position;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class RegisterController extends Controller
{
    public function index()
    {
        return Inertia::render('Auth/Register', [
            'departments'       => Department::select('id', 'name')->get(),
            'sub_departments'   => SubDepartment::select('id', 'name')->get(),
            'gateways'          => Gateway::select('id', 'name')->get(),
            'positions'         => Position::select('id', 'name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'               => 'required|string|max:255',
            'email'              => 'required|email|unique:users,email',
            'password'           => 'required|min:6|confirmed',

            // ID relasi
            'department_id'      => 'required|exists:departments,id',
            'sub_department_id'  => 'required|exists:sub_departments,id',
            'gateway_id'         => 'required|exists:gateways,id',
            'position_id'        => 'required|exists:positions,id',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        User::create([
            'name'              => $request->name,
            'email'             => $request->email,
            'password'          => bcrypt($request->password), // FIX!!

            // Relasi ID
            'department_id'      => (int) $request->department_id,
            'sub_department_id'  => (int) $request->sub_department_id,
            'gateway_id'         => (int) $request->gateway_id,
            'position_id'        => (int) $request->position_id,

            'role' => 'user',
        ]);

        return redirect()->route('auth.login')
            ->with('success', 'Akun berhasil dibuat! Silakan login.');
    }
}
