<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\LoginController;
use App\Http\Controllers\Auth\RegisterController;

// Auth
Route::get('/', [LoginController::class, 'index'])->name('ticket.login');
Route::post('/login', [LoginController::class, 'authenticate'])->name('ticket.authenticate');
Route::post('/logout', [LoginController::class, 'logout'])->name('ticket.logout');
// Register page
Route::get('/register', [RegisterController::class, 'index'])->name('auth.register');

// Submit register
Route::post('/register', [RegisterController::class, 'store'])->name('auth.register.submit');
// Protected Ticketing
Route::prefix('ticket')->middleware('auth')->name('ticket.')->group(function () {

    // Dashboard
    Route::get('/dashboard', fn() => Inertia::render('Ticket/Dashboard'))
        ->name('dashboard');

    // Open Ticket
    Route::get('/open', fn() => Inertia::render('Ticket/Open'))
        ->name('open');

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
});
