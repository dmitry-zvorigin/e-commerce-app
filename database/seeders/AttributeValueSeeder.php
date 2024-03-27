<?php

namespace Database\Seeders;

use App\Models\AttributeValue;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AttributeValueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $attributesValues = [
            1 => [
                ['value' => 12, 'unit_type' => 'мес.'], 
                ['value' => 36, 'unit_type' => 'мес.'],
            ],
            2 => [
                ['value' => 'Вьетнам', 'unit_type' => null], 
                ['value' => 'Малайзия', 'unit_type' => null], 
            ],
            3 => [
                ['value' => 'AMD', 'unit_type' => null], 
                ['value' => 'Intel', 'unit_type' => null], 
            ],
            4 => [
                ['value' => 'Intel Core i3-10105F', 'unit_type' => null], 
                ['value' => 'AMD FX-4300', 'unit_type' => null], 
            ],
            5 => [
                ['value' => 'LGA 1200', 'unit_type' => null], 
                ['value' => 'AM3+', 'unit_type' => null], 
            ],
            6 => [
                ['value' => '[CM8070104291323-SRH8V]', 'unit_type' => null], 
                ['value' => '[FD4300WMW4MHK]', 'unit_type' => null], 
            ],
            7 => [
                ['value' => 2020, 'unit_type' => null], 
                ['value' => 2012, 'unit_type' => null], 
            ],
            8 => [
                ['value' => 'нет', 'unit_type' => null], 
            ],
            9 => [
                ['value' => 'нет', 'unit_type' => null], 
            ],
            
            10 => [
                ['value' => 'AMD Ryzen 3', 'unit_type' => null], 
                ['value' => 'AMD Ryzen 5', 'unit_type' => null], 
                ['value' => 'AMD Ryzen 7', 'unit_type' => null], 
                ['value' => 'AMD Ryzen 9', 'unit_type' => null], 
                ['value' => 'AMD FX', 'unit_type' => null], 
                ['value' => 'AMD Athlon', 'unit_type' => null], 
                ['value' => 'Intel Celeron', 'unit_type' => null], 
                ['value' => 'Intel Pentium', 'unit_type' => null], 
                ['value' => 'Intel Core i3', 'unit_type' => null], 
                ['value' => 'Intel Core i5', 'unit_type' => null], 
                ['value' => 'Intel Core i7', 'unit_type' => null], 
                ['value' => 'Intel Core i9', 'unit_type' => null], 
            ],
            11 => [
                ['value' => 'да', 'unit_type' => null], 
                ['value' => 'нет', 'unit_type' => null], 
            ],
            12 => [
                ['value' => 'Intel 14-e поколение', 'unit_type' => null], 
                ['value' => 'Intel 13-e поколение', 'unit_type' => null], 
                ['value' => 'Intel 12-e поколение', 'unit_type' => null], 
                ['value' => 'Intel 11-e поколение', 'unit_type' => null], 
                ['value' => 'Intel 10-e поколение', 'unit_type' => null], 
                ['value' => 'Intel 9-e поколение', 'unit_type' => null], 
                ['value' => 'Intel 8-e поколение', 'unit_type' => null], 
                ['value' => 'AMD FX', 'unit_type' => null], 
                ['value' => 'AMD Ryzen 2000', 'unit_type' => null], 
                ['value' => 'AMD Ryzen 3000', 'unit_type' => null], 
                ['value' => 'AMD Ryzen 4000', 'unit_type' => null], 
                ['value' => 'AMD Ryzen 5000', 'unit_type' => null], 
                ['value' => 'AMD Ryzen 6000', 'unit_type' => null],
                ['value' => 'AMD Ryzen 7000', 'unit_type' => null],
                ['value' => 'AMD Ryzen 8000', 'unit_type' => null],
            ],

            13 => [
                ['value' => 4, 'unit_type' => null], 
                ['value' => 2, 'unit_type' => null], 
            ],
            14 => [
                ['value' => 4, 'unit_type' => null], 
                ['value' => 2, 'unit_type' => null], 
            ],
            15 => [
                ['value' => 'нет', 'unit_type' => null], 
            ],
            16 => [
                ['value' => 8, 'unit_type' => null], 
                ['value' => 4, 'unit_type' => null], 
            ],
            17 => [
                ['value' => '1', 'unit_type' => 'МБ'], 
                ['value' => '0.5', 'unit_type' => 'МБ'], 
                ['value' => '4', 'unit_type' => 'МБ'],
            ],
            18 => [
                ['value' => '6', 'unit_type' => 'МБ'], 
                ['value' => '4', 'unit_type' => 'МБ'], 
            ],
            19 => [
                ['value' => '14 нм', 'unit_type' => null], 
                ['value' => '32 нм', 'unit_type' => null], 
                ['value' => 'TSMC 7FF', 'unit_type' => null], 
            ],
            20 => [
                ['value' => 'Intel Comet Lake-S', 'unit_type' => null], 
                ['value' => 'AMD Vishera', 'unit_type' => null], 
            ],
            21 => [
                ['value' => 2.7, 'unit_type' => 'ГГц'], 
                ['value' => 2.8, 'unit_type' => 'ГГц'], 
                ['value' => 3.8, 'unit_type' => 'ГГц'], 
                ['value' => 3.9, 'unit_type' => 'ГГц'], 
                ['value' => 4.0, 'unit_type' => 'ГГц'], 
                ['value' => 4.1, 'unit_type' => 'ГГц'], 
                ['value' => 4.2, 'unit_type' => 'ГГц'], 
                ['value' => 4.3, 'unit_type' => 'ГГц'], 
                ['value' => 4.5, 'unit_type' => 'ГГц'], 
                ['value' => 4.8, 'unit_type' => 'ГГц'], 
                ['value' => 4.9, 'unit_type' => 'ГГц'], 
            ],
            22 => [
                ['value' => 4.3, 'unit_type' => 'ГГц'], 
                ['value' => 4.5, 'unit_type' => 'ГГц'], 
                ['value' => 4.8, 'unit_type' => 'ГГц'], 
                ['value' => 4.9, 'unit_type' => 'ГГц'], 
                ['value' => 5.5, 'unit_type' => 'ГГц'], 
                ['value' => 5.7, 'unit_type' => 'ГГц'], 
            ],
            23 => [
                ['value' => 'нет', 'unit_type' => null], 
            ],
            24 => [
                ['value' => 'нет', 'unit_type' => null], 
            ],
            25 => [
                ['value' => 'нет', 'unit_type' => null], 
                ['value' => 'есть', 'unit_type' => null], 
            ],
            26 => [
                ['value' => 'DDR4', 'unit_type' => null], 
                ['value' => 'DDR3', 'unit_type' => null], 
            ],
            27 => [
                ['value' => 64, 'unit_type' => 'ГБ'], 
                ['value' => 128, 'unit_type' => 'ГБ'], 
                ['value' => 192, 'unit_type' => 'ГБ'], 
                ['value' => 256, 'unit_type' => 'ГБ'], 
            ],
            28 => [
                ['value' => '2', 'unit_type' => null], 
            ],
            29 => [
                ['value' => 'DDR4-2666', 'unit_type' => null], 
                ['value' => 'DDR3-1866', 'unit_type' => null], 
            ],
            30 => [
                ['value' => 'нет', 'unit_type' => null],             
            ],
            31 => [
                ['value' => 65, 'unit_type' => 'Вт'], 
                ['value' => 70, 'unit_type' => 'Вт'], 
                ['value' => 75, 'unit_type' => 'Вт'], 
                ['value' => 80, 'unit_type' => 'Вт'], 
                ['value' => 85, 'unit_type' => 'Вт'], 
                ['value' => 90, 'unit_type' => 'Вт'], 
                ['value' => 95, 'unit_type' => 'Вт'], 
                ['value' => 100, 'unit_type' => 'Вт'], 
            ],
            32 => [
                ['value' => 65, 'unit_type' => 'Вт'], 
                ['value' => 70, 'unit_type' => 'Вт'], 
                ['value' => 75, 'unit_type' => 'Вт'], 
                ['value' => 80, 'unit_type' => 'Вт'], 
                ['value' => 85, 'unit_type' => 'Вт'], 
                ['value' => 90, 'unit_type' => 'Вт'], 
                ['value' => 95, 'unit_type' => 'Вт'], 
                ['value' => 100, 'unit_type' => 'Вт'], 
            ],
            33 => [
                ['value' => 70.5, 'unit_type' => '°C'], 
                ['value' => 100, 'unit_type' => '°C'], 
            ],
            34 => [
                ['value' => 'нет', 'unit_type' => null], 
            ],
            35 => [
                ['value' => 'PCI-E 3.0', 'unit_type' => null], 
                ['value' => 'нет', 'unit_type' => null], 
            ],
            36 => [
                ['value' => '16 шт', 'unit_type' => null], 
                ['value' => 'нет', 'unit_type' => null], 
            ],
            37 => [
                ['value' => 'есть', 'unit_type' => null], 
            ],
            38 => [
                ['value' => 'поддержка Intel Optane', 'unit_type' => null], 
            ],
        ];

        foreach ($attributesValues  as $attributeId => $values) {
            foreach ($values as $item) {
                AttributeValue::create([
                    'attribute_id' => $attributeId,
                    'name' => $item['value'],
                    'unit_type' => $item['unit_type'],
                ]);
            }
        }
    }
}
