<?php

namespace Database\Seeders;

use App\Models\AttributeValue;
use App\Models\Product;
use App\Models\ProductAttribute;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

class ProductAdditionallySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $characteristic = [
            'Заводские данные' => [
                [ 'attribute' => 'Гарантия продавца', 'value' => 12, 'unit_type' => 'мес.'],
                [ 'attribute' => 'Страна-производитель', 'value' => 'Китай'],
            ],

            'Общие параметры' => [
                [ 'attribute' => 'Модель', 'value' => 'AMD Ryzen Threadripper PRO 5995WX'],
                [ 'attribute' => 'Сокет ', 'value' => 'sWRX8'],
                [ 'attribute' => 'Код производителя', 'value' => '[100-000000444]'],
                [ 'attribute' => 'Год релиза', 'value' => 2022],
                [ 'attribute' => 'Система охлаждения в комплекте', 'value' => 'нет'],
                [ 'attribute' => 'Термоинтерфейс в комплекте', 'value' => 'нет'],
                [ 'attribute' => 'Производитель', 'value' => 'AMD'],
                [ 'attribute' => 'Семейство процессоров', 'value' => 'AMD Ryzen Threadripper'],
                [ 'attribute' => 'Для игрового компьютера', 'value' => 'нет'],
                [ 'attribute' => 'Поколение процессоров', 'value' => 'AMD Ryzen Threadripper PRO 5000'],
            ],

            'Ядро и архитектура' => [
                [ 'attribute' => 'Общее количество ядер', 'value' => 64],
                [ 'attribute' => 'Количество производительных ядер ', 'value' => 64],
                [ 'attribute' => 'Количество энергоэффективных ядер', 'value' => 'нет'],
                [ 'attribute' => 'Максимальное число потоков', 'value' => 128],
                [ 'attribute' => 'Объем кэша L2', 'value' => 32, 'unit_type' => 'МБ'],
                [ 'attribute' => 'Объем кэша L3', 'value' => 256, 'unit_type' => 'МБ'],
                [ 'attribute' => 'Техпроцесс', 'value' => 'TSMC 7FF'],
                [ 'attribute' => 'Ядро', 'value' => 'AMD Castle Peak'],
            ],

            'Частота и возможность разгона' => [
                [ 'attribute' => 'Базовая частота процессора', 'value' => 2.7, 'unit_type' => 'ГГц'],
                [ 'attribute' => 'Максимальная частота в турбо режиме', 'value' => 4.5, 'unit_type' => 'ГГц'],
                [ 'attribute' => 'Базовая частота энергоэффективных ядер', 'value' => 'нет'],
                [ 'attribute' => 'Частота в турбо режиме энергоэффективных ядер', 'value' => 'нет'],
                [ 'attribute' => 'Свободный множитель', 'value' => 'есть'],
            ],

            'Параметры оперативной памяти' => [
                [ 'attribute' => 'Тип памяти', 'value' => 'DDR4'],
                [ 'attribute' => 'Максимально поддерживаемый объем памяти', 'value' => 2048, 'unit_type' => 'ГБ'],
                [ 'attribute' => 'Количество каналов', 'value' => 8],
                [ 'attribute' => 'Частота оперативной памяти', 'value' => 'DDR4-3200'],
                [ 'attribute' => 'Поддержка режима ECC', 'value' => 'есть'],
            ],

            'Тепловые характеристики' => [
                [ 'attribute' => 'Тепловыделение (TDP)', 'value' => 280, 'unit_type' => 'Вт'],
                [ 'attribute' => 'Базовое тепловыделение', 'value' => 280, 'unit_type' => 'Вт'],
                [ 'attribute' => 'Максимальная температура процессора', 'value' => 95, 'unit_type' => '°C'],
            ],

            'Графическое ядро' => [
                [ 'attribute' => 'Интегрированное графическое ядро', 'value' => 'нет'],
            ],
            
            'Шина и контроллеры' => [
                [ 'attribute' => 'Встроенный контроллер PCI Express', 'value' => 'PCI-E 4.0'],
                [ 'attribute' => 'Число линий PCI Express', 'value' => '128 шт'],
            ],

            'Дополнительно' => [
                [ 'attribute' => 'Технология виртуализации', 'value' => 'есть'],
                [ 'attribute' => 'Особенности, дополнительно', 'value' => 'крепление для системы охлаждения в комплекте'],
            ],

        ];
        
        Product::factory()->count(100)->create()->each(function ($product) use ($characteristic) {
            foreach ($characteristic as $attributes) {

                foreach ($attributes as $attribute) {

                $productAttributeId = ProductAttribute::where('name', $attribute['attribute'])->value('id');
                $attributeValues = AttributeValue::where('attribute_id', $productAttributeId)->pluck('id')->toArray();
                $randomValueId = Arr::random($attributeValues);

                $product->characteristics()->create([
                    'product_id' => $product->id,
                    'attribute_id' => $productAttributeId,
                    'value_id' => $randomValueId
                ]);

                }

            }
        });

    }
}
