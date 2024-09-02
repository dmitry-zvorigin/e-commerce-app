<?php

namespace App\Http\Requests;

use App\Models\CategoryAttributeRelationship;
use Illuminate\Foundation\Http\FormRequest;

class FilterProductRequest extends FormRequest
{
    protected $dynamicRules = [];
    protected $attributesCache = [];
    protected $filterTypes = [
        'checkbox' => 'FilterAttributeCheckbox',
        'range' => 'FilterAttributeRange',
        'price' => 'FilterAttributePrice',
    ];

    public function __construct()
    {
        parent::__construct();

        $filters = CategoryAttributeRelationship::with('attribute')->get();

        $this->attributesCache = $filters->keyBy('attribute.slug');


        foreach ($filters as $filter) {

            if (!isset($filter->attribute, $filter->type)) {
                continue;
            }

            $this->dynamicRules[$filter->attribute->slug] = $this->getValidationRuleForType($filter->type);
        }

    }

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return $this->dynamicRules;
    }

    public function filterQuery() : array
    {
        $filterQuery = [
            'checkbox' => [],
            'range' => [],
            'price' => [],
            'order' => null,
            'default' => [],
        ];

        foreach ($this->all() as $key => $values) {

            if ($key === 'order') {
                $filterQuery['order'] = $this->normalizeOrderValues($values);
                continue;
            }

            $filterType = $this->getFilterType($key);
    
            if ($filterType) {

                $attributeId = $this->getAttributeIdBySlug($key);
    
                if ($attributeId) {
                    $valuesArray = explode(',', $values);

                    if ($filterType === 'price') {
                        // Изменено: Записываем результат напрямую в 'price', без ID
                        $filterQuery['price'] = $this->normalizeFilterValues($key, $valuesArray, $filterType);
                    } else {
                        $filterQuery[$filterType][$attributeId] = $this->normalizeFilterValues($key, $valuesArray, $filterType);
                    }
                }
            } else {
                $filterQuery['default'][] = [$key => explode(',', $values)];
            }
        }

        return $filterQuery;
    }

    private function getValidationRuleForType(string $type) : string
    {
        return match ($type) {
            'price' => 'string',
            'checkbox' => 'string',
            'range' => 'string',
            default => 'string',
        };

        // TODO
        // return match ($type) {
        //     'price' => 'regex:/^\d+(\.\d{1,2})?,\d+(\.\d{1,2})?$/', // Ожидаем формат "число,число"
        //     'checkbox' => 'string', // Для дальнейшего преобразования в массив
        //     'range' => 'regex:/^\d+(\.\d{1,2})?,\d+(\.\d{1,2})?$/', // Ожидаем формат "число,число"
        //     default => 'string',
        // };
    }

    private function getFilterType(string $key) : ?string
    {
        return $this->attributesCache[$key]->type ?? null;
    }

    /**
     * Преобразует значения фильтров в нужный формат.
     * @param string $key
     * @param array $values
     * @param string $filterType
     * @return array
     */
    private function normalizeFilterValues(string $key, array $values, string $filterType): array
    {
        $normalizers = [
            'checkbox' => fn() => $this->normalizeCheckboxValues($key, $values),
            'range' => fn() => [
                'min' => floatval($values[0] ?? 0),
                'max' => floatval($values[1] ?? 0),
            ],
            'price' => fn() => [
                'min' => floatval($values[0] ?? 0),
                'max' => floatval($values[1] ?? 0),
            ],
        ];

        return $normalizers[$filterType]() ?? $values;
    }

    /**
     * Преобразует значения для фильтров типа "checkbox".
     * @param string $key
     * @param array $values
     * @return array
     */
    private function normalizeCheckboxValues(string $key, array $values): array
    {
        $attribute = $this->attributesCache[$key] ?? null;

        if ($attribute && $attribute->type === 'checkbox') {
            // Пример: преобразование строковых значений в ID или оставить как есть
            return array_map(function ($value) use ($attribute) {
                // Здесь вы можете преобразовать, например, 'amd' -> 5 или 'intel' -> 65
                return $this->getAttributeValueIdByName($attribute->id, $value);
            }, $values);
        }

        return $values;
    }

    /**
     * Обабатывает значения для сортировки
     * @param string $orderValue
     * @return int
     */
    private function normalizeOrderValues(string $orderValue) : int
    {
        return (int) $orderValue;
    }

    /**
     * Метод для получения ID значения атрибута по его имени.
     * 
     * @param int $attributeId
     * @param string $name
     * @return int
     */
    private function getAttributeValueIdByName(int $attributeId, string $name): int
    {
        return (int) $name;
        // dd($attributeId, $name);
        // // Здесь используйте вашу модель, чтобы получить ID по названию
        // $value = \DB::table('attribute_values')
        //     ->where('attribute_id', $attributeId)
        //     ->where('name', $name)
        //     ->first();

        // return $value ? $value->id : 0; // Возвращаем 0, если значение не найдено
    }

    /**
     * Получает ID атрибута по его slug.
     * @param string $slug
     * @return int | null
     */
    private function getAttributeIdBySlug(string $slug): ?int
    {
        return $this->attributesCache[$slug]->attribute->id ?? null;
    }
}
