<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Admin\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Ticket\DashboardController;

/*
|--------------------------------------------------------------------------
| AUTH ROUTES
|--------------------------------------------------------------------------
*/

Route::get('/', [LoginController::class, 'index'])->name('auth.login');
Route::post('/login', [LoginController::class, 'authenticate'])->name('auth.login.submit');
Route::post('/logout', [LoginController::class, 'logout'])->name('auth.logout');

Route::get('/register', [RegisterController::class, 'index'])->name('auth.register');
Route::post('/register', [RegisterController::class, 'store'])->name('auth.register.submit');

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
        Route::get('/dashboard', [DashboardController::class, 'index'])
            ->name('dashboard');

        // Open Ticket (Form)
        Route::get('/open', [TicketController::class, 'open'])
            ->name('open');

        // Open Ticket (Submit)
        Route::post('/open', [TicketController::class, 'store'])
            ->name('store');


        // List Ticket
        Route::get('/list', fn() => Inertia::render('Ticket/List'))
            ->name('list');

        // Report Ticket
        Route::get('/report', fn() => Inertia::render('Ticket/Report'))
            ->name('report');

        // Work Instruction
        Route::get('/wi', fn() => Inertia::render('Ticket/WorkInstruction'))
            ->name('wi');

        // Settings
        Route::get('/settings', fn() => Inertia::render('Ticket/Settings'))
            ->name('settings');

        // Update Ticket
        Route::get('/update/{ticket_number}', fn() => Inertia::render('Ticket/UpdateTicket'))
            ->name('update');

        // view Ticket
        Route::get('/view/{ticket_number}', fn() => Inertia::render('Ticket/ViewTicket'))
            ->name('view');


        /*
        |--------------------------------------------------------------------------
        | USER MANAGEMENT (ADMIN ONLY)
        |--------------------------------------------------------------------------
        */
        Route::middleware('admin')->group(function () {

            // Page User List
            Route::get('/users', [UserController::class, 'index'])
                ->name('users.index');

            // Update role
            Route::post('/users/update-role', [UserController::class, 'updateRole'])
                ->name('users.updateRole');

            // Delete user
            Route::delete('/users/{id}', [UserController::class, 'destroy'])
                ->name('users.destroy');
        });


        /*
        |--------------------------------------------------------------------------
        | PUBLIC TICKET VIEW (SAFE VERSION)
        |--------------------------------------------------------------------------
        */
        Route::get('/view/{ticket_number}', [TicketController::class, 'show'])
            ->where('ticket_number', '[A-Za-z0-9\-_]+')
            ->name('show');
    });
