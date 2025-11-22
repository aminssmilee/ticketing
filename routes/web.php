<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\LoginController;

// 🔹 Halaman login admin
Route::get('/', [LoginController::class, 'index'])->name('admin.login');

// 🔹 Proses login admin
Route::post('/login', [LoginController::class, 'authenticate'])->name('admin.authenticate');

// 🔹 Logout admin
Route::post('/logout', [LoginController::class, 'logout'])->name('admin.logout');

// 🔹 Grup halaman admin (dilindungi auth)
Route::prefix('admin')->middleware('auth')->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Admin/Dashboard'))->name('admin.dashboard');
    Route::get('/products', fn() => Inertia::render('Admin/Products'))->name('admin.products');
    Route::get('/users', fn() => Inertia::render('Admin/Users'))->name('admin.users');
    Route::get('/banner', fn() => Inertia::render('Admin/Banner'))->name('admin.banner');
    Route::get('/reports', fn() => Inertia::render('Admin/Reports'))->name('admin.reports');
    Route::get('/orders', fn() => Inertia::render('Admin/Orders'))->name('admin.orders');
    Route::get('/search', fn() => Inertia::render('Admin/Search'))->name('admin.search');
    Route::get('/settings', fn() => Inertia::render('Admin/Settings'))->name('admin.settings');
    Route::get('/get-help', fn() => Inertia::render('Admin/GetHelp'))->name('admin.getHelp');
});
