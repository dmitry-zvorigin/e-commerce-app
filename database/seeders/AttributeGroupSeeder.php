<?php

namespace Database\Seeders;

use App\Models\AttributeGroup;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AttributeGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $groups = [
            'Заводские данные',
            'Общие параметры',
            'Ядро и архитектура',
            'Частота и возможность разгона',
            'Параметры оперативной памяти',
            'Тепловые характеристики',
            'Графическое ядро',
            'Шина и контроллеры',
            'Дополнительно',
        ];

        foreach ($groups as $group) {
            AttributeGroup::create([
                'name' => $group
            ]);
        }
    }
}
