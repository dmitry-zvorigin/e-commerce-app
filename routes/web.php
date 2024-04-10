<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Models\Product;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::inertia('/', 'Home')->name('home');

Route::inertia('/catalog', 'Catalog')->name('catalog');
Route::get('catalog', [CategoryController::class, 'catalog'])->name('catalog');
Route::get('catalog/{categorySlug}', [CategoryController::class, 'categories'])->name('categories');
Route::get('product/{productSlug}', [ProductController::class, 'show'])->name('product.show');

// Route::get('compare')->name('compare')->uses([CategoryController::class, 'test']);
Route::get('/compare', [CategoryController::class, 'test'])->name('compare');
// Route::inertia('/compare', 'Compare', ['str' => 'str'])->name('compare');
Route::inertia('/favorites', 'Favorites')->name('favorites');
Route::inertia('/cart', 'Cart')->name('cart');
Route::inertia('/user', 'User')->name('user');
Route::inertia('/notification', 'Notification')->name('notification');


// Route::get('/', function () {
//     return Inertia::render('Home');
// });

// Route::get('/products', function() {
//     return Inertia::render('Products');
// });

// Route::get('/catalog', [CategoryController::class, 'catalog'])->name('catalog');
// Route::get('/catalog/{сategory}', [CategoryController::class, 'categories'])->name('categories');

Route::get('menu', [CategoryController::class, 'testShowMegaMenu']);
// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });



Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
