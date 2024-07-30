<?php

namespace App\Http\Requests;

use App\Models\CategoryAttributeRelationship;
use Illuminate\Foundation\Http\FormRequest;

class FilterProductRequest extends FormRequest
{
    protected $dynamicRules = [];

    public function __construct()
    {
        // $filters = \DB::table('category_attribute_relationships')->with()->get();
        $filters = CategoryAttributeRelationship::with('attribute')->get();

        // dd($filters->toArray());
        foreach ($filters as $filter) {
            $this->dynamicRules[$filter->attribute->slug] = $this->getValidationRuleForType($filter->type);
        }
    }
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
        // return [
        //     //
        // ];
        // dd($this->dynamicRules);
        return $this->dynamicRules;
    }

    public function filtersQuery()
    {
        // Формируем request, разделяем его на значения
        $filterQuery = [];
        foreach ($this->all() as $key => $values) {
            $filterQuery[$key] = explode(',', $values);
        }

        return $filterQuery;
    }

    private function getValidationRuleForType($type)
    {
        switch ($type) {
            case 'price' :
                return 'string';
            case 'checkbox' :
                return 'string';
            case 'range' : 
                return 'string';
            default: 
                return 'string';
        }
    }
}
