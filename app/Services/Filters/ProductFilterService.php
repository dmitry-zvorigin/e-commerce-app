<?php 

namespace App\Services\Filters;

use App\Models\Category;
use App\Models\CategoryAttributeRelationship;
use App\Models\Product;
use App\Repositories\AttributeRepository;
use App\Repositories\ProductRepository;

class ProductFilterService 
{
    protected $productRepository;
    protected $attributeRepository;
    protected $filterStrategyFactory;

    public function __construct(
        ProductRepository $productRepository, 
        AttributeRepository $attributeRepository,
        FilterStrategyFactory $filterStrategyFactory,
    ) {
        $this->productRepository  = $productRepository;
        $this->attributeRepository = $attributeRepository;
        $this->filterStrategyFactory = $filterStrategyFactory;

    }

    public function filterProducts($productsQuery, array $filtersQuery)
    {
        $slugs = array_keys($filtersQuery);
        $attributesBySlug = $this->attributeRepository->getAttributeIdsBySlugs($slugs);

        $attributeIds = array_values($attributesBySlug);
        $attributeTypes =  CategoryAttributeRelationship::whereIn('attribute_id', $attributeIds)->pluck('type', 'attribute_id');

        foreach ($filtersQuery as $key => $filterValues) {
            if (isset($attributesBySlug[$key])) {
                $attributeId = $attributesBySlug[$key];
                $attributeType = $attributeTypes[$attributeId] ?? null;

                if ($attributeType) {
                    $filterStrategy = $this->filterStrategyFactory->make($attributeType);
                    if ($filterStrategy) {
                        $productsQuery = $filterStrategy->apply($productsQuery, $attributeId, $filterValues);
                    }
                }
            }
        }

        return $productsQuery;
    }
    
}