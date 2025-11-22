<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Admin\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;

/*
|--------------------------------------------------------------------------
| AUTH ROUTES
|--------------------------------------------------------------------------
*/

// Halaman Login
Route::get('/', [LoginController::class, 'index'])
    ->name('auth.login');

// Proses Login
Route::post('/login', [LoginController::class, 'authenticate'])
    ->name('auth.login.submit');

// Logout
Route::post('/logout', [LoginController::class, 'logout'])
    ->name('auth.logout');

// Halaman Register
Route::get('/register', [RegisterController::class, 'index'])
    ->name('auth.register');

// Proses Register
Route::post('/register', [RegisterController::class, 'store'])
    ->name('auth.register.submit');

// Halaman Forgot & Reset Password

Route::get('/forgot-password', [ForgotPasswordController::class, 'showForm'])->name('password.request');
Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail'])->name('password.email');

Route::get('/reset-password/{token}', [ResetPasswordController::class, 'showResetForm'])->name('password.reset');
Route::post('/reset-password', [ResetPasswordController::class, 'reset'])->name('password.update');




/*
|--------------------------------------------------------------------------
| TICKETING SYSTEM (Protected)
|--------------------------------------------------------------------------
*/

Route::prefix('ticket')
    ->middleware('auth')
    ->name('ticket.')
    ->group(function () {

        // Dashboard
        Route::get('/dashboard', fn() =>
            Inertia::render('Ticket/Dashboard')
        )->name('dashboard');

        // Open Ticket
        Route::get('/open', fn() =>
            Inertia::render('Ticket/Open')
        )->name('open');

        // List Ticket
        Route::get('/list', fn() =>
            Inertia::render('Ticket/List')
        )->name('list');

        // Report Ticket
        Route::get('/report', fn() =>
            Inertia::render('Ticket/Report')
        )->name('report');

        // Work Instruction
        Route::get('/wi', fn() =>
            Inertia::render('Ticket/WorkInstruction')
        )->name('wi');

        // Settings
        Route::get('/settings', fn() =>
            Inertia::render('Ticket/Settings')
        )->name('settings');
    });
