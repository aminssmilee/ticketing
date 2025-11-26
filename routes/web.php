<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// AUTH CONTROLLERS
use App\Http\Controllers\Admin\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\VerifyOtpController;

// TICKET CONTROLLERS
use App\Http\Controllers\Ticket\TicketController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Ticket\DashboardController;
use App\Http\Controllers\Ticket\WorkInstructionController;


/*
|--------------------------------------------------------------------------
| AUTH ROUTES
|--------------------------------------------------------------------------
*/

Route::get('/', [LoginController::class, 'index'])->name('auth.login');
Route::post('/login', [LoginController::class, 'authenticate'])->name('auth.login.submit');
Route::post('/logout', [LoginController::class, 'logout'])->name('auth.logout');

// REGISTER
Route::get('/register', [RegisterController::class, 'index'])->name('auth.register');
Route::post('/register', [RegisterController::class, 'store'])->name('auth.register.submit');

// OTP VERIFY
Route::get('/verify-otp', [VerifyOtpController::class, 'index'])->name('auth.verifyOtpForm');
Route::post('/verify-otp', [VerifyOtpController::class, 'verify'])->name('auth.verifyOtp');
Route::post('/verify-otp/resend', [VerifyOtpController::class, 'resend'])->name('auth.verifyOtp.resend');

// FORGOT PASSWORD
Route::get('/forgot-password', [ForgotPasswordController::class, 'showForm'])->name('password.request');
Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail'])->name('password.email');

// RESET PASSWORD
Route::get('/reset-password/{token}', [ResetPasswordController::class, 'showResetForm'])->name('password.reset');
Route::post('/reset-password', [ResetPasswordController::class, 'reset'])->name('password.update');


/*
|--------------------------------------------------------------------------
| TICKETING SYSTEM (PROTECTED)
|--------------------------------------------------------------------------
*/

Route::prefix('ticket')
    ->middleware('auth')
    ->name('ticket.')
    ->group(function () {

        // Dashboard
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // Open ticket
        Route::get('/open', [TicketController::class, 'open'])->name('open');
        Route::post('/open', [TicketController::class, 'store'])->name('store');

        // List ticket
        Route::get('/list', [TicketController::class, 'list'])->name('list');

        // Report
        Route::get('/report', fn() => Inertia::render('Ticket/Report'))->name('report');
        Route::get('/report/download', [TicketController::class, 'downloadReport'])->name('report.download');

        // Work Instruction
        Route::get('/wi', [WorkInstructionController::class, 'index'])->name('wi');
        Route::post('/wi/upload', [WorkInstructionController::class, 'store'])->name('wi.upload');

        // Update Ticket
        Route::get('/update/{ticket_number}', [TicketController::class, 'edit'])->name('update');
        Route::post('/update/{ticket_number}', [TicketController::class, 'update'])->name('update.submit');

        // View Ticket
        Route::get('/view/{ticket_number}', [TicketController::class, 'show'])
            ->where('ticket_number', '[A-Za-z0-9\-_]+')
            ->name('view');

        /*
        |--------------------------------------------------------------------------
        | ADMIN ONLY
        |--------------------------------------------------------------------------
        */
        Route::middleware('admin')->group(function () {
            Route::get('/users', [UserController::class, 'index'])->name('users.index');
            Route::post('/users/update-role', [UserController::class, 'updateRole'])->name('users.updateRole');
            Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('users.destroy');
        });
    });
    