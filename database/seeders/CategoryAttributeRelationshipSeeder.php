<?php

namespace Database\Seeders;

use App\Models\CategoryAttributeRelationship;
use App\Models\ProductAttribute;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoryAttributeRelationshipSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $category_attributes = [
            427 => [
                // ['attribute' => 'Цена', 'is_required' => true, 'type' => 'range'],
                ['attribute' => 'Производитель', 'is_required' => true, 'type' => 'checkbox', 'order' => 2],
                ['attribute' => 'Сокет', 'is_required' => true, 'type' => 'checkbox', 'order' => 3],
                ['attribute' => 'Год релиза', 'is_required' => true, 'type' => 'checkbox', 'order' => 10],
                ['attribute' => 'Семейство процессоров', 'is_required' => true, 'type' => 'checkbox', 'order' => 4],
                ['attribute' => 'Для игрового компьютера', 'is_required' => true, 'type' => 'checkbox', 'order' => 8],
                ['attribute' => 'Поколение процессоров', 'is_required' => true, 'type' => 'checkbox', 'order' => 7],
                ['attribute' => 'Количество производительных ядер', 'is_required' => true, 'type' => 'checkbox', 'order' => 5],
                ['attribute' => 'Базовая частота процессора', 'is_required' => true, 'type' => 'range', 'order' => 12],
                ['attribute' => 'Тип памяти', 'is_required' => true, 'type' => 'checkbox', 'order' => 9],
                ['attribute' => 'Тепловыделение (TDP)', 'is_required' => true, 'type' => 'range', 'order' => 11],
                ['attribute' => 'Интегрированное графическое ядро', 'is_required' => true, 'type' => 'checkbox', 'order' => 6],
                ['attribute' => 'Встроенный контроллер PCI Express', 'is_required' => true, 'type' => 'checkbox', 'order' => 13],
                ['attribute' => 'Цена', 'is_required' => true, 'type' => 'price', 'order' => 1],

                ['attribute' => 'Гарантия продавца', 'is_required' => false, 'type' => 'checkbox'],
                ['attribute' => 'Система охлаждения в комплекте', 'is_required' => false, 'type' => 'checkbox'],
                ['attribute' => 'Модель', 'is_required' => false, 'type' => 'checkbox'],
                ['attribute' => 'Объем кэша L2', 'is_required' => false, 'type' => 'checkbox'],
                ['attribute' => 'Объем кэша L3', 'is_required' => false, 'type' => 'checkbox'],
                ['attribute' => 'Техпроцесс', 'is_required' => false, 'type' => 'checkbox'],
                ['attribute' => 'Максимальное число потоков', 'is_required' => false, 'type' => 'checkbox'],
                ['attribute' => 'Количество энергоэффективных ядер', 'is_required' => false, 'type' => 'checkbox'],
                ['attribute' => 'Общее количество ядер', 'is_required' => false, 'type' => 'checkbox'],
                ['attribute' => 'Свободный множитель', 'is_required' => false, 'type' => 'checkbox'],
                ['attribute' => 'Максимальная частота в турбо режиме', 'is_required' => false, 'type' => 'range'],
                ['attribute' => 'Количество каналов', 'is_required' => false, 'type' => 'checkbox'],
                ['attribute' => 'Частота оперативной памяти', 'is_required' => false, 'type' => 'checkbox'],
                ['attribute' => 'Максимально поддерживаемый объем памяти', 'is_required' => false, 'type' => 'checkbox'],
                ['attribute' => 'Поддержка режима ECC', 'is_required' => false, 'type' => 'checkbox'],
                ['attribute' => 'Модель графического процессора', 'is_required' => false, 'type' => 'checkbox'],
                ['attribute' => 'Число линий PCI Express', 'is_required' => false, 'type' => 'checkbox'],

            ]
        ];

        foreach ($category_attributes as $category_id => $attributes) {
            foreach ($attributes as $attirbute) {
                $attributeId = ProductAttribute::where('name', $attirbute['attribute'])->value('id');
                CategoryAttributeRelationship::create([
                    'category_id' => $category_id,
                    'attribute_id' => $attributeId,
                    'is_required' => $attirbute['is_required'],
                    'type' => $attirbute['type'],
                    'order' => isset($attirbute['order']) ? $attirbute['order'] : null,
                ]);
            }

        }
    }
}
