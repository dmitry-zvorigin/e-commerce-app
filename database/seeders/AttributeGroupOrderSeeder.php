<?php

namespace Database\Seeders;

use App\Models\AttributeGroup;
use App\Models\AttributeGroupOrder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AttributeGroupOrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $arr = [
            427 => [
                ['group_name' => 'Заводские данные', 'order' => 1],
                ['group_name' => 'Общие параметры', 'order' => 2],
                ['group_name' => 'Ядро и архитектура', 'order' => 3],
                ['group_name' => 'Частота и возможность разгона', 'order' => 4],
                ['group_name' => 'Параметры оперативной памяти', 'order' => 5],
                ['group_name' => 'Тепловые характеристики', 'order' => 6],
                ['group_name' => 'Графическое ядро', 'order' => 7],
                ['group_name' => 'Шина и контроллеры', 'order' => 8],
                ['group_name' => 'Дополнительно', 'order' => 9],
            ],
            429 => [
                ['group_name' => 'Заводские данные', 'order' => 1],
                ['group_name' => 'Общие параметры', 'order' => 2],
                ['group_name' => 'Основные параметры', 'order' => 3],
                ['group_name' => 'Спецификации видеопроцессора', 'order' => 4],
                ['group_name' => 'Спецификации видеопамяти', 'order' => 5],
                ['group_name' => 'Вывод изображения', 'order' => 6],
                ['group_name' => 'Подключение', 'order' => 7],
                ['group_name' => 'Система охлаждения', 'order' => 8],
                ['group_name' => 'Дополнительно', 'order' => 9],
                ['group_name' => 'Габариты и вес', 'order' => 10],
            ],
        ];

        foreach ($arr as $categoryId => $groups) {
            
            foreach ($groups as $group) {

                $groupId = AttributeGroup::where('name', $group['group_name'])->value('id');

                AttributeGroupOrder::create([
                    'category_id' => $categoryId,
                    'group_id' => $groupId,
                    'order' => $group['order'],
                ]);
            }
        }
    }
}
