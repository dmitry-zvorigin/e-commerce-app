<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WishlistController;
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

Route::get('/test', [ProductController::class, 'test'])->name('test');


Route::inertia('/', 'Home')->name('home');

Route::inertia('/catalog', 'Catalog')->name('catalog');
Route::get('catalog', [CategoryController::class, 'catalog'])->name('catalog');
Route::get('catalog/{categorySlug}', [CategoryController::class, 'categories'])->name('categories');

Route::get('product/{productSlug}', [ProductController::class, 'show'])->name('product.show');
Route::get('product/{productSlug}/reviews', [ProductController::class, 'reviews'])->name('product.reviews');
Route::get('product/{productSlug}/specifications', [ProductController::class, 'specifications'])->name('product.specifications');

Route::inertia('/compare', 'Compare')->name('compare');

// Route::inertia('/favorites', 'Favorites')->name('favorites');
Route::get('/favorites', [WishlistController::class, 'show'])->name('favorites');
Route::post('/favorites/add', [WishlistController::class, 'add'])->middleware('auth')->name('wishlist.add');
Route::get('/favorites/index', [WishlistController::class, 'index'])->middleware('auth')->name('wishlist.index');

Route::inertia('/cart', 'Cart')->name('cart');

Route::inertia('/user', 'User')->name('user');
Route::inertia('/notification', 'Notification')->name('notification');

// Route::inertia('/profile', 'Profile')->name('profile');

// Route::inertia('/favorites', 'Favorites')->name('favorites');
// Route::get('/favorites', [WishlistController::class, 'show'])->name('favorites');
Route::post('/favorites/add', [WishlistController::class, 'add'])->middleware('auth')->name('wishlist.add');
Route::get('/favorites/index', [WishlistController::class, 'index'])->middleware('auth')->name('wishlist.index');

Route::inertia('/favorites', 'Favorites')->name('favorites');

Route::get('/wishlist-redirect', function() {

})->middleware('auth.redirect')->name('wishlist.redirect');

Route::middleware('auth')->group(function () {
    Route::prefix('profile')->group(function () {
        Route::inertia('/order/all', 'Profile/OrderAll')->name('profile.order');
        Route::get('/wishlist', [WishlistController::class, 'show'])->name('profile.wishlist');
        Route::delete('/wishlist/delete', [WishlistController::class, 'delete'])->name('profile.wishlist.delete');

        // Route::inertia('/wishlist', 'Profile/Wishlist')->name('profile.wishlist');
        Route::inertia('/subscriptions', 'Profile/Subscriptions')->name('profile.subscriptions');
        Route::inertia('/address', 'Profile/Address')->name('profile.address');
        Route::inertia('/prozapass', 'Profile/Prozapass')->name('profile.prozapass');
        Route::inertia('/achievements', 'Profile/Achievements')->name('profile.achievements');
        Route::inertia('/service-requests', 'Profile/ServiceRequests')->name('profile.service-requests');
        Route::inertia('/feedback', 'Profile/Feedback')->name('profile.feedback');
        Route::inertia('/security', 'Profile/Security')->name('profile.security');
        Route::inertia('notifications', 'Profile/Notifications')->name('profile.notifications');
        Route::inertia('/settings', 'Profile/Settings')->name('profile.settings');
    });
});

// Route::prefix('profile')->group(function () {
//     Route::inertia('/order/all', 'Profile/OrderAll')->name('profile.order');
//     Route::inertia('/wishlist', 'Profile/Wishlist')->name('profile.wishlist');
//     Route::inertia('/subscriptions', 'Profile/Subscriptions')->name('profile.subscriptions');
//     Route::inertia('/address', 'Profile/Address')->name('profile.address');
//     Route::inertia('/prozapass', 'Profile/Prozapass')->name('profile.prozapass');
//     Route::inertia('/achievements', 'Profile/Achievements')->name('profile.achievements');
//     Route::inertia('/service-requests', 'Profile/ServiceRequests')->name('profile.service-requests');
//     Route::inertia('/feedback', 'Profile/Feedback')->name('profile.feedback');
//     Route::inertia('/security', 'Profile/Security')->name('profile.security');
//     Route::inertia('notifications', 'Profile/Notifications')->name('profile.notifications');
//     Route::inertia('/settings', 'Profile/Settings')->name('profile.settings');
// });

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

// Пока удалил
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
