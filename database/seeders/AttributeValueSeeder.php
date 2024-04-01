<?php

namespace Database\Seeders;

use App\Models\AttributeValue;
use App\Models\ProductAttribute;
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
            'Год релиза' => [
                ['value_int' => 2024, 'value_string' => null, 'unit_type' => null],
                ['value_int' => 2021, 'value_string' => null, 'unit_type' => null],
                ['value_int' => 2017, 'value_string' => null, 'unit_type' => null],
                ['value_int' => 2016, 'value_string' => null, 'unit_type' => null],
                ['value_int' => 2015, 'value_string' => null, 'unit_type' => null],
                ['value_int' => 2014, 'value_string' => null, 'unit_type' => null],
                ['value_int' => 2013, 'value_string' => null, 'unit_type' => null],
                ['value_int' => 2011, 'value_string' => null, 'unit_type' => null],
                ['value_int' => 2010, 'value_string' => null, 'unit_type' => null],
                ['value_int' => 2009, 'value_string' => null, 'unit_type' => null],
                ['value_int' => 2008, 'value_string' => null, 'unit_type' => null],
            ],
            'Семейство процессоров' => [
                ['value_int' => null, 'value_string' => 'AMD Ryzen 3', 'unit_type' => null], 
                ['value_int' => null, 'value_string' => 'AMD Ryzen 5', 'unit_type' => null], 
                ['value_int' => null, 'value_string' => 'AMD Ryzen 7', 'unit_type' => null], 
                ['value_int' => null, 'value_string' => 'AMD Ryzen 9', 'unit_type' => null], 
                ['value_int' => null, 'value_string' => 'AMD FX', 'unit_type' => null], 
                ['value_int' => null, 'value_string' => 'AMD Athlon', 'unit_type' => null], 
                ['value_int' => null, 'value_string' => 'Intel Celeron', 'unit_type' => null], 
                ['value_int' => null, 'value_string' => 'Intel Pentium', 'unit_type' => null], 
                ['value_int' => null, 'value_string' => 'Intel Core i3', 'unit_type' => null], 
                ['value_int' => null, 'value_string' => 'Intel Core i5', 'unit_type' => null], 
                ['value_int' => null, 'value_string' => 'Intel Core i7', 'unit_type' => null], 
                ['value_int' => null, 'value_string' => 'Intel Core i9', 'unit_type' => null], 
            ],
            'Поколение процессоров' => [
                ['value_int' => null, 'value_string' => 'Intel 14-e поколение', 'unit_type' => null], 
                ['value_int' => null, 'value_string' => 'Intel 13-e поколение', 'unit_type' => null], 
                ['value_int' => null, 'value_string' => 'Intel 12-e поколение', 'unit_type' => null], 
                ['value_int' => null, 'value_string' => 'Intel 11-e поколение', 'unit_type' => null], 
                ['value_int' => null, 'value_string' => 'Intel 10-e поколение', 'unit_type' => null], 
                ['value_int' => null, 'value_string' => 'Intel 9-e поколение', 'unit_type' => null], 
                ['value_int' => null, 'value_string' => 'Intel 8-e поколение', 'unit_type' => null], 
                ['value_int' => null, 'value_string' => 'AMD FX', 'unit_type' => null], 
                ['value_int' => null, 'value_string' => 'AMD Ryzen 2000', 'unit_type' => null], 
                ['value_int' => null, 'value_string' => 'AMD Ryzen 3000', 'unit_type' => null], 
                ['value_int' => null, 'value_string' => 'AMD Ryzen 4000', 'unit_type' => null], 
                ['value_int' => null, 'value_string' => 'AMD Ryzen 5000', 'unit_type' => null], 
                ['value_int' => null, 'value_string' => 'AMD Ryzen 6000', 'unit_type' => null],
                ['value_int' => null, 'value_string' => 'AMD Ryzen 7000', 'unit_type' => null],
                ['value_int' => null, 'value_string' => 'AMD Ryzen 8000', 'unit_type' => null],
            ],
        ];

        foreach ($attributesValues  as $attributeName => $values) {

            $attributeId = ProductAttribute::firstOrCreate([
                'name' => $attributeName,
            ]);

            foreach ($values as $item) {
                AttributeValue::firstOrCreate([
                    'attribute_id' => $attributeId->id,
                    'value_string' => $item['value_string'],
                    'value_int' => $item['value_int'],
                    'unit_type' => $item['unit_type'],
                ]);
            }
        }
    }
}
