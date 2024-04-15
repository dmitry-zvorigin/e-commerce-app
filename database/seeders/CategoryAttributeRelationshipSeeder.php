<?php

namespace Database\Seeders;

use App\Models\AttributeGroup;
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
                'Основные' => [
                    ['attribute' => 'Цена', 'is_required' => true, 'type' => 'price', 'order' => 1],
                ],
                'Заводские данные' => [
                    ['attribute' => 'Гарантия продавца', 'is_required' => false, 'type' => 'checkbox'],
                ],
                'Общие параметры' => [
                    ['attribute' => 'Производитель', 'is_required' => true, 'type' => 'checkbox', 'order' => 2],
                    ['attribute' => 'Сокет', 'is_required' => true, 'type' => 'checkbox', 'order' => 3],
                    ['attribute' => 'Год релиза', 'is_required' => true, 'type' => 'checkbox', 'order' => 10],
                    ['attribute' => 'Для игрового компьютера', 'is_required' => true, 'type' => 'checkbox', 'order' => 8],
                    ['attribute' => 'Поколение процессоров', 'is_required' => true, 'type' => 'checkbox', 'order' => 7],
                    ['attribute' => 'Семейство процессоров', 'is_required' => true, 'type' => 'checkbox', 'order' => 4],
                    ['attribute' => 'Система охлаждения в комплекте', 'is_required' => false, 'type' => 'checkbox'],
                    ['attribute' => 'Модель', 'is_required' => false, 'type' => 'checkbox'],
                ],
                'Ядро и архитектура' => [
                    ['attribute' => 'Общее количество ядер', 'is_required' => false, 'type' => 'checkbox'],
                    ['attribute' => 'Количество производительных ядер', 'is_required' => true, 'type' => 'checkbox', 'order' => 5],
                    ['attribute' => 'Объем кэша L2', 'is_required' => false, 'type' => 'checkbox'],
                    ['attribute' => 'Объем кэша L3', 'is_required' => false, 'type' => 'checkbox'],
                    ['attribute' => 'Техпроцесс', 'is_required' => false, 'type' => 'checkbox'],
                    ['attribute' => 'Максимальное число потоков', 'is_required' => false, 'type' => 'checkbox'],
                    ['attribute' => 'Количество энергоэффективных ядер', 'is_required' => false, 'type' => 'checkbox'],
                ],
                'Частота и возможность разгона' => [
                    ['attribute' => 'Базовая частота процессора', 'is_required' => true, 'type' => 'range', 'order' => 12],
                    ['attribute' => 'Свободный множитель', 'is_required' => false, 'type' => 'checkbox'],
                    ['attribute' => 'Максимальная частота в турбо режиме', 'is_required' => false, 'type' => 'range'],
                ],
                'Параметры оперативной памяти' => [
                    ['attribute' => 'Тип памяти', 'is_required' => true, 'type' => 'checkbox', 'order' => 9],
                    ['attribute' => 'Количество каналов', 'is_required' => false, 'type' => 'checkbox'],
                    ['attribute' => 'Частота оперативной памяти', 'is_required' => false, 'type' => 'checkbox'],
                    ['attribute' => 'Максимально поддерживаемый объем памяти', 'is_required' => false, 'type' => 'checkbox'],
                    ['attribute' => 'Поддержка режима ECC', 'is_required' => false, 'type' => 'checkbox'],
                ],
                'Тепловые характеристики' => [
                    ['attribute' => 'Тепловыделение (TDP)', 'is_required' => true, 'type' => 'range', 'order' => 11],
                ],
                'Графическое ядро' => [
                    ['attribute' => 'Интегрированное графическое ядро', 'is_required' => true, 'type' => 'checkbox', 'order' => 6],
                    ['attribute' => 'Модель графического процессора', 'is_required' => false, 'type' => 'checkbox'],
                ],
                'Шина и контроллеры' => [
                    ['attribute' => 'Встроенный контроллер PCI Express', 'is_required' => true, 'type' => 'checkbox', 'order' => 13],
                    ['attribute' => 'Число линий PCI Express', 'is_required' => false, 'type' => 'checkbox'],
                ],
            ],

            429 => [
                'Основные' => [
                    ['attribute' => 'Цена', 'is_required' => true, 'type' => 'price', 'order' => 1],
                ],
                'Общие параметры' => [
                    ['attribute' => 'Производитель', 'is_required' => true, 'type' => 'checkbox', 'order' => 2],
                    ['attribute' => 'Назначение', 'is_required' => true, 'type' => 'checkbox', 'order' => 5],
                    ['attribute' => 'Производитель графического процессора', 'is_required' => true, 'type' => 'checkbox', 'order' => 6],
                    ['attribute' => 'Цвет', 'is_required' => true, 'type' => 'checkbox', 'order' => 11],
                ],
                'Основные параметры' => [
                    ['attribute' => 'Графический процессор', 'is_required' => true, 'type' => 'checkbox', 'order' => 3],
                ],
                'Спецификации видеопамяти' => [
                    ['attribute' => 'Объем видеопамяти', 'is_required' => true, 'type' => 'checkbox', 'order' => 4],
                    ['attribute' => 'Разрядность шины памяти', 'is_required' => true, 'type' => 'checkbox', 'order' => 7],
                    ['attribute' => 'Тип памяти', 'is_required' => true, 'type' => 'checkbox', 'order' => 8],
                ],
                'Подключение' => [
                    ['attribute' => 'Интерфейс подключения', 'is_required' => true, 'type' => 'checkbox', 'order' => 9],
                ],
                'Система охлаждения' => [
                    ['attribute' => 'Тип и количество установленных вентиляторов', 'is_required' => true, 'type' => 'checkbox', 'order' => 10],
                ],
                'Габариты и вес' => [
                    ['attribute' => 'Длина видеокарты', 'is_required' => true, 'type' => 'range', 'order' => 12],
                ],
                'Вывод изображения' => [
                    ['attribute' => 'Количество подключаемых одновременно мониторов', 'is_required' => true, 'type' => 'checkbox', 'order' => 13],
                ],
            ],
        ];

        foreach ($category_attributes as $category_id => $groupsAttribute) {
            foreach ($groupsAttribute as $groupName => $attributes) {
                $groupId = AttributeGroup::where('name', $groupName)->value('id');
                foreach ($attributes as $attirbute) {
                    $attributeId = ProductAttribute::where('name', $attirbute['attribute'])->where('group_id', $groupId)->value('id');
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
}
