<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\TrixFileUploadController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return to_route('admin.login');
});

require __DIR__.'/auth.php';

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/dashboard', DashboardController::class)->name('dashboard');

    Route::post('trix', [TrixFileUploadController::class, 'store'])->name('trix.store');
    Route::post('trix/delete', [TrixFileUploadController::class, 'destroy'])->name('trix.destroy');
});
