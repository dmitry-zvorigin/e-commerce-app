<?php

namespace Database\Seeders;

use App\Models\AttributeGroup;
use App\Models\ProductAttribute;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductAttributeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // $groupedAttributes  = [
            
        //     1 => [
        //         'Гарантия продавца', 
        //         'Страна-производитель',
        //     ],
        //     2 => [
        //         'Модель', 
        //         'Сокет', 
        //         'Код производителя', 
        //         'Год релиза', 
        //         'Система охлаждения в комплекте', 
        //         'Термоинтерфейс в комплекте',
        //         'Семейство процессоров',
        //         'Для игрового компьютера',
        //         'Поколение процессоров',
        //         'Производитель',
        //     ],
        //     3 => [
        //         'Общее количество ядер',
        //         'Количество производительных ядер',
        //         'Количество энергоэффективных ядер',
        //         'Максимальное число потоков',
        //         'Объем кэша L2',
        //         'Объем кэша L3',
        //         'Техпроцесс',
        //         'Ядро'
        //     ],
        //     4 => [
        //         'Базовая частота процессора', 
        //         'Максимальная частота в турбо режиме',
        //         'Базовая частота энергоэффективных ядер',
        //         'Частота в турбо режиме энергоэффективных ядер',
        //         'Свободный множитель'
        //     ],
        //     5 => [
        //         'Тип памяти',
        //         'Максимально поддерживаемый объем памяти',
        //         'Количество каналов',
        //         'Частота оперативной памяти',
        //         'Поддержка режима ECC'
        //     ],
        //     6 => [
        //         'Тепловыделение (TDP)',
        //         'Базовое тепловыделение',
        //         'Максимальная температура процессора'
        //     ],
        //     7 => [
        //         'Интегрированное графическое ядро'
        //     ],
        //     8 => [
        //         'Встроенный контроллер PCI Express',
        //         'Число линий PCI Express'
        //     ],
        //     9 => [
        //         'Технология виртуализации',
        //         'Особенности, дополнительно'
        //     ]
        // ];

        $groupedAttributes = [
            'Основные' => [
                ['attribute' => 'Цена', 'slug' => 'price'],
            ],
                
        ];

        foreach ($groupedAttributes  as $groupName => $attributes) {

            $group = AttributeGroup::firstOrCreate([
                'name' => $groupName,
            ]);

            foreach ($attributes as $attribute) {
                ProductAttribute::create([
                    'group_id' => $group->id,
                    'name' => $attribute['attribute'],
                    'slug' => $attribute['slug'],
                ]);
            }
        }
    }
}

