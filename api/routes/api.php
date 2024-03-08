<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(\App\Http\Controllers\KaryawanController::class)->group(function () {
    Route::prefix('karyawan')->group(function () {
        Route::get('/', 'fetchAllKaryawan');
        Route::get('/search', 'search');
        Route::post('/', 'store');
        Route::get('/{karyawan}', 'edit');
        Route::post('/{karyawan}', 'update');
        Route::get('/pengalaman/{karyawan}', 'pengalamanKerjaDetail');
        Route::get('/pendidikan/{karyawan}', 'pendidikanDetail');
        Route::delete('/{karyawan}', 'destroy');
    });
});
