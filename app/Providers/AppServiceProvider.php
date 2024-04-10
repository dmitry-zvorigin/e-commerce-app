<?php

namespace App\Providers;

use App\Repositories\AttributeRepository;
use App\Repositories\ProductRepository;
use App\Services\Filters\FilterStrategyFactory;
use App\Services\Filters\ProductFilterService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(ProductFilterService::class, function ($app) {
            $productRepository = $app->make(ProductRepository::class);
            $attributeRepository = $app->make(AttributeRepository::class);
            $filterStrategyFactory = $app->make(FilterStrategyFactory::class);
                        
            // Возвращаем новый экземпляр ProductService с передачей каждой стратегии отдельным параметром
            return new ProductFilterService(
                $productRepository, 
                $attributeRepository, 
                $filterStrategyFactory,
            );
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
