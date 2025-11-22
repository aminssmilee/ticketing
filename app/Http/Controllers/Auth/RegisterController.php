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
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Exception;
use Illuminate\Validation\Rule;

class RegisterController extends Controller
{
    /**
     * Tampilkan halaman register + data dropdown
     */
    public function index()
    {
        return Inertia::render('Auth/Register', [
            'departments'       => Department::select('id', 'name')->get(),
            'sub_departments'   => SubDepartment::select('id', 'name')->get(),
            'gateways'          => Gateway::select('id', 'name')->get(),
            'positions'         => Position::select('id', 'name')->get(),
        ]);
    }

    /**
     * Proses register user baru
     */
    public function store(Request $request)
    {
        try {
            // ==========================================
            // 🔐 RATE LIMITING (Anti Spam Register)
            // ==========================================
            $key = 'register:' . $request->ip();

            if (RateLimiter::tooManyAttempts($key, 5)) {
                $seconds = RateLimiter::availableIn($key);

                return back()->withErrors([
                    'rate' => "Terlalu banyak percobaan. Coba lagi dalam {$seconds} detik."
                ])->withInput();
            }

            RateLimiter::hit($key, 60); // 60 detik

            // ==========================================
            // 🧼 SANITASI INPUT
            // ==========================================
            $request->merge([
                'name'  => trim(strip_tags($request->name)),
                'email' => strtolower(trim($request->email)),
            ]);

            // ==========================================
            // ✅ VALIDASI BACKEND
            // ==========================================
            $validator = Validator::make(
                $request->all(),
                [
                    'name'  => ['required', 'string', 'max:255'],
                    'email' => [
                        'required',
                        'email',
                        'max:255',
                        'unique:users,email',
                        // contoh kalau mau wajib email kantor:
                        // 'regex:/@appcare\.id$/'
                    ],

                    // Password: min 8, ada huruf besar & angka, konfirmasi sama
                    'password' => [
                        'required',
                        'string',
                        'min:8',
                        'regex:/[A-Z]/', // ada huruf besar
                        'regex:/[0-9]/', // ada angka
                        'confirmed',
                    ],

                    // Relasi ID dropdown
                    'department_id'      => ['required', 'exists:departments,id'],
                    'sub_department_id'  => ['required', 'exists:sub_departments,id'],
                    'gateway_id'         => ['required', 'exists:gateways,id'],
                    'position_id'        => ['required', 'exists:positions,id'],
                ],
                [
                    // Custom message
                    'name.required'      => 'Full name wajib diisi.',
                    'email.required'     => 'Email wajib diisi.',
                    'email.email'        => 'Format email tidak valid.',
                    'email.unique'       => 'Email ini sudah terdaftar.',

                    'password.required'  => 'Password wajib diisi.',
                    'password.min'       => 'Password minimal 8 karakter.',
                    'password.regex'     => 'Password harus mengandung huruf besar dan angka.',
                    'password.confirmed' => 'Konfirmasi password tidak cocok.',

                    'department_id.required'     => 'Department wajib dipilih.',
                    'department_id.exists'       => 'Department tidak valid.',
                    'sub_department_id.required' => 'Sub Department wajib dipilih.',
                    'sub_department_id.exists'   => 'Sub Department tidak valid.',
                    'gateway_id.required'        => 'Gateway wajib dipilih.',
                    'gateway_id.exists'          => 'Gateway tidak valid.',
                    'position_id.required'       => 'Position wajib dipilih.',
                    'position_id.exists'         => 'Position tidak valid.',
                ]
            );

            if ($validator->fails()) {
                // Inertia akan otomatis kirim errors ke FE
                return back()->withErrors($validator)->withInput();
            }

            // ==========================================
            // 👀 OPSIONAL: CEK BLACKLIST PASSWORD MUDAH
            // ==========================================
            $blacklist = ['password', '12345678', 'qwerty', 'admin123', 'appcare123'];
            if (in_array(strtolower($request->password), $blacklist)) {
                return back()->withErrors([
                    'password' => 'Password terlalu mudah. Gunakan kombinasi yang lebih aman.',
                ])->withInput();
            }

            // ==========================================
            // 💾 CREATE USER
            // ==========================================
            $user = User::create([
                'name'               => $request->name,
                'email'              => $request->email,
                'password'           => Hash::make($request->password),

                'department_id'      => (int) $request->department_id,
                'sub_department_id'  => (int) $request->sub_department_id,
                'gateway_id'         => (int) $request->gateway_id,
                'position_id'        => (int) $request->position_id,

                'role'               => 'user',
            ]);

            // ==========================================
            // 📝 LOGGING (Auditing)
            // ==========================================
            Log::info('User registered', [
                'user_id' => $user->id,
                'email'   => $user->email,
                'ip'      => $request->ip(),
            ]);

            return redirect()
                ->route('auth.login')
                ->with('success', 'Akun berhasil dibuat! Silakan login.');

        } catch (Exception $e) {

            Log::error('Register error', [
                'message' => $e->getMessage(),
                'trace'   => $e->getTraceAsString(),
            ]);

            return back()->withErrors([
                'server' => 'Server error, silakan coba lagi beberapa saat lagi.'
            ])->withInput();
        }
    }
}
