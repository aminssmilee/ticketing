<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use App\Models\User;

class RegisterController extends Controller
{
    /**
     * Halaman register
     */
    public function index()
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Proses registrasi user baru
     */
    public function store(Request $request)
    {
        // Validasi
        $validated = $request->validate([
            'name'      => ['required', 'string', 'max:255'],
            'email'     => ['required', 'email', 'unique:users,email'],
            'password'  => ['required', 'min:6', 'confirmed'], // harus ada password_confirmation
        ]);

        // Buat user baru
        $user = User::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        // Login otomatis setelah daftar
        auth()->login($user);

        return redirect()->route('ticket.dashboard')
            ->with('success', 'Registrasi berhasil! Selamat datang 👋');
    }
}
