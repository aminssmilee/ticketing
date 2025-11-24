<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LoginController extends Controller
{
    // Halaman Login
    public function index()
    {
        if (Auth::check()) {
            return redirect()->route('ticket.dashboard');
        }

        return Inertia::render('Login'); // Sesuaikan dengan file di resources/js/Pages/Login.jsx
    }

    // Proses Login
    public function authenticate(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            // Kalau hanya admin boleh login → gunakan ini:
            // if (Auth::user()->role !== 'admin') {
            //     Auth::logout();
            //     return back()->withErrors(['email' => 'Akses ditolak. Bukan admin.']);
            // }

            return redirect()->route('ticket.dashboard');
        }

        return back()->withErrors([
            'email' => 'Email atau password salah.',
        ]);
    }

    // Logout
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('auth.login');
    }
}
