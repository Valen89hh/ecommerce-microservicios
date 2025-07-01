<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\EmployeeAuthController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\S3UploadController;
use App\Http\Middleware\AuthAny;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware
('auth:api');
Route::post('/refresh', [AuthController::class, 'refresh'])->middleware
('auth:api');
Route::get('/me', [AuthController::class, 'me'])->middleware
('auth:api');


//s3
Route::prefix('s3')->group(function () {    
    Route::middleware('auth:employee')->group(function () {
        Route::post('/upload', [S3UploadController::class, 'upload']);
        Route::post('/delete', [S3UploadController::class, 'destroy']);
    });
});

//Dashboard
Route::prefix('dashboard')->group(function () {
    Route::middleware('auth:employee')->group(function () {
        Route::get('/summary', [DashboardController::class, 'summary']);
        Route::get('/sales-statistics', [DashboardController::class, 'salesStatistics']);
        Route::get('/best-selling-products', [DashboardController::class, 'bestSellingProducts']);
        Route::get('/latest-orders', [DashboardController::class, 'latestOrders']);
    });
});

Route::prefix('employee')->group(function () {
    Route::post('/login', [EmployeeAuthController::class, 'login']);

    Route::middleware('auth:employee')->group(function () {
        Route::get('/me', [EmployeeAuthController::class, 'me']);
        Route::post('/logout', [EmployeeAuthController::class, 'logout']);
        Route::post('/refresh', [EmployeeAuthController::class, 'refresh']);
    });
});

//Categories
Route::prefix('categories')->group(function () {
    Route::get('/', [CategoryController::class, 'index']);

    Route::middleware('auth:employee')->group(function () {
        Route::post('/filter', [CategoryController::class, 'pagination']);
        Route::post('/', [CategoryController::class, 'store']);
        Route::get('/{id}', [CategoryController::class, 'show']);
        Route::put('/{id}', [CategoryController::class, 'update']);
        Route::delete('/{id}', [CategoryController::class, 'destroy']);
    });
});

//Products
Route::prefix('products')->group(function () {

    Route::get('/', [ProductController::class, 'index']);
    Route::post('/filter', [ProductController::class, 'pagination']);
    Route::get('/{id}', [ProductController::class, 'show']);

    Route::middleware('auth:employee')->group(function () {
        Route::post('/', [ProductController::class, 'store']);
        Route::get('/stats/total', [ProductController::class, 'totalProducts']);
        Route::get('/stats/out-of-stock', [ProductController::class, 'outOfStockProducts']);
        Route::get('/stats/low-stock', [ProductController::class, 'lowStockProducts']);
        Route::put('/{id}', [ProductController::class, 'update']);
        Route::delete('/{id}', [ProductController::class, 'destroy']);
    });
});

//Orders
Route::post('/orders/filter', [OrderController::class, 'pagination'])
    ->middleware(AuthAny::class.':employee,api');

Route::prefix('orders')->group(function () {    
    Route::post('/', [OrderController::class, 'store']);
    Route::middleware('auth:employee')->group(function () {
        Route::get('/{id}', [OrderController::class, 'show']);
        Route::put('/update-status/{id}', [OrderController::class, 'updateStatus']);
        Route::delete('/{id}', [OrderController::class, 'destroy']);
    });
});