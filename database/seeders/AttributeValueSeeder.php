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
            1 => ['12 мес.', '36 мес.'],
            2 => ['Вьетнам', 'Малайзия'],
            3 => ['AMD', 'Intel'],
            4 => ['Intel Core i3-10105F', 'AMD FX-4300'],
            5 => ['LGA 1200', 'AM3+'],
            6 => ['[CM8070104291323-SRH8V]', '[FD4300WMW4MHK]'],
            7 => ['2020', '2012'],
            8 => ['нет'],
            9 => ['нет'],
            
            10 => [
                'AMD Ryzen 3', 'AMD Ryzen 5', 'AMD Ryzen 7', 'AMD Ryzen 9', 'AMD FX', 'AMD Athlon', 
                'Intel Celeron', 'Intel Pentium', 'Intel Core i3', 'Intel Core i5', 'Intel Core i7', 'Intel Core i9',
            ],
            11 => ['нет', 'да'],
            12 => [
                'Intel 14-e поколение', 'Intel 13-e поколение', 'Intel 12-e поколение', 
                'Intel 11-e поколение', 'Intel 10-e поколение', 'Intel 9-e поколение', 'Intel 8-e поколение',
                'AMD FX', 'AMD Ryzen 2000', 'AMD Ryzen 2000', 'AMD Ryzen 3000', 'AMD Ryzen 4000', 'AMD Ryzen 5000',
                'AMD Ryzen 6000', 'AMD Ryzen 7000', 'AMD Ryzen 8000'  
            ],


            13 => ['4', '2'],
            14 => ['4', '2'],
            15 => ['нет'],
            16 => ['8', '4'],
            17 => ['1 МБ', '0.5 МБ', '4 МБ'],
            18 => ['6 МБ', '4 МБ'],
            19 => ['14 нм', '14 нм', '32 нм'],
            20 => ['Intel Comet Lake-S', 'AMD Vishera'],
            21 => ['3.7 ГГц', '3.8 ГГц'],
            22 => ['4.4 ГГц', '4 ГГц'],
            23 => ['нет'],
            24 => ['нет'],
            25 => ['нет', 'есть'],
            26 => ['DDR4', 'DDR3'],
            27 => ['128 ГБ'],
            28 => ['2'],
            29 => ['DDR4-2666', 'DDR3-1866'],
            30 => ['нет'],
            31 => ['65 Вт', '95 Вт'],
            32 => ['65 Вт', '95 Вт'],
            33 => ['100 °C', '70.5 °C'],
            34 => ['нет'],
            35 => ['PCI-E 3.0', 'нет'],
            36 => ['16 шт', 'нет'],
            37 => ['есть'],
            38 => ['поддержка Intel Optane'],
        ];

        foreach ($attributesValues  as $attributeId => $values) {
            foreach ($values as $value) {
                AttributeValue::create([
                    'attribute_id' => $attributeId,
                    'name' => $value,
                ]);
            }
        }
    }
}
