<?php

namespace App\Http\Requests;

use App\Models\Category;
use Illuminate\Foundation\Http\FormRequest;

class FilterWishlistRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'order' => 'nullable|string|in:price_desc,price_asc',
            'filters' => 'nullable|string',
            'categories' => 'nullable|string',
        ];
    }

    public function filterQuery() : array
    {
        $filterQuery = [
            'order' => $this->getOrderValue(),
            'selected_categories' => $this->getCategoryIds(),
            'default' => [],
        ];

        return $filterQuery;
    }

    /**
     * Преобразует значения сортировки в числовое
     * @return int|null
     */
    private function getOrderValue() : ?int
    {
        $order = $this->input('order');

        return match ($order) {
            'price_desc' => 1,
            'price_asc' => 2,
            default => null,
        };
    }

    /**
     * Получает ID категории по их slug
     * @return array
     */
    private function getCategoryIds() : array
    {
        $categorySlug = explode(',', $this->input('categories', ''));

        return Category::whereIn('slug', $categorySlug)->pluck('id')->toArray();
    }


}
