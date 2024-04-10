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

    public function filterProducts(Category $category, array $filtersQuery)
    {
        $productsQuery = Product::where('category_id', $category->id);

        $slugs = array_keys($filtersQuery);
        $attributesBySlug = $this->attributeRepository->getAttributeIdsBySlugs($slugs);

        foreach ($filtersQuery as $key => $filterValues) {

            if (isset($attributesBySlug[$key])) {
                $attributeId = $attributesBySlug[$key];
                $attributeType = CategoryAttributeRelationship::where('attribute_id', $attributeId)->value('type');

                $filterStrategy = $this->filterStrategyFactory->make($attributeType);
                if ($filterStrategy) {
                    $productsQuery = $filterStrategy->apply($productsQuery, $attributeId, $filterValues);
                }
            }
        }

        return $productsQuery;
    }
    
}