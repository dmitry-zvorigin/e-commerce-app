<?php

namespace Database\Seeders;

use App\Models\AttributeValue;
use App\Models\Category;
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
        // $characteristic = [
        //     427 => [
        //         'Заводские данные' => [
        //             [ 'attribute' => 'Гарантия продавца', 'value' => 12, 'unit_type' => 'мес.'],
        //             [ 'attribute' => 'Страна-производитель', 'value' => 'Китай'],
        //         ],
    
        //         'Общие параметры' => [
        //             [ 'attribute' => 'Модель', 'value' => 'AMD Ryzen Threadripper PRO 5995WX'],
        //             [ 'attribute' => 'Сокет ', 'value' => 'sWRX8'],
        //             [ 'attribute' => 'Код производителя', 'value' => '[100-000000444]'],
        //             [ 'attribute' => 'Год релиза', 'value' => 2022],
        //             [ 'attribute' => 'Система охлаждения в комплекте', 'value' => 'нет'],
        //             [ 'attribute' => 'Термоинтерфейс в комплекте', 'value' => 'нет'],
        //             [ 'attribute' => 'Производитель', 'value' => 'AMD'],
        //             [ 'attribute' => 'Семейство процессоров', 'value' => 'AMD Ryzen Threadripper'],
        //             [ 'attribute' => 'Для игрового компьютера', 'value' => 'нет'],
        //             [ 'attribute' => 'Поколение процессоров', 'value' => 'AMD Ryzen Threadripper PRO 5000'],
        //         ],
    
        //         'Ядро и архитектура' => [
        //             [ 'attribute' => 'Общее количество ядер', 'value' => 64],
        //             [ 'attribute' => 'Количество производительных ядер ', 'value' => 64],
        //             [ 'attribute' => 'Количество энергоэффективных ядер', 'value' => 'нет'],
        //             [ 'attribute' => 'Максимальное число потоков', 'value' => 128],
        //             [ 'attribute' => 'Объем кэша L2', 'value' => 32, 'unit_type' => 'МБ'],
        //             [ 'attribute' => 'Объем кэша L3', 'value' => 256, 'unit_type' => 'МБ'],
        //             [ 'attribute' => 'Техпроцесс', 'value' => 'TSMC 7FF'],
        //             [ 'attribute' => 'Ядро', 'value' => 'AMD Castle Peak'],
        //         ],
    
        //         'Частота и возможность разгона' => [
        //             [ 'attribute' => 'Базовая частота процессора', 'value' => 2.7, 'unit_type' => 'ГГц'],
        //             [ 'attribute' => 'Максимальная частота в турбо режиме', 'value' => 4.5, 'unit_type' => 'ГГц'],
        //             [ 'attribute' => 'Базовая частота энергоэффективных ядер', 'value' => 'нет'],
        //             [ 'attribute' => 'Частота в турбо режиме энергоэффективных ядер', 'value' => 'нет'],
        //             [ 'attribute' => 'Свободный множитель', 'value' => 'есть'],
        //         ],
    
        //         'Параметры оперативной памяти' => [
        //             [ 'attribute' => 'Тип памяти', 'value' => 'DDR4'],
        //             [ 'attribute' => 'Максимально поддерживаемый объем памяти', 'value' => 2048, 'unit_type' => 'ГБ'],
        //             [ 'attribute' => 'Количество каналов', 'value' => 8],
        //             [ 'attribute' => 'Частота оперативной памяти', 'value' => 'DDR4-3200'],
        //             [ 'attribute' => 'Поддержка режима ECC', 'value' => 'есть'],
        //         ],
    
        //         'Тепловые характеристики' => [
        //             [ 'attribute' => 'Тепловыделение (TDP)', 'value' => 280, 'unit_type' => 'Вт'],
        //             [ 'attribute' => 'Базовое тепловыделение', 'value' => 280, 'unit_type' => 'Вт'],
        //             [ 'attribute' => 'Максимальная температура процессора', 'value' => 95, 'unit_type' => '°C'],
        //         ],
    
        //         'Графическое ядро' => [
        //             [ 'attribute' => 'Интегрированное графическое ядро', 'value' => 'нет'],
        //         ],
                
        //         'Шина и контроллеры' => [
        //             [ 'attribute' => 'Встроенный контроллер PCI Express', 'value' => 'PCI-E 4.0'],
        //             [ 'attribute' => 'Число линий PCI Express', 'value' => '128 шт'],
        //         ],
    
        //         'Дополнительно' => [
        //             [ 'attribute' => 'Технология виртуализации', 'value' => 'есть'],
        //             [ 'attribute' => 'Особенности, дополнительно', 'value' => 'крепление для системы охлаждения в комплекте'],
        //         ],
        //     ],
        //     429 => [
        //         'Заводские данные' => [
        //             [ 'attribute' => 'Гарантия продавца', 'value' => 36, 'unit_type' => 'мес.'],
        //         ],

        //         'Общие параметры' => [
        //             [ 'attribute' => 'Тип', 'value' => 'видеокарта'],
        //             [ 'attribute' => 'Модель', 'value' => 'ASRock AMD Radeon RX 6800 XT Phantom Gaming OC'],
        //             [ 'attribute' => 'Код производителя', 'value' => '[RX6800XT PG 16GO]'],
        //             [ 'attribute' => 'Цвет', 'value' => 'черный'],
        //             [ 'attribute' => 'Предназначена для майнинга (добыча криптовалют) ', 'value' => 'нет'],
        //             [ 'attribute' => 'LHR', 'value' => 'нет'],

        //             [ 'attribute' => 'Год релиза', 'value' => 2022],
        //             [ 'attribute' => 'Производитель', 'value' => 'ASRock'],
        //             [ 'attribute' => 'Произоводитель графического процессора', 'value' => 'AMD'],
        //             [ 'attribute' => 'Назначение', 'value' => 'игровая видеокарта'],
        //         ],

        //         'Основные параметры' => [
        //             [ 'attribute' => 'Графический процессор', 'value' => 'Radeon RX 6800 XT'],
        //             [ 'attribute' => 'Микроархитектура', 'value' => 'AMD RDNA 2'],
        //             [ 'attribute' => 'Техпроцесс', 'value' => '7нм'],
        //         ],

        //         'Спецификации видеопроцессора' => [
        //             [ 'attribute' => 'Штатная частота работы видеочипа', 'value' => 1875, 'unit_type' => 'Мгц'],
        //             [ 'attribute' => 'Турбочастота', 'value' => 2310, 'unit_type' => 'Мгц'],
        //             [ 'attribute' => 'Количество универсальных процессоров (ALU)', 'value' => 4608],
        //             [ 'attribute' => 'Число текстурных блоков', 'value' => 288],
        //             [ 'attribute' => 'Число блоков растеризации', 'value' => 128],
        //             [ 'attribute' => 'Поддержка трассировки лучей', 'value' => 'есть'],
        //             [ 'attribute' => 'Аппаратное ускорение трассировки лучей (RT-ядра)', 'value' => 72],
        //             [ 'attribute' => 'Тензорные ядра', 'value' => 'нет'],
        //         ],

        //         'Спецификации видеопамяти' => [
        //             [ 'attribute' => 'Объем видеопамяти', 'value' => 16, 'unit_type' => 'ГБ'],
        //             [ 'attribute' => 'Тип памяти', 'value' => 'GDDR6'],
        //             [ 'attribute' => 'Разрядность шины памяти', 'value' => 256, 'unit_type' => 'бит'],
        //             [ 'attribute' => 'Максимальная пропускная способность памяти', 'value' => 512, 'unit_type' => 'Гбайт/сек'],
        //             [ 'attribute' => 'Эффективная частота памяти', 'value' => 16000, 'unit_type' => 'Мгц'],
        //         ],

        //         'Вывод изображения' => [
        //             [ 'attribute' => 'Тип и количество видеоразъемов', 'value' => '3 x DisplayPort, HDMI'],
        //             [ 'attribute' => 'Версия HDMI', 'value' => 2.1],
        //             [ 'attribute' => 'Версия DisplayPort', 'value' => 1.4],
        //             [ 'attribute' => 'Количество подключаемых одновременно мониторов', 'value' => 4],
        //             [ 'attribute' => 'Максимальное разрешение', 'value' => '7680x4320 (8K Ultra HD)'],
        //         ],

        //         'Подключение' => [
        //             [ 'attribute' => 'Интерфейс подключения', 'value' => 'PCI-E 4.0'],
        //             [ 'attribute' => 'Форм-фактор разъема подключения', 'value' => 'PCIe x16'],
        //             [ 'attribute' => 'Количество линий PCI Express', 'value' => 16],
        //             [ 'attribute' => 'Разъемы дополнительного питания', 'value' => '3 x 8 pin'],
        //             [ 'attribute' => 'Рекомендуемый блок питания', 'value' => 800, 'unit_type' => 'Вт'],
        //         ],
                 
        //         'Система охлаждения' => [
        //             [ 'attribute' => 'Тип охлаждения', 'value' => 'активное воздушное'],
        //             [ 'attribute' => 'Тип и количество установленных вентиляторов', 'value' => '3 осевых'],
        //             [ 'attribute' => 'Радиатор жидкостного охлаждения', 'value' => 'нет'],
        //         ],
                
        //         'Дополнительно' => [
        //             [ 'attribute' => 'Подсветка элементов видеокарты', 'value' => 'есть'],
        //             [ 'attribute' => 'Синхронизация RGB подсветки', 'value' => 'ASRock Polychrome'],
        //             [ 'attribute' => 'LCD дисплей', 'value' => 'нет'],
        //             [ 'attribute' => 'Переключатель BIOS', 'value' => 'нет'],
        //             [ 'attribute' => 'Особенности, дополнительно', 'value' => 'Infinity Cache - 128 Мб, выключатель подсветки'],
        //             [ 'attribute' => 'Комплектация', 'value' => 'документация'],
        //         ],
 
        //         'Габариты и вес' => [
        //             [ 'attribute' => 'Низкопрофильная карта (Low Profile)', 'value' => 'нет'],
        //             [ 'attribute' => 'Количество занимаемых слотов расширения', 'value' => 2.8],
        //             [ 'attribute' => 'Длина видеокарты', 'value' => 330, 'unit_type' => 'мм'],
        //             [ 'attribute' => 'Ширина видеокарты', 'value' => 140, 'unit_type' => 'мм'],
        //             [ 'attribute' => 'Толщина видеокарты', 'value' => 56, 'unit_type' => 'мм'],
        //             [ 'attribute' => 'Вес', 'value' => 1784, 'unit_type' => 'г'],
        //         ],
        //     ],
        // ];
        

        Product::factory()->count(100)->create(
            ['category_id' => 427]
        )->each(function ($product) {
            $this->createCharacteristicsProduct($product);
        });

        Product::factory()->count(100)->create(
            ['category_id' => 429]
        )->each(function ($product) {
            $this->createCharacteristicsProduct($product);
        });

    }

    public function createCharacteristicsProduct(Product $product)
    {
        // Находим категорию по ее ID
        $category = Category::find($product->category_id);

        // Если категория не найдена, можно добавить логику обработки

        // Получаем все продукты этой категории
        $products = Product::where('category_id', $category->id)->get();

        // Получаем все атрибуты, которые используются продуктами из этой категории
        $productAttributes = ProductAttribute::whereIn('id', function ($query) use ($products) {
            $query->select('attribute_id')
                ->from('product_characteristics')
                ->whereIn('product_id', $products->pluck('id'));
        })->get();

        // Для каждого атрибута получаем только те значения, которые используются в продуктах этой категории
        foreach ($productAttributes as $productAttribute) {

            // dump($productAttribute->id);

            // Получаем только те значения атрибута, которые используются в продуктах этой категории
            $attributeValues = AttributeValue::where('attribute_id', $productAttribute->id)
                ->whereIn('id', function ($query) use ($products, $productAttribute) {
                    $query->select('value_id')
                        ->from('product_characteristics')
                        ->where('attribute_id', $productAttribute->id)
                        ->whereIn('product_id', $products->pluck('id'));
                })
                ->pluck('id')->toArray();

            $randomValueId = Arr::random($attributeValues);

            // dump($attributeValues);
            $product->characteristics()->create([
                'product_id' => $product->id,
                'attribute_id' => $productAttribute->id,
                'value_id' => $randomValueId
            ]);
            // Теперь у вас есть только те значения этого атрибута, которые используются в продуктах этой категории
        }
    }
}
