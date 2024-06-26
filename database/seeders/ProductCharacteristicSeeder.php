<?php

namespace Database\Seeders;

use App\Models\AttributeGroup;
use App\Models\AttributeValue;
use App\Models\ProductAttribute;
use App\Models\ProductCharacteristic;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductCharacteristicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $product_characteristics = [
            1 => [
                'Заводские данные' => [
                    [ 'attribute' => 'Гарантия продавца', 'value' => 12, 'unit_type' => 'мес.', 'is_visible' => true, 'order' => 1,],
                    [ 'attribute' => 'Страна-производитель', 'value' => 'Вьетнам', 'is_visible' => true, 'order' => 2],
                ],

                'Общие параметры' => [
                    [ 'attribute' => 'Модель', 'value' => 'Intel Core i3-10105F', 'is_visible' => true, 'order' => 1],
                    [ 'attribute' => 'Сокет ', 'value' => 'LGA 1200', 'is_visible' => true, 'order' => 2],
                    [ 'attribute' => 'Код производителя', 'value' => '[CM8070104291323-SRH8V]', 'is_visible' => true, 'order' => 3],
                    [ 'attribute' => 'Год релиза', 'value' => 2020, 'is_visible' => true, 'order' => 4],
                    [ 'attribute' => 'Система охлаждения в комплекте', 'value' => 'нет', 'is_visible' => true, 'order' => 5],
                    [ 'attribute' => 'Термоинтерфейс в комплекте', 'value' => 'нет', 'is_visible' => true, 'order' => 6],
                    [ 'attribute' => 'Производитель', 'value' => 'Intel', 'is_visible' => false, 'order' => null],
                    [ 'attribute' => 'Семейство процессоров', 'value' => 'Intel Core i3', 'is_visible' => false, 'order' => null],
                    [ 'attribute' => 'Для игрового компьютера', 'value' => 'нет', 'is_visible' => false, 'order' => null],
                    [ 'attribute' => 'Поколение процессоров', 'value' => 'Intel 9-e поколение', 'is_visible' => false, 'order' => null],
                ],

                'Ядро и архитектура' => [
                    [ 'attribute' => 'Общее количество ядер', 'value' => 4, 'is_visible' => true, 'order' => 1],
                    [ 'attribute' => 'Количество производительных ядер ', 'value' => 4, 'is_visible' => true, 'order' => 2],
                    [ 'attribute' => 'Количество энергоэффективных ядер', 'value' => 'нет', 'is_visible' => true, 'order' => 3],
                    [ 'attribute' => 'Максимальное число потоков', 'value' => 8, 'is_visible' => true, 'order' => 4],
                    [ 'attribute' => 'Объем кэша L2', 'value' => 1, 'unit_type' => 'МБ', 'is_visible' => true, 'order' => 5],
                    [ 'attribute' => 'Объем кэша L3', 'value' => 6, 'unit_type' => 'МБ', 'is_visible' => true, 'order' => 6],
                    [ 'attribute' => 'Техпроцесс', 'value' => '14 нм', 'is_visible' => true, 'order' => 7],
                    [ 'attribute' => 'Ядро', 'value' => 'Intel Comet Lake-S', 'is_visible' => true, 'order' => 8],
                ],

                'Частота и возможность разгона' => [
                    [ 'attribute' => 'Базовая частота процессора', 'value' => 3.7, 'unit_type' => 'ГГц', 'is_visible' => true, 'order' => 1],
                    [ 'attribute' => 'Максимальная частота в турбо режиме', 'value' => 4.4, 'unit_type' => 'ГГц', 'is_visible' => true, 'order' => 2],
                    [ 'attribute' => 'Базовая частота энергоэффективных ядер', 'value' => 'нет', 'is_visible' => true, 'order' => 3],
                    [ 'attribute' => 'Частота в турбо режиме энергоэффективных ядер', 'value' => 'нет', 'is_visible' => true, 'order' => 4],
                    [ 'attribute' => 'Свободный множитель', 'value' => 'нет', 'is_visible' => true, 'order' => 5],
                ],

                'Параметры оперативной памяти' => [
                    [ 'attribute' => 'Тип памяти', 'value' => 'DDR4', 'is_visible' => true, 'order' => 1],
                    [ 'attribute' => 'Максимально поддерживаемый объем памяти', 'value' => 128, 'unit_type' => 'ГБ', 'is_visible' => true, 'order' => 2],
                    [ 'attribute' => 'Количество каналов', 'value' => 2, 'is_visible' => true, 'order' => 3],
                    [ 'attribute' => 'Частота оперативной памяти', 'value' => 'DDR4-2666', 'is_visible' => true, 'order' => 4],
                    [ 'attribute' => 'Поддержка режима ECC', 'value' => 'нет', 'is_visible' => true, 'order' => 5],
                ],

                'Тепловые характеристики' => [
                    [ 'attribute' => 'Тепловыделение (TDP)', 'value' => 65, 'unit_type' => 'Вт', 'is_visible' => true, 'order' => 1],
                    [ 'attribute' => 'Базовое тепловыделение', 'value' => 65, 'unit_type' => 'Вт', 'is_visible' => true, 'order' => 2],
                    [ 'attribute' => 'Максимальная температура процессора', 'value' => 100, 'unit_type' => '°C', 'is_visible' => true, 'order' => 3],
                ],

                'Графическое ядро' => [
                    [ 'attribute' => 'Интегрированное графическое ядро', 'value' => 'нет', 'is_visible' => true, 'order' => 1],
                ],
                
                'Шина и контроллеры' => [
                    [ 'attribute' => 'Встроенный контроллер PCI Express', 'value' => 'PCI-E 3.0', 'is_visible' => true, 'order' => 1],
                    [ 'attribute' => 'Число линий PCI Express', 'value' => '16 шт', 'is_visible' => true, 'order' => 2],
                ],

                'Дополнительно' => [
                    [ 'attribute' => 'Технология виртуализации', 'value' => 'есть', 'is_visible' => true, 'order' => 1],
                    [ 'attribute' => 'Особенности, дополнительно', 'value' => 'поддержка Intel Optane', 'is_visible' => true, 'order' => 2],
                ],

            ],
            2 => [
                'Заводские данные' => [
                    [ 'attribute' => 'Гарантия продавца', 'value' => 36, 'unit_type' => 'мес.'],
                    [ 'attribute' => 'Страна-производитель', 'value' => 'Вьетнам'],
                ],

                'Общие параметры' => [
                    [ 'attribute' => 'Модель', 'value' => 'Intel Pentium Gold G6400'],
                    [ 'attribute' => 'Сокет ', 'value' => 'LGA 1200'],
                    [ 'attribute' => 'Код производителя', 'value' => '[BX80701G6400]'],
                    [ 'attribute' => 'Год релиза', 'value' => 2020],
                    [ 'attribute' => 'Система охлаждения в комплекте', 'value' => 'есть'],
                    [ 'attribute' => 'Термоинтерфейс в комплекте', 'value' => 'нанесен на основание радиатора'],
                    [ 'attribute' => 'Производитель', 'value' => 'Intel'],
                    [ 'attribute' => 'Семейство процессоров', 'value' => 'Intel Pentium'],
                    [ 'attribute' => 'Для игрового компьютера', 'value' => 'нет'],
                    [ 'attribute' => 'Поколение процессоров', 'value' => 'Intel 11-e поколение'],
                ],

                'Ядро и архитектура' => [
                    [ 'attribute' => 'Общее количество ядер', 'value' => 2],
                    [ 'attribute' => 'Количество производительных ядер ', 'value' => 2],
                    [ 'attribute' => 'Количество энергоэффективных ядер', 'value' => 'нет'],
                    [ 'attribute' => 'Максимальное число потоков', 'value' => 4],
                    [ 'attribute' => 'Объем кэша L2', 'value' => 0.5, 'unit_type' => 'МБ'],
                    [ 'attribute' => 'Объем кэша L3', 'value' => 4, 'unit_type' => 'МБ'],
                    [ 'attribute' => 'Техпроцесс', 'value' => '14 нм'],
                    [ 'attribute' => 'Ядро', 'value' => 'Intel Comet Lake-S'],
                ],

                'Частота и возможность разгона' => [
                    [ 'attribute' => 'Базовая частота процессора', 'value' => 4, 'unit_type' => 'ГГц'],
                    [ 'attribute' => 'Максимальная частота в турбо режиме', 'value' => 'нет'],
                    [ 'attribute' => 'Базовая частота энергоэффективных ядер', 'value' => 'нет'],
                    [ 'attribute' => 'Частота в турбо режиме энергоэффективных ядер', 'value' => 'нет'],
                    [ 'attribute' => 'Свободный множитель', 'value' => 'нет'],
                ],

                'Параметры оперативной памяти' => [
                    [ 'attribute' => 'Тип памяти', 'value' => 'DDR4'],
                    [ 'attribute' => 'Максимально поддерживаемый объем памяти', 'value' => 128, 'unit_type' => 'ГБ'],
                    [ 'attribute' => 'Количество каналов', 'value' => 2],
                    [ 'attribute' => 'Частота оперативной памяти', 'value' => 'DDR4-2666'],
                    [ 'attribute' => 'Поддержка режима ECC', 'value' => 'нет'],
                ],

                'Тепловые характеристики' => [
                    [ 'attribute' => 'Тепловыделение (TDP)', 'value' => 58, 'unit_type' => 'Вт'],
                    [ 'attribute' => 'Базовое тепловыделение', 'value' => 58, 'unit_type' => 'Вт'],
                    [ 'attribute' => 'Максимальная температура процессора', 'value' => 100, 'unit_type' => '°C'],
                ],

                'Графическое ядро' => [
                    [ 'attribute' => 'Интегрированное графическое ядро', 'value' => 'есть'],
                    [ 'attribute' => 'Модель графического процессора', 'value' => 'Intel UHD Graphics 610'],
                    [ 'attribute' => 'Максимальная частота графического ядра', 'value' => 1050, 'unit_type' => 'МГц'],
                    [ 'attribute' => 'Исполнительные блоки', 'value' => 12],
                    [ 'attribute' => 'Потоковые процессоры (Shading Units)', 'value' => 96],
                ],

                'Шина и контроллеры' => [
                    [ 'attribute' => 'Встроенный контроллер PCI Express', 'value' => 'PCI-E 3.0'],
                    [ 'attribute' => 'Число линий PCI Express', 'value' => '16 шт'],
                ],

                'Дополнительно' => [
                    [ 'attribute' => 'Технология виртуализации', 'value' => 'есть'],
                    [ 'attribute' => 'Особенности, дополнительно', 'value' => 'поддержка Intel Optane'],
                ],

            ],
            3 => [
                'Заводские данные' => [
                    [ 'attribute' => 'Гарантия продавца', 'value' => 36, 'unit_type' => 'мес.'],
                    [ 'attribute' => 'Страна-производитель', 'value' => 'Малайзия'],
                ],

                'Общие параметры' => [
                    [ 'attribute' => 'Модель', 'value' => 'AMD FX-4300'],
                    [ 'attribute' => 'Сокет ', 'value' => 'AM3+'],
                    [ 'attribute' => 'Код производителя', 'value' => '[FD4300WMW4MHK]'],
                    [ 'attribute' => 'Год релиза', 'value' => 2012],
                    [ 'attribute' => 'Система охлаждения в комплекте', 'value' => 'есть'],
                    [ 'attribute' => 'Термоинтерфейс в комплекте', 'value' => 'нанесен на основание радиатора'],
                    [ 'attribute' => 'Производитель', 'value' => 'AMD'],
                    [ 'attribute' => 'Семейство процессоров', 'value' => 'AMD FX'],
                    [ 'attribute' => 'Для игрового компьютера', 'value' => 'нет'],
                    [ 'attribute' => 'Поколение процессоров', 'value' => 'AMD FX'],
                ],

                'Ядро и архитектура' => [
                    [ 'attribute' => 'Общее количество ядер', 'value' => 4],
                    [ 'attribute' => 'Количество производительных ядер ', 'value' => 4],
                    [ 'attribute' => 'Количество энергоэффективных ядер', 'value' => 'нет'],
                    [ 'attribute' => 'Максимальное число потоков', 'value' => 4],
                    [ 'attribute' => 'Объем кэша L2', 'value' => 4, 'unit_type' => 'МБ'],
                    [ 'attribute' => 'Объем кэша L3', 'value' => 4, 'unit_type' => 'МБ'],
                    [ 'attribute' => 'Техпроцесс', 'value' => '32 нм'],
                    [ 'attribute' => 'Ядро', 'value' => 'AMD Vishera'],
                ],

                'Частота и возможность разгона' => [
                    [ 'attribute' => 'Базовая частота процессора', 'value' => 3.8, 'unit_type' => 'ГГц'],
                    [ 'attribute' => 'Максимальная частота в турбо режиме', 'value' => 4, 'unit_type' => 'ГГц'],
                    [ 'attribute' => 'Базовая частота энергоэффективных ядер', 'value' => 'нет'],
                    [ 'attribute' => 'Частота в турбо режиме энергоэффективных ядер', 'value' => 'нет'],
                    [ 'attribute' => 'Свободный множитель', 'value' => 'есть'],
                ],

                'Параметры оперативной памяти' => [
                    [ 'attribute' => 'Тип памяти', 'value' => 'DDR3'],
                    [ 'attribute' => 'Максимально поддерживаемый объем памяти', 'value' => 128, 'unit_type' => 'ГБ'],
                    [ 'attribute' => 'Количество каналов', 'value' => 2],
                    [ 'attribute' => 'Частота оперативной памяти', 'value' => 'DDR3-1866'],
                    [ 'attribute' => 'Поддержка режима ECC', 'value' => 'нет'],
                ],

                'Тепловые характеристики' => [
                    [ 'attribute' => 'Тепловыделение (TDP)', 'value' => 95, 'unit_type' => 'Вт'],
                    [ 'attribute' => 'Базовое тепловыделение', 'value' => 95, 'unit_type' => 'Вт'],
                    [ 'attribute' => 'Максимальная температура процессора', 'value' => 70.5, 'unit_type' => '°C'],
                ],

                'Графическое ядро' => [
                    [ 'attribute' => 'Интегрированное графическое ядро', 'value' => 'нет'],
                ],
                
                'Шина и контроллеры' => [
                    [ 'attribute' => 'Встроенный контроллер PCI Express', 'value' => 'нет'],
                    [ 'attribute' => 'Число линий PCI Express', 'value' => 'нет'],
                ],

                'Дополнительно' => [
                    [ 'attribute' => 'Технология виртуализации', 'value' => 'есть'],
                ],
                
            ],
            4 => [
                'Заводские данные' => [
                    [ 'attribute' => 'Гарантия продавца', 'value' => 12, 'unit_type' => 'мес.'],
                    [ 'attribute' => 'Страна-производитель', 'value' => 'Малайзия'],
                ],

                'Общие параметры' => [
                    [ 'attribute' => 'Модель', 'value' => 'AMD Ryzen 5 3600'],
                    [ 'attribute' => 'Сокет ', 'value' => 'AM4'],
                    [ 'attribute' => 'Код производителя', 'value' => '[100-000000031]'],
                    [ 'attribute' => 'Год релиза', 'value' => 2019],
                    [ 'attribute' => 'Система охлаждения в комплекте', 'value' => 'нет'],
                    [ 'attribute' => 'Термоинтерфейс в комплекте', 'value' => 'нет'],
                    [ 'attribute' => 'Производитель', 'value' => 'AMD'],
                    [ 'attribute' => 'Семейство процессоров', 'value' => 'AMD Ryzen 5'],
                    [ 'attribute' => 'Для игрового компьютера', 'value' => 'да'],
                    [ 'attribute' => 'Поколение процессоров', 'value' => 'AMD Ryzen 3000'],
                ],

                'Ядро и архитектура' => [
                    [ 'attribute' => 'Общее количество ядер', 'value' => 6],
                    [ 'attribute' => 'Количество производительных ядер ', 'value' => 6],
                    [ 'attribute' => 'Количество энергоэффективных ядер', 'value' => 'нет'],
                    [ 'attribute' => 'Максимальное число потоков', 'value' => 12],
                    [ 'attribute' => 'Объем кэша L2', 'value' => 3, 'unit_type' => 'МБ'],
                    [ 'attribute' => 'Объем кэша L3', 'value' => 32, 'unit_type' => 'МБ'],
                    [ 'attribute' => 'Техпроцесс', 'value' => 'TSMC 7FF'],
                    [ 'attribute' => 'Ядро', 'value' => 'AMD Matisse'],
                ],

                'Частота и возможность разгона' => [
                    [ 'attribute' => 'Базовая частота процессора', 'value' => 3.6, 'unit_type' => 'ГГц'],
                    [ 'attribute' => 'Максимальная частота в турбо режиме', 'value' => 4.2, 'unit_type' => 'ГГц'],
                    [ 'attribute' => 'Базовая частота энергоэффективных ядер', 'value' => 'нет'],
                    [ 'attribute' => 'Частота в турбо режиме энергоэффективных ядер', 'value' => 'нет'],
                    [ 'attribute' => 'Свободный множитель', 'value' => 'есть'],
                ],

                'Параметры оперативной памяти' => [
                    [ 'attribute' => 'Тип памяти', 'value' => 'DDR4'],
                    [ 'attribute' => 'Максимально поддерживаемый объем памяти', 'value' => 128, 'unit_type' => 'ГБ'],
                    [ 'attribute' => 'Количество каналов', 'value' => 2],
                    [ 'attribute' => 'Частота оперативной памяти', 'value' => 'DDR4-3200'],
                    [ 'attribute' => 'Поддержка режима ECC', 'value' => 'есть'],
                ],

                'Тепловые характеристики' => [
                    [ 'attribute' => 'Тепловыделение (TDP)', 'value' => 65, 'unit_type' => 'Вт'],
                    [ 'attribute' => 'Базовое тепловыделение', 'value' => 65, 'unit_type' => 'Вт'],
                    [ 'attribute' => 'Максимальная температура процессора', 'value' => 95, 'unit_type' => '°C'],
                ],

                'Графическое ядро' => [
                    [ 'attribute' => 'Интегрированное графическое ядро', 'value' => 'нет'],
                ],
                
                'Шина и контроллеры' => [
                    [ 'attribute' => 'Встроенный контроллер PCI Express', 'value' => 'PCI-E 4.0'],
                    [ 'attribute' => 'Число линий PCI Express', 'value' => '20 шт'],
                ],

                'Дополнительно' => [
                    [ 'attribute' => 'Технология виртуализации', 'value' => 'есть'],
                ],
                
            ],
            5 => [
                'Заводские данные' => [
                    [ 'attribute' => 'Гарантия продавца', 'value' => 12, 'unit_type' => 'мес.'],
                    [ 'attribute' => 'Страна-производитель', 'value' => 'Вьетнам'],
                ],

                'Общие параметры' => [
                    [ 'attribute' => 'Модель', 'value' => 'Intel Pentium Gold G5400'],
                    [ 'attribute' => 'Сокет ', 'value' => 'LGA 1151-v2'],
                    [ 'attribute' => 'Код производителя', 'value' => '[CM8068403360112]'],
                    [ 'attribute' => 'Год релиза', 'value' => 2018],
                    [ 'attribute' => 'Система охлаждения в комплекте', 'value' => 'нет'],
                    [ 'attribute' => 'Производитель', 'value' => 'Intel'],
                    [ 'attribute' => 'Семейство процессоров', 'value' => 'Intel Pentium'],
                    [ 'attribute' => 'Для игрового компьютера', 'value' => 'нет'],
                    [ 'attribute' => 'Поколение процессоров', 'value' => 'Intel 8-e поколение'],
                ],

                'Ядро и архитектура' => [
                    [ 'attribute' => 'Термоинтерфейс в комплекте', 'value' => 'нет'],
                    [ 'attribute' => 'Общее количество ядер', 'value' => 2],
                    [ 'attribute' => 'Количество производительных ядер ', 'value' => 2],
                    [ 'attribute' => 'Количество энергоэффективных ядер', 'value' => 'нет'],
                    [ 'attribute' => 'Максимальное число потоков', 'value' => 4],
                    [ 'attribute' => 'Объем кэша L2', 'value' => 0.5, 'unit_type' => 'МБ'],
                    [ 'attribute' => 'Объем кэша L3', 'value' => 4, 'unit_type' => 'МБ'],
                    [ 'attribute' => 'Техпроцесс', 'value' => '14 hm'],
                    [ 'attribute' => 'Ядро', 'value' => 'Intel Coffee Lake S'],
                ],

                'Частота и возможность разгона' => [
                    [ 'attribute' => 'Базовая частота процессора', 'value' => 3.7, 'unit_type' => 'ГГц'],
                    [ 'attribute' => 'Максимальная частота в турбо режиме', 'value' => 'нет'],
                    [ 'attribute' => 'Базовая частота энергоэффективных ядер', 'value' => 'нет'],
                    [ 'attribute' => 'Частота в турбо режиме энергоэффективных ядер', 'value' => 'нет'],
                    [ 'attribute' => 'Свободный множитель', 'value' => 'нет'],
                ],

                'Параметры оперативной памяти' => [
                    [ 'attribute' => 'Тип памяти', 'value' => 'DDR4'],
                    [ 'attribute' => 'Максимально поддерживаемый объем памяти', 'value' => 64, 'unit_type' => 'ГБ'],
                    [ 'attribute' => 'Количество каналов', 'value' => 2],
                    [ 'attribute' => 'Частота оперативной памяти', 'value' => 'DDR4-2400'],
                    [ 'attribute' => 'Поддержка режима ECC', 'value' => 'есть'],
                ],

                'Тепловые характеристики' => [
                    [ 'attribute' => 'Тепловыделение (TDP)', 'value' => 58, 'unit_type' => 'Вт'],
                    [ 'attribute' => 'Базовое тепловыделение', 'value' => 58, 'unit_type' => 'Вт'],
                    [ 'attribute' => 'Максимальная температура процессора', 'value' => 100, 'unit_type' => '°C'],
                ],

                'Графическое ядро' => [
                    [ 'attribute' => 'Интегрированное графическое ядро', 'value' => 'есть'],
                    [ 'attribute' => 'Модель графического процессора ', 'value' => 'Intel UHD Graphics 610'],
                    [ 'attribute' => 'Максимальная частота графического ядра', 'value' => 1050, 'unit_type' => 'МГц'],
                    [ 'attribute' => 'Исполнительные блоки', 'value' => 12],
                    [ 'attribute' => 'Потоковые процессоры (Shading Units)', 'value' => 96],
                ],

                'Шина и контроллеры' => [
                    [ 'attribute' => 'Встроенный контроллер PCI Express', 'value' => 'PCI-E 3.0'],
                    [ 'attribute' => 'Число линий PCI Express', 'value' => '16 шт'],
                ],

                'Дополнительно' => [
                    [ 'attribute' => 'Технология виртуализации', 'value' => 'есть'],
                    [ 'attribute' => 'Особенности, дополнительно', 'value' => 'поддержка Intel Optane'],
                ],

            ],
            6 => [
                'Заводские данные' => [
                    [ 'attribute' => 'Гарантия продавца', 'value' => 12, 'unit_type' => 'мес.'],
                    [ 'attribute' => 'Страна-производитель', 'value' => 'Вьетнам'],
                ],

                'Общие параметры' => [
                    [ 'attribute' => 'Модель', 'value' => 'Intel Core i7-13790F'],
                    [ 'attribute' => 'Сокет ', 'value' => 'LGA 1700'],
                    [ 'attribute' => 'Код производителя', 'value' => '[BXC8071513790F]'],
                    [ 'attribute' => 'Год релиза', 'value' => 2023],
                    [ 'attribute' => 'Система охлаждения в комплекте', 'value' => 'нет'],
                    [ 'attribute' => 'Производитель', 'value' => 'Intel'],
                    [ 'attribute' => 'Семейство процессоров', 'value' => 'Intel Core i7'],
                    [ 'attribute' => 'Для игрового компьютера', 'value' => 'да'],
                    [ 'attribute' => 'Поколение процессоров', 'value' => 'Intel 13-e поколение'],
                ],

                'Ядро и архитектура' => [
                    [ 'attribute' => 'Термоинтерфейс в комплекте', 'value' => 'нет'],
                    [ 'attribute' => 'Общее количество ядер', 'value' => 16],
                    [ 'attribute' => 'Количество производительных ядер ', 'value' => 8],
                    [ 'attribute' => 'Количество энергоэффективных ядер', 'value' => 8],
                    [ 'attribute' => 'Максимальное число потоков', 'value' => 24],
                    [ 'attribute' => 'Объем кэша L2', 'value' => 24, 'unit_type' => 'МБ'],
                    [ 'attribute' => 'Объем кэша L3', 'value' => 33, 'unit_type' => 'МБ'],
                    [ 'attribute' => 'Техпроцесс', 'value' => 'Intel 7'],
                    [ 'attribute' => 'Ядро', 'value' => 'Intel Raptor Lake-S'],
                ],

                'Частота и возможность разгона' => [
                    [ 'attribute' => 'Базовая частота процессора', 'value' => 2.1, 'unit_type' => 'ГГц'],
                    [ 'attribute' => 'Максимальная частота в турбо режиме', 'value' => 5.2, 'unit_type' => 'ГГц'],
                    [ 'attribute' => 'Базовая частота энергоэффективных ядер', 'value' => 1.5, 'unit_type' => 'ГГц'],
                    [ 'attribute' => 'Частота в турбо режиме энергоэффективных ядер', 'value' => 4.1, 'unit_type' => 'ГГц'],
                    [ 'attribute' => 'Свободный множитель', 'value' => 'нет'],
                ],

                'Параметры оперативной памяти' => [
                    [ 'attribute' => 'Тип памяти', 'value' => 'DDR5'],
                    [ 'attribute' => 'Тип памяти', 'value' => 'DDR4'],
                    [ 'attribute' => 'Максимально поддерживаемый объем памяти', 'value' => 128, 'unit_type' => 'ГБ'],
                    [ 'attribute' => 'Количество каналов', 'value' => 2],
                    [ 'attribute' => 'Частота оперативной памяти', 'value' => 'DDR4-3200'],
                    [ 'attribute' => 'Частота оперативной памяти', 'value' => 'DDR5-5600'],
                    [ 'attribute' => 'Поддержка режима ECC', 'value' => 'нет'],
                ],

                'Тепловые характеристики' => [
                    [ 'attribute' => 'Тепловыделение (TDP)', 'value' => 219, 'unit_type' => 'Вт'],
                    [ 'attribute' => 'Базовое тепловыделение', 'value' => 65, 'unit_type' => 'Вт'],
                    [ 'attribute' => 'Максимальная температура процессора', 'value' => 100, 'unit_type' => '°C'],
                ],

                'Графическое ядро' => [
                    [ 'attribute' => 'Интегрированное графическое ядро', 'value' => 'нет'],
                ],

                'Шина и контроллеры' => [
                    [ 'attribute' => 'Встроенный контроллер PCI Express', 'value' => 'PCI-E 5.0'],
                    [ 'attribute' => 'Число линий PCI Express', 'value' => '20 шт'],
                ],

                'Дополнительно' => [
                    [ 'attribute' => 'Технология виртуализации', 'value' => 'есть'],
                    [ 'attribute' => 'Особенности, дополнительно', 'value' => 'технология Intel GNA'],
                ],

            ],
            7 => [
                'Заводские данные' => [
                    [ 'attribute' => 'Гарантия продавца', 'value' => 12, 'unit_type' => 'мес.'],
                    [ 'attribute' => 'Страна-производитель', 'value' => 'Малайзия'],
                ],

                'Общие параметры' => [
                    [ 'attribute' => 'Модель', 'value' => 'AMD Ryzen 9 7950X'],
                    [ 'attribute' => 'Сокет ', 'value' => 'AM5'],
                    [ 'attribute' => 'Код производителя', 'value' => '[100-000000514]'],
                    [ 'attribute' => 'Год релиза', 'value' => 2022],
                    [ 'attribute' => 'Система охлаждения в комплекте', 'value' => 'нет'],
                    [ 'attribute' => 'Термоинтерфейс в комплекте', 'value' => 'нет'],
                    [ 'attribute' => 'Производитель', 'value' => 'AMD'],
                    [ 'attribute' => 'Семейство процессоров', 'value' => 'AMD Ryzen 9'],
                    [ 'attribute' => 'Для игрового компьютера', 'value' => 'да'],
                    [ 'attribute' => 'Поколение процессоров', 'value' => 'AMD Ryzen 7000'],
                ],

                'Ядро и архитектура' => [
                    [ 'attribute' => 'Общее количество ядер', 'value' => 16],
                    [ 'attribute' => 'Количество производительных ядер ', 'value' => 16],
                    [ 'attribute' => 'Количество энергоэффективных ядер', 'value' => 'нет'],
                    [ 'attribute' => 'Максимальное число потоков', 'value' => 32],
                    [ 'attribute' => 'Объем кэша L2', 'value' => 16, 'unit_type' => 'МБ'],
                    [ 'attribute' => 'Объем кэша L3', 'value' => 64, 'unit_type' => 'МБ'],
                    [ 'attribute' => 'Техпроцесс', 'value' => 'TSMC 5nm FinFET'],
                    [ 'attribute' => 'Ядро', 'value' => 'AMD Raphael'],
                ],

                'Частота и возможность разгона' => [
                    [ 'attribute' => 'Базовая частота процессора', 'value' => 4.5, 'unit_type' => 'ГГц'],
                    [ 'attribute' => 'Максимальная частота в турбо режиме', 'value' => 5.7, 'unit_type' => 'ГГц'],
                    [ 'attribute' => 'Базовая частота энергоэффективных ядер', 'value' => 'нет'],
                    [ 'attribute' => 'Частота в турбо режиме энергоэффективных ядер', 'value' => 'нет'],
                    [ 'attribute' => 'Свободный множитель', 'value' => 'есть'],
                ],

                'Параметры оперативной памяти' => [
                    [ 'attribute' => 'Тип памяти', 'value' => 'DDR5'],
                    [ 'attribute' => 'Максимально поддерживаемый объем памяти', 'value' => 128, 'unit_type' => 'ГБ'],
                    [ 'attribute' => 'Количество каналов', 'value' => 2],
                    [ 'attribute' => 'Частота оперативной памяти', 'value' => 'DDR5-5200'],
                    [ 'attribute' => 'Поддержка режима ECC', 'value' => 'есть'],
                ],

                'Тепловые характеристики' => [
                    [ 'attribute' => 'Тепловыделение (TDP)', 'value' => 170, 'unit_type' => 'Вт'],
                    [ 'attribute' => 'Базовое тепловыделение', 'value' => 170, 'unit_type' => 'Вт'],
                    [ 'attribute' => 'Максимальная температура процессора', 'value' => 95, 'unit_type' => '°C'],
                ],

                'Графическое ядро' => [
                    [ 'attribute' => 'Интегрированное графическое ядро', 'value' => 'есть'],
                    [ 'attribute' => 'Модель графического процессора', 'value' => 'AMD Radeon Graphics'],
                    [ 'attribute' => 'Максимальная частота графического ядра', 'value' => 2200, 'unit_type' => 'МГц'],
                ],

                'Шина и контроллеры' => [
                    [ 'attribute' => 'Встроенный контроллер PCI Express', 'value' => 'PCI-E 5.0'],
                    [ 'attribute' => 'Число линий PCI Express', 'value' => '24 шт'],
                ],

                'Дополнительно' => [
                    [ 'attribute' => 'Технология виртуализации', 'value' => 'есть'],
                    [ 'attribute' => 'Особенности, дополнительно', 'value' => 'поддержка AMD EXPO'],
                ],

            ],
            8 => [
                'Заводские данные' => [
                    [ 'attribute' => 'Гарантия продавца', 'value' => 12, 'unit_type' => 'мес.'],
                    [ 'attribute' => 'Страна-производитель', 'value' => 'Китай'],
                ],

                'Общие параметры' => [
                    [ 'attribute' => 'Модель', 'value' => 'AMD Ryzen 9 7900X'],
                    [ 'attribute' => 'Сокет ', 'value' => 'AM5'],
                    [ 'attribute' => 'Код производителя', 'value' => '[100-100000589WOF]'],
                    [ 'attribute' => 'Год релиза', 'value' => 2022],
                    [ 'attribute' => 'Система охлаждения в комплекте', 'value' => 'нет'],
                    [ 'attribute' => 'Термоинтерфейс в комплекте', 'value' => 'нет'],
                    [ 'attribute' => 'Производитель', 'value' => 'AMD'],
                    [ 'attribute' => 'Семейство процессоров', 'value' => 'AMD Ryzen 7'],
                    [ 'attribute' => 'Для игрового компьютера', 'value' => 'да'],
                    [ 'attribute' => 'Поколение процессоров', 'value' => 'AMD Ryzen 6000'],
                ],

                'Ядро и архитектура' => [
                    [ 'attribute' => 'Общее количество ядер', 'value' => 12],
                    [ 'attribute' => 'Количество производительных ядер ', 'value' => 12],
                    [ 'attribute' => 'Количество энергоэффективных ядер', 'value' => 'нет'],
                    [ 'attribute' => 'Максимальное число потоков', 'value' => 24],
                    [ 'attribute' => 'Объем кэша L2', 'value' => 12, 'unit_type' => 'МБ'],
                    [ 'attribute' => 'Объем кэша L3', 'value' => 64, 'unit_type' => 'МБ'],
                    [ 'attribute' => 'Техпроцесс', 'value' => 'TSMC 5nm FinFET'],
                    [ 'attribute' => 'Ядро', 'value' => 'AMD Raphael'],
                ],

                'Частота и возможность разгона' => [
                    [ 'attribute' => 'Базовая частота процессора', 'value' => 4.7, 'unit_type' => 'ГГц'],
                    [ 'attribute' => 'Максимальная частота в турбо режиме', 'value' => 5.6, 'unit_type' => 'ГГц'],
                    [ 'attribute' => 'Базовая частота энергоэффективных ядер', 'value' => 'нет'],
                    [ 'attribute' => 'Частота в турбо режиме энергоэффективных ядер', 'value' => 'нет'],
                    [ 'attribute' => 'Свободный множитель', 'value' => 'есть'],
                ],

                'Параметры оперативной памяти' => [
                    [ 'attribute' => 'Тип памяти', 'value' => 'DDR5'],
                    [ 'attribute' => 'Максимально поддерживаемый объем памяти', 'value' => 128, 'unit_type' => 'ГБ'],
                    [ 'attribute' => 'Количество каналов', 'value' => 2],
                    [ 'attribute' => 'Частота оперативной памяти', 'value' => 'DDR5-5200'],
                    [ 'attribute' => 'Поддержка режима ECC', 'value' => 'есть'],
                ],

                'Тепловые характеристики' => [
                    [ 'attribute' => 'Тепловыделение (TDP)', 'value' => 170, 'unit_type' => 'Вт'],
                    [ 'attribute' => 'Базовое тепловыделение', 'value' => 170, 'unit_type' => 'Вт'],
                    [ 'attribute' => 'Максимальная температура процессора', 'value' => 95, 'unit_type' => '°C'],
                ],

                'Графическое ядро' => [
                    [ 'attribute' => 'Интегрированное графическое ядро', 'value' => 'есть'],
                    [ 'attribute' => 'Модель графического процессора', 'value' => 'AMD Radeon Graphics'],
                    [ 'attribute' => 'Максимальная частота графического ядра', 'value' => 2200, 'unit_type' => 'МГц'],
                    [ 'attribute' => 'Исполнительные блоки', 'value' => 2],
                    [ 'attribute' => 'Потоковые процессоры (Shading Units)', 'value' => 128],
                ],

                'Шина и контроллеры' => [
                    [ 'attribute' => 'Встроенный контроллер PCI Express', 'value' => 'PCI-E 5.0'],
                    [ 'attribute' => 'Число линий PCI Express', 'value' => '24 шт'],
                ],

                'Дополнительно' => [
                    [ 'attribute' => 'Технология виртуализации', 'value' => 'есть'],
                    [ 'attribute' => 'Особенности, дополнительно', 'value' => 'поддержка AMD EXPO'],
                ],

            ],
            9 => [
                'Заводские данные' => [
                    [ 'attribute' => 'Гарантия продавца', 'value' => 12, 'unit_type' => 'мес.'],
                    [ 'attribute' => 'Страна-производитель', 'value' => 'Малайзия'],
                ],

                'Общие параметры' => [
                    [ 'attribute' => 'Модель', 'value' => 'Intel Core i9-10920X'],
                    [ 'attribute' => 'Сокет ', 'value' => 'LGA 2066'],
                    [ 'attribute' => 'Код производителя', 'value' => '[CD8069504382000-SRGSJ]'],
                    [ 'attribute' => 'Год релиза', 'value' => 2019],
                    [ 'attribute' => 'Система охлаждения в комплекте', 'value' => 'нет'],
                    [ 'attribute' => 'Термоинтерфейс в комплекте', 'value' => 'нет'],
                    [ 'attribute' => 'Производитель', 'value' => 'Intel'],
                    [ 'attribute' => 'Семейство процессоров', 'value' => 'Intel Core i9'],
                    [ 'attribute' => 'Для игрового компьютера', 'value' => 'нет'],
                    [ 'attribute' => 'Поколение процессоров', 'value' => 'Intel 10-e поколение'],
                ],

                'Ядро и архитектура' => [
                    [ 'attribute' => 'Общее количество ядер', 'value' => 12],
                    [ 'attribute' => 'Количество производительных ядер ', 'value' => 12],
                    [ 'attribute' => 'Количество энергоэффективных ядер', 'value' => 'нет'],
                    [ 'attribute' => 'Максимальное число потоков', 'value' => 24],
                    [ 'attribute' => 'Объем кэша L2', 'value' => 12, 'unit_type' => 'МБ'],
                    [ 'attribute' => 'Объем кэша L3', 'value' => 19.25, 'unit_type' => 'МБ'],
                    [ 'attribute' => 'Техпроцесс', 'value' => '14 нм'],
                    [ 'attribute' => 'Ядро', 'value' => 'Intel Cascade Lake-X'],
                ],

                'Частота и возможность разгона' => [
                    [ 'attribute' => 'Базовая частота процессора', 'value' => 3.5, 'unit_type' => 'ГГц'],
                    [ 'attribute' => 'Максимальная частота в турбо режиме', 'value' => 4.8, 'unit_type' => 'ГГц'],
                    [ 'attribute' => 'Базовая частота энергоэффективных ядер', 'value' => 'нет'],
                    [ 'attribute' => 'Частота в турбо режиме энергоэффективных ядер', 'value' => 'нет'],
                    [ 'attribute' => 'Свободный множитель', 'value' => 'есть'],
                ],

                'Параметры оперативной памяти' => [
                    [ 'attribute' => 'Тип памяти', 'value' => 'DDR4'],
                    [ 'attribute' => 'Максимально поддерживаемый объем памяти', 'value' => 256, 'unit_type' => 'ГБ'],
                    [ 'attribute' => 'Количество каналов', 'value' => 4],
                    [ 'attribute' => 'Частота оперативной памяти', 'value' => 'DDR4-2933'],
                    [ 'attribute' => 'Поддержка режима ECC', 'value' => 'нет'],
                ],

                'Тепловые характеристики' => [
                    [ 'attribute' => 'Тепловыделение (TDP)', 'value' => 165, 'unit_type' => 'Вт'],
                    [ 'attribute' => 'Базовое тепловыделение', 'value' => 165, 'unit_type' => 'Вт'],
                    [ 'attribute' => 'Максимальная температура процессора', 'value' => 94, 'unit_type' => '°C'],
                ],

                'Графическое ядро' => [
                    [ 'attribute' => 'Интегрированное графическое ядро', 'value' => 'нет'],
                ],
                
                'Шина и контроллеры' => [
                    [ 'attribute' => 'Встроенный контроллер PCI Express', 'value' => 'PCI-E 3.0'],
                    [ 'attribute' => 'Число линий PCI Express', 'value' => '48 шт'],
                ],

                'Дополнительно' => [
                    [ 'attribute' => 'Технология виртуализации', 'value' => 'есть'],
                    [ 'attribute' => 'Особенности, дополнительно', 'value' => 'поддержка Intel Optane'],
                ],

            ],
            10 => [
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

            ],

            // Видеокарты
            11 => [
                'Заводские данные' => [
                    [ 'attribute' => 'Гарантия продавца', 'value' => 36, 'unit_type' => 'мес.'],
                    [ 'attribute' => 'Страна-производитель', 'value' => 'Китай'],
                ],

                'Общие параметры' => [
                    [ 'attribute' => 'Тип', 'value' => 'видеокарта'],
                    [ 'attribute' => 'Модель', 'value' => 'Palit GeForce RTX 4090 GameRock'],
                    [ 'attribute' => 'Код производителя', 'value' => '[NED4090019SB-1020G]'],
                    [ 'attribute' => 'Цвет', 'value' => 'черный'],
                    [ 'attribute' => 'Предназначена для майнинга (добыча криптовалют) ', 'value' => 'нет'],
                    [ 'attribute' => 'LHR', 'value' => 'нет'],

                    [ 'attribute' => 'Год релиза', 'value' => 2022],
                    [ 'attribute' => 'Производитель', 'value' => 'Palit'],
                    [ 'attribute' => 'Производитель графического процессора', 'value' => 'NVIDIA'],
                    [ 'attribute' => 'Назначение', 'value' => 'игровая видеокарта'],
                ],

                'Основные параметры' => [
                    [ 'attribute' => 'Графический процессор', 'value' => 'GeForce RTX 4090'],
                    [ 'attribute' => 'Микроархитектура', 'value' => 'NVIDIA Ada Lovelace'],
                    [ 'attribute' => 'Техпроцесс', 'value' => '5нм'],
                ],

                'Спецификации видеопроцессора' => [
                    [ 'attribute' => 'Штатная частота работы видеочипа', 'value' => 2235, 'unit_type' => 'Мгц'],
                    [ 'attribute' => 'Турбочастота', 'value' => 2520, 'unit_type' => 'Мгц'],
                    [ 'attribute' => 'Количество универсальных процессоров (ALU)', 'value' => 16384],
                    [ 'attribute' => 'Число текстурных блоков', 'value' => 512],
                    [ 'attribute' => 'Число блоков растеризации', 'value' => 176],
                    [ 'attribute' => 'Поддержка трассировки лучей', 'value' => 'есть'],
                    [ 'attribute' => 'Аппаратное ускорение трассировки лучей (RT-ядра)', 'value' => 128],
                    [ 'attribute' => 'Тензорные ядра', 'value' => 512],
                ],

                'Спецификации видеопамяти' => [
                    [ 'attribute' => 'Объем видеопамяти', 'value' => 24, 'unit_type' => 'ГБ'],
                    [ 'attribute' => 'Тип памяти', 'value' => 'GDDR6X'],
                    [ 'attribute' => 'Разрядность шины памяти', 'value' => 384, 'unit_type' => 'бит'],
                    [ 'attribute' => 'Максимальная пропускная способность памяти', 'value' => 1008, 'unit_type' => 'Гбайт/сек'],
                    [ 'attribute' => 'Эффективная частота памяти', 'value' => 21000, 'unit_type' => 'Мгц'],
                ],

                'Вывод изображения' => [
                    [ 'attribute' => 'Тип и количество видеоразъемов', 'value' => '3 x DisplayPort, HDMI'],
                    [ 'attribute' => 'Версия HDMI', 'value' => 2.1],
                    [ 'attribute' => 'Версия DisplayPort', 'value' => '1.4a'],
                    [ 'attribute' => 'Количество подключаемых одновременно мониторов', 'value' => 4],
                    [ 'attribute' => 'Максимальное разрешение', 'value' => '7680x4320 (8K Ultra HD)'],
                ],

                'Подключение' => [
                    [ 'attribute' => 'Интерфейс подключения', 'value' => 'PCI-E 4.0'],
                    [ 'attribute' => 'Форм-фактор разъема подключения', 'value' => 'PCIe x16'],
                    [ 'attribute' => 'Количество линий PCI Express', 'value' => 16],
                    [ 'attribute' => 'Разъемы дополнительного питания', 'value' => '16 pin (12VHPWR)'],
                    [ 'attribute' => 'Рекомендуемый блок питания', 'value' => 1000, 'unit_type' => 'Вт'],
                    [ 'attribute' => 'Потребляемая мощность', 'value' => 450, 'unit_type' => 'Вт'],
                ],
                 
                'Система охлаждения' => [
                    [ 'attribute' => 'Тип охлаждения', 'value' => 'активное воздушное'],
                    [ 'attribute' => 'Тип и количество установленных вентиляторов', 'value' => '3 осевых'],
                    [ 'attribute' => 'Радиатор жидкостного охлаждения', 'value' => 'нет'],
                ],
                
                'Дополнительно' => [
                    [ 'attribute' => 'Подсветка элементов видеокарты', 'value' => 'есть'],
                    [ 'attribute' => 'Синхронизация RGB подсветки', 'value' => 'Palit ThunderMaster'],
                    [ 'attribute' => 'LCD дисплей', 'value' => 'нет'],
                    [ 'attribute' => 'Переключатель BIOS', 'value' => 'есть'],
                    [ 'attribute' => 'Комплектация', 'value' => 'кабель синхронизации ARGB подсветки, кронштейн для поддержки карты, переходник 16 pin на 3 x 8 pin'],
                ],
 
                'Габариты и вес' => [
                    [ 'attribute' => 'Низкопрофильная карта (Low Profile)', 'value' => 'нет'],
                    [ 'attribute' => 'Количество занимаемых слотов расширения', 'value' => 3.5],
                    [ 'attribute' => 'Длина видеокарты', 'value' => 329, 'unit_type' => 'мм'],
                    [ 'attribute' => 'Ширина видеокарты', 'value' => 138, 'unit_type' => 'мм'],
                    [ 'attribute' => 'Толщина видеокарты', 'value' => 71.5, 'unit_type' => 'мм'],
                ],
            ],
            12 => [
                'Заводские данные' => [
                    [ 'attribute' => 'Гарантия продавца', 'value' => 36, 'unit_type' => 'мес.'],
                    [ 'attribute' => 'Страна-производитель', 'value' => 'Китай'],
                ],

                'Общие параметры' => [
                    [ 'attribute' => 'Тип', 'value' => 'видеокарта'],
                    [ 'attribute' => 'Модель', 'value' => 'Palit GeForce RTX 4080 SUPER GamingPro OC'],
                    [ 'attribute' => 'Код производителя', 'value' => '[NED408ST19T2-1032A]'],
                    [ 'attribute' => 'Цвет', 'value' => 'черный'],
                    [ 'attribute' => 'Предназначена для майнинга (добыча криптовалют) ', 'value' => 'нет'],
                    [ 'attribute' => 'LHR', 'value' => 'нет'],

                    [ 'attribute' => 'Год релиза', 'value' => 2022],
                    [ 'attribute' => 'Производитель', 'value' => 'Palit'],
                    [ 'attribute' => 'Производитель графического процессора', 'value' => 'NVIDIA'],
                    [ 'attribute' => 'Назначение', 'value' => 'игровая видеокарта'],
                ],

                'Основные параметры' => [
                    [ 'attribute' => 'Графический процессор', 'value' => 'GeForce RTX 4080 SUPER'],
                    [ 'attribute' => 'Микроархитектура', 'value' => 'NVIDIA Ada Lovelace'],
                    [ 'attribute' => 'Техпроцесс', 'value' => '5нм'],
                ],

                'Спецификации видеопроцессора' => [
                    [ 'attribute' => 'Штатная частота работы видеочипа', 'value' => 2295, 'unit_type' => 'Мгц'],
                    [ 'attribute' => 'Турбочастота', 'value' => 2610, 'unit_type' => 'Мгц'],
                    [ 'attribute' => 'Количество универсальных процессоров (ALU)', 'value' => 10240],
                    [ 'attribute' => 'Число текстурных блоков', 'value' => 320],
                    [ 'attribute' => 'Число блоков растеризации', 'value' => 112],
                    [ 'attribute' => 'Поддержка трассировки лучей', 'value' => 'есть'],
                    [ 'attribute' => 'Аппаратное ускорение трассировки лучей (RT-ядра)', 'value' => 80],
                    [ 'attribute' => 'Тензорные ядра', 'value' => 320],
                ],

                'Спецификации видеопамяти' => [
                    [ 'attribute' => 'Объем видеопамяти', 'value' => 16, 'unit_type' => 'ГБ'],
                    [ 'attribute' => 'Тип памяти', 'value' => 'GDDR6X'],
                    [ 'attribute' => 'Разрядность шины памяти', 'value' => 256, 'unit_type' => 'бит'],
                    [ 'attribute' => 'Максимальная пропускная способность памяти', 'value' => 736, 'unit_type' => 'Гбайт/сек'],
                    [ 'attribute' => 'Эффективная частота памяти', 'value' => 23000, 'unit_type' => 'Мгц'],
                ],

                'Вывод изображения' => [
                    [ 'attribute' => 'Тип и количество видеоразъемов', 'value' => '3 x DisplayPort, HDMI'],
                    [ 'attribute' => 'Версия HDMI', 'value' => 2.1],
                    [ 'attribute' => 'Версия DisplayPort', 'value' => '1.4a'],
                    [ 'attribute' => 'Количество подключаемых одновременно мониторов', 'value' => 4],
                    [ 'attribute' => 'Максимальное разрешение', 'value' => '7680x4320 (8K Ultra HD)'],
                ],

                'Подключение' => [
                    [ 'attribute' => 'Интерфейс подключения', 'value' => 'PCI-E 4.0'],
                    [ 'attribute' => 'Форм-фактор разъема подключения', 'value' => 'PCIe x16'],
                    [ 'attribute' => 'Количество линий PCI Express', 'value' => 16],
                    [ 'attribute' => 'Разъемы дополнительного питания', 'value' => '16 pin (12VHPWR)'],
                    [ 'attribute' => 'Рекомендуемый блок питания', 'value' => 850, 'unit_type' => 'Вт'],
                    [ 'attribute' => 'Потребляемая мощность', 'value' => 320, 'unit_type' => 'Вт'],
                ],
                 
                'Система охлаждения' => [
                    [ 'attribute' => 'Тип охлаждения', 'value' => 'активное воздушное'],
                    [ 'attribute' => 'Тип и количество установленных вентиляторов', 'value' => '3 осевых'],
                    [ 'attribute' => 'Радиатор жидкостного охлаждения', 'value' => 'нет'],
                ],
                
                'Дополнительно' => [
                    [ 'attribute' => 'Подсветка элементов видеокарты', 'value' => 'есть'],
                    [ 'attribute' => 'Синхронизация RGB подсветки', 'value' => '3-pin 5V-D-G (ARGB), Palit ThunderMaster'],
                    [ 'attribute' => 'LCD дисплей', 'value' => 'нет'],
                    [ 'attribute' => 'Переключатель BIOS', 'value' => 'нет'],
                    [ 'attribute' => 'Особенности, дополнительно', 'value' => 'L2 кэш - 64 Мб, металлический бэкплейт, технология «0 децибел»'],
                    [ 'attribute' => 'Комплектация', 'value' => 'документация, кабель синхронизации ARGB подсветки, переходник 16 pin на 2 x 8 pin'],
                ],
 
                'Габариты и вес' => [
                    [ 'attribute' => 'Низкопрофильная карта (Low Profile)', 'value' => 'нет'],
                    [ 'attribute' => 'Количество занимаемых слотов расширения', 'value' => 3.1],
                    [ 'attribute' => 'Длина видеокарты', 'value' => 329, 'unit_type' => 'мм'],
                    [ 'attribute' => 'Ширина видеокарты', 'value' => 133, 'unit_type' => 'мм'],
                    [ 'attribute' => 'Толщина видеокарты', 'value' => 63.4, 'unit_type' => 'мм'],
                ],
            ],
            13 => [
                'Заводские данные' => [
                    [ 'attribute' => 'Гарантия продавца', 'value' => 36, 'unit_type' => 'мес.'],
                    [ 'attribute' => 'Страна-производитель', 'value' => 'Китай'],
                ],

                'Общие параметры' => [
                    [ 'attribute' => 'Тип', 'value' => 'видеокарта'],
                    [ 'attribute' => 'Модель', 'value' => 'GIGABYTE GeForce RTX 4060 EAGLE OC'],
                    [ 'attribute' => 'Код производителя', 'value' => '[GV-N4060EAGLE OC-8GD]'],
                    [ 'attribute' => 'Цвет', 'value' => 'черный'],
                    [ 'attribute' => 'Предназначена для майнинга (добыча криптовалют) ', 'value' => 'нет'],
                    [ 'attribute' => 'LHR', 'value' => 'нет'],

                    [ 'attribute' => 'Год релиза', 'value' => 2022],
                    [ 'attribute' => 'Производитель', 'value' => 'GIGABYTE'],
                    [ 'attribute' => 'Производитель графического процессора', 'value' => 'NVIDIA'],
                    [ 'attribute' => 'Назначение', 'value' => 'игровая видеокарта'],
                ],

                'Основные параметры' => [
                    [ 'attribute' => 'Графический процессор', 'value' => 'GeForce RTX 4060'],
                    [ 'attribute' => 'Микроархитектура', 'value' => 'NVIDIA Ada Lovelace'],
                    [ 'attribute' => 'Техпроцесс', 'value' => '5нм'],
                ],

                'Спецификации видеопроцессора' => [
                    [ 'attribute' => 'Штатная частота работы видеочипа', 'value' => 1830, 'unit_type' => 'Мгц'],
                    [ 'attribute' => 'Турбочастота', 'value' => 2505, 'unit_type' => 'Мгц'],
                    [ 'attribute' => 'Количество универсальных процессоров (ALU)', 'value' => 3072],
                    [ 'attribute' => 'Число текстурных блоков', 'value' => 96],
                    [ 'attribute' => 'Число блоков растеризации', 'value' => 48],
                    [ 'attribute' => 'Поддержка трассировки лучей', 'value' => 'есть'],
                    [ 'attribute' => 'Аппаратное ускорение трассировки лучей (RT-ядра)', 'value' => 24],
                    [ 'attribute' => 'Тензорные ядра', 'value' => 96],
                ],

                'Спецификации видеопамяти' => [
                    [ 'attribute' => 'Объем видеопамяти', 'value' => 8, 'unit_type' => 'ГБ'],
                    [ 'attribute' => 'Тип памяти', 'value' => 'GDDR6'],
                    [ 'attribute' => 'Разрядность шины памяти', 'value' => 128, 'unit_type' => 'бит'],
                    [ 'attribute' => 'Максимальная пропускная способность памяти', 'value' => 272, 'unit_type' => 'Гбайт/сек'],
                    [ 'attribute' => 'Эффективная частота памяти', 'value' => 17000, 'unit_type' => 'Мгц'],
                ],

                'Вывод изображения' => [
                    [ 'attribute' => 'Тип и количество видеоразъемов', 'value' => '2 x DisplayPort, 2 x HDMI'],
                    [ 'attribute' => 'Версия HDMI', 'value' => 2.1],
                    [ 'attribute' => 'Версия DisplayPort', 'value' => '1.4a'],
                    [ 'attribute' => 'Количество подключаемых одновременно мониторов', 'value' => 4],
                    [ 'attribute' => 'Максимальное разрешение', 'value' => '7680x4320 (8K Ultra HD)'],
                ],

                'Подключение' => [
                    [ 'attribute' => 'Интерфейс подключения', 'value' => 'PCI-E 4.0'],
                    [ 'attribute' => 'Форм-фактор разъема подключения', 'value' => 'PCIe x16'],
                    [ 'attribute' => 'Количество линий PCI Express', 'value' => 8],
                    [ 'attribute' => 'Разъемы дополнительного питания', 'value' => '8 pin'],
                    [ 'attribute' => 'Рекомендуемый блок питания', 'value' => 450, 'unit_type' => 'Вт'],
                ],
                 
                'Система охлаждения' => [
                    [ 'attribute' => 'Тип охлаждения', 'value' => 'активное воздушное'],
                    [ 'attribute' => 'Тип и количество установленных вентиляторов', 'value' => '3 осевых'],
                    [ 'attribute' => 'Радиатор жидкостного охлаждения', 'value' => 'нет'],
                ],
                
                'Дополнительно' => [
                    [ 'attribute' => 'Подсветка элементов видеокарты', 'value' => 'нет'],
                    [ 'attribute' => 'Синхронизация RGB подсветки', 'value' => 'нет'],
                    [ 'attribute' => 'LCD дисплей', 'value' => 'нет'],
                    [ 'attribute' => 'Переключатель BIOS', 'value' => 'есть'],
                    [ 'attribute' => 'Комплектация', 'value' => 'документация'],
                ],
 
                'Габариты и вес' => [
                    [ 'attribute' => 'Низкопрофильная карта (Low Profile)', 'value' => 'нет'],
                    [ 'attribute' => 'Количество занимаемых слотов расширения', 'value' => 2],
                    [ 'attribute' => 'Длина видеокарты', 'value' => 272, 'unit_type' => 'мм'],
                    [ 'attribute' => 'Ширина видеокарты', 'value' => 115, 'unit_type' => 'мм'],
                    [ 'attribute' => 'Толщина видеокарты', 'value' => 40, 'unit_type' => 'мм'],
                ],
            ],
            14 => [
                'Заводские данные' => [
                    [ 'attribute' => 'Гарантия продавца', 'value' => 36, 'unit_type' => 'мес.'],
                    [ 'attribute' => 'Страна-производитель', 'value' => 'Китай'],
                ],

                'Общие параметры' => [
                    [ 'attribute' => 'Тип', 'value' => 'видеокарта'],
                    [ 'attribute' => 'Модель', 'value' => 'ASRock Intel Arc A770 Challenger OC'],
                    [ 'attribute' => 'Код производителя', 'value' => '[A770 CL 16GO]'],
                    [ 'attribute' => 'Цвет', 'value' => 'черный'],
                    [ 'attribute' => 'Предназначена для майнинга (добыча криптовалют) ', 'value' => 'нет'],
                    [ 'attribute' => 'LHR', 'value' => 'нет'],

                    [ 'attribute' => 'Год релиза', 'value' => 2022],
                    [ 'attribute' => 'Производитель', 'value' => 'ASRock'],
                    [ 'attribute' => 'Производитель графического процессора', 'value' => 'Intel'],
                    [ 'attribute' => 'Назначение', 'value' => 'игровая видеокарта'],
                ],

                'Основные параметры' => [
                    [ 'attribute' => 'Графический процессор', 'value' => 'Arc A770'],
                    [ 'attribute' => 'Микроархитектура', 'value' => 'Intel Xe-HPG'],
                    [ 'attribute' => 'Техпроцесс', 'value' => '6нм'],
                ],

                'Спецификации видеопроцессора' => [
                    [ 'attribute' => 'Штатная частота работы видеочипа', 'value' => 2100, 'unit_type' => 'Мгц'],
                    [ 'attribute' => 'Турбочастота', 'value' => 2150, 'unit_type' => 'Мгц'],
                    [ 'attribute' => 'Количество универсальных процессоров (ALU)', 'value' => 4096],
                    [ 'attribute' => 'Число текстурных блоков', 'value' => 256],
                    [ 'attribute' => 'Число блоков растеризации', 'value' => 128],
                    [ 'attribute' => 'Поддержка трассировки лучей', 'value' => 'есть'],
                    [ 'attribute' => 'Аппаратное ускорение трассировки лучей (RT-ядра)', 'value' => 32],
                    [ 'attribute' => 'Тензорные ядра', 'value' => 512],
                ],

                'Спецификации видеопамяти' => [
                    [ 'attribute' => 'Объем видеопамяти', 'value' => 16, 'unit_type' => 'ГБ'],
                    [ 'attribute' => 'Тип памяти', 'value' => 'GDDR6'],
                    [ 'attribute' => 'Разрядность шины памяти', 'value' => 256, 'unit_type' => 'бит'],
                    [ 'attribute' => 'Максимальная пропускная способность памяти', 'value' => 560, 'unit_type' => 'Гбайт/сек'],
                    [ 'attribute' => 'Эффективная частота памяти', 'value' => 17500, 'unit_type' => 'Мгц'],
                ],

                'Вывод изображения' => [
                    [ 'attribute' => 'Тип и количество видеоразъемов', 'value' => '3 x DisplayPort, HDMI'],
                    [ 'attribute' => 'Версия HDMI', 'value' => 2.1],
                    [ 'attribute' => 'Версия DisplayPort', 'value' => 2.0],
                    [ 'attribute' => 'Количество подключаемых одновременно мониторов', 'value' => 4],
                    [ 'attribute' => 'Максимальное разрешение', 'value' => '7680x4320 (8K Ultra HD)'],
                ],

                'Подключение' => [
                    [ 'attribute' => 'Интерфейс подключения', 'value' => 'PCI-E 4.0'],
                    [ 'attribute' => 'Форм-фактор разъема подключения', 'value' => 'PCIe x16'],
                    [ 'attribute' => 'Количество линий PCI Express', 'value' => 16],
                    [ 'attribute' => 'Разъемы дополнительного питания', 'value' => '2 x 8 pin'],
                    [ 'attribute' => 'Рекомендуемый блок питания', 'value' => 650, 'unit_type' => 'Вт'],
                ],
                 
                'Система охлаждения' => [
                    [ 'attribute' => 'Тип охлаждения', 'value' => 'активное воздушное'],
                    [ 'attribute' => 'Тип и количество установленных вентиляторов', 'value' => '2 осевых'],
                    [ 'attribute' => 'Радиатор жидкостного охлаждения', 'value' => 'нет'],
                ],
                
                'Дополнительно' => [
                    [ 'attribute' => 'Подсветка элементов видеокарты', 'value' => 'нет'],
                    [ 'attribute' => 'Синхронизация RGB подсветки', 'value' => 'нет'],
                    [ 'attribute' => 'LCD дисплей', 'value' => 'нет'],
                    [ 'attribute' => 'Переключатель BIOS', 'value' => 'нет'],
                    [ 'attribute' => 'Комплектация', 'value' => 'документация'],
                ],
 
                'Габариты и вес' => [
                    [ 'attribute' => 'Низкопрофильная карта (Low Profile)', 'value' => 'нет'],
                    [ 'attribute' => 'Количество занимаемых слотов расширения', 'value' => 2.4],
                    [ 'attribute' => 'Длина видеокарты', 'value' => 271, 'unit_type' => 'мм'],
                    [ 'attribute' => 'Ширина видеокарты', 'value' => 132, 'unit_type' => 'мм'],
                    [ 'attribute' => 'Толщина видеокарты', 'value' => 48, 'unit_type' => 'мм'],
                    [ 'attribute' => 'Вес', 'value' => 785, 'unit_type' => 'г'],
                ],
            ],
            15 => [
                'Заводские данные' => [
                    [ 'attribute' => 'Гарантия продавца', 'value' => 36, 'unit_type' => 'мес.'],
                ],

                'Общие параметры' => [
                    [ 'attribute' => 'Тип', 'value' => 'видеокарта'],
                    [ 'attribute' => 'Модель', 'value' => 'ASRock AMD Radeon RX 7600 XT Challenger OC'],
                    [ 'attribute' => 'Код производителя', 'value' => '[RX7600XT CL 16GO]'],
                    [ 'attribute' => 'Цвет', 'value' => 'черный'],
                    [ 'attribute' => 'Предназначена для майнинга (добыча криптовалют) ', 'value' => 'нет'],
                    [ 'attribute' => 'LHR', 'value' => 'нет'],

                    [ 'attribute' => 'Год релиза', 'value' => 2022],
                    [ 'attribute' => 'Производитель', 'value' => 'ASRock'],
                    [ 'attribute' => 'Производитель графического процессора', 'value' => 'AMD'],
                    [ 'attribute' => 'Назначение', 'value' => 'игровая видеокарта'],
                ],

                'Основные параметры' => [
                    [ 'attribute' => 'Графический процессор', 'value' => 'Radeon RX 7600 XT'],
                    [ 'attribute' => 'Микроархитектура', 'value' => 'AMD RDNA 3'],
                    [ 'attribute' => 'Техпроцесс', 'value' => '6нм'],
                ],

                'Спецификации видеопроцессора' => [
                    [ 'attribute' => 'Штатная частота работы видеочипа', 'value' => 1720, 'unit_type' => 'Мгц'],
                    [ 'attribute' => 'Турбочастота', 'value' => 2799, 'unit_type' => 'Мгц'],
                    [ 'attribute' => 'Количество универсальных процессоров (ALU)', 'value' => 2048],
                    [ 'attribute' => 'Число текстурных блоков', 'value' => 128],
                    [ 'attribute' => 'Число блоков растеризации', 'value' => 64],
                    [ 'attribute' => 'Поддержка трассировки лучей', 'value' => 'есть'],
                    [ 'attribute' => 'Аппаратное ускорение трассировки лучей (RT-ядра)', 'value' => 32],
                    [ 'attribute' => 'Тензорные ядра', 'value' => 'нет'],
                ],

                'Спецификации видеопамяти' => [
                    [ 'attribute' => 'Объем видеопамяти', 'value' => 16, 'unit_type' => 'ГБ'],
                    [ 'attribute' => 'Тип памяти', 'value' => 'GDDR6'],
                    [ 'attribute' => 'Разрядность шины памяти', 'value' => 128, 'unit_type' => 'бит'],
                    [ 'attribute' => 'Максимальная пропускная способность памяти', 'value' => 288, 'unit_type' => 'Гбайт/сек'],
                    [ 'attribute' => 'Эффективная частота памяти', 'value' => 18000, 'unit_type' => 'Мгц'],
                ],

                'Вывод изображения' => [
                    [ 'attribute' => 'Тип и количество видеоразъемов', 'value' => '3 x DisplayPort, HDMI'],
                    [ 'attribute' => 'Версия HDMI', 'value' => 2.1],
                    [ 'attribute' => 'Версия DisplayPort', 'value' => 2.1],
                    [ 'attribute' => 'Количество подключаемых одновременно мониторов', 'value' => 4],
                    [ 'attribute' => 'Максимальное разрешение', 'value' => '7680x4320 (8K Ultra HD)'],
                ],

                'Подключение' => [
                    [ 'attribute' => 'Интерфейс подключения', 'value' => 'PCI-E 4.0'],
                    [ 'attribute' => 'Форм-фактор разъема подключения', 'value' => 'PCIe x16'],
                    [ 'attribute' => 'Количество линий PCI Express', 'value' => 8],
                    [ 'attribute' => 'Разъемы дополнительного питания', 'value' => '2 x 8 pin'],
                    [ 'attribute' => 'Рекомендуемый блок питания', 'value' => 650, 'unit_type' => 'Вт'],
                ],
                 
                'Система охлаждения' => [
                    [ 'attribute' => 'Тип охлаждения', 'value' => 'активное воздушное'],
                    [ 'attribute' => 'Тип и количество установленных вентиляторов', 'value' => '2 осевых'],
                    [ 'attribute' => 'Радиатор жидкостного охлаждения', 'value' => 'нет'],
                ],
                
                'Дополнительно' => [
                    [ 'attribute' => 'Подсветка элементов видеокарты', 'value' => 'есть'],
                    [ 'attribute' => 'Синхронизация RGB подсветки', 'value' => 'нет'],
                    [ 'attribute' => 'LCD дисплей', 'value' => 'нет'],
                    [ 'attribute' => 'Переключатель BIOS', 'value' => 'нет'],
                    [ 'attribute' => 'Особенности, дополнительно', 'value' => 'Infinity Cache - 32 Мб, выключатель подсветки'],
                    [ 'attribute' => 'Комплектация', 'value' => 'документация'],
                ],
 
                'Габариты и вес' => [
                    [ 'attribute' => 'Низкопрофильная карта (Low Profile)', 'value' => 'нет'],
                    [ 'attribute' => 'Количество занимаемых слотов расширения', 'value' => 2.6],
                    [ 'attribute' => 'Длина видеокарты', 'value' => 267, 'unit_type' => 'мм'],
                    [ 'attribute' => 'Ширина видеокарты', 'value' => 130, 'unit_type' => 'мм'],
                    [ 'attribute' => 'Толщина видеокарты', 'value' => 51, 'unit_type' => 'мм'],
                    [ 'attribute' => 'Вес', 'value' => 432, 'unit_type' => 'г'],
                ],
            ],
            16 => [
                'Заводские данные' => [
                    [ 'attribute' => 'Гарантия продавца', 'value' => 36, 'unit_type' => 'мес.'],
                ],

                'Общие параметры' => [
                    [ 'attribute' => 'Тип', 'value' => 'видеокарта'],
                    [ 'attribute' => 'Модель', 'value' => 'ASRock AMD Radeon RX 6800 XT Phantom Gaming OC'],
                    [ 'attribute' => 'Код производителя', 'value' => '[RX6800XT PG 16GO]'],
                    [ 'attribute' => 'Цвет', 'value' => 'черный'],
                    [ 'attribute' => 'Предназначена для майнинга (добыча криптовалют) ', 'value' => 'нет'],
                    [ 'attribute' => 'LHR', 'value' => 'нет'],

                    [ 'attribute' => 'Год релиза', 'value' => 2022],
                    [ 'attribute' => 'Производитель', 'value' => 'ASRock'],
                    [ 'attribute' => 'Производитель графического процессора', 'value' => 'AMD'],
                    [ 'attribute' => 'Назначение', 'value' => 'игровая видеокарта'],
                ],

                'Основные параметры' => [
                    [ 'attribute' => 'Графический процессор', 'value' => 'Radeon RX 6800 XT'],
                    [ 'attribute' => 'Микроархитектура', 'value' => 'AMD RDNA 2'],
                    [ 'attribute' => 'Техпроцесс', 'value' => '7нм'],
                ],

                'Спецификации видеопроцессора' => [
                    [ 'attribute' => 'Штатная частота работы видеочипа', 'value' => 1875, 'unit_type' => 'Мгц'],
                    [ 'attribute' => 'Турбочастота', 'value' => 2310, 'unit_type' => 'Мгц'],
                    [ 'attribute' => 'Количество универсальных процессоров (ALU)', 'value' => 4608],
                    [ 'attribute' => 'Число текстурных блоков', 'value' => 288],
                    [ 'attribute' => 'Число блоков растеризации', 'value' => 128],
                    [ 'attribute' => 'Поддержка трассировки лучей', 'value' => 'есть'],
                    [ 'attribute' => 'Аппаратное ускорение трассировки лучей (RT-ядра)', 'value' => 72],
                    [ 'attribute' => 'Тензорные ядра', 'value' => 'нет'],
                ],

                'Спецификации видеопамяти' => [
                    [ 'attribute' => 'Объем видеопамяти', 'value' => 16, 'unit_type' => 'ГБ'],
                    [ 'attribute' => 'Тип памяти', 'value' => 'GDDR6'],
                    [ 'attribute' => 'Разрядность шины памяти', 'value' => 256, 'unit_type' => 'бит'],
                    [ 'attribute' => 'Максимальная пропускная способность памяти', 'value' => 512, 'unit_type' => 'Гбайт/сек'],
                    [ 'attribute' => 'Эффективная частота памяти', 'value' => 16000, 'unit_type' => 'Мгц'],
                ],

                'Вывод изображения' => [
                    [ 'attribute' => 'Тип и количество видеоразъемов', 'value' => '3 x DisplayPort, HDMI'],
                    [ 'attribute' => 'Версия HDMI', 'value' => 2.1],
                    [ 'attribute' => 'Версия DisplayPort', 'value' => 1.4],
                    [ 'attribute' => 'Количество подключаемых одновременно мониторов', 'value' => 4],
                    [ 'attribute' => 'Максимальное разрешение', 'value' => '7680x4320 (8K Ultra HD)'],
                ],

                'Подключение' => [
                    [ 'attribute' => 'Интерфейс подключения', 'value' => 'PCI-E 4.0'],
                    [ 'attribute' => 'Форм-фактор разъема подключения', 'value' => 'PCIe x16'],
                    [ 'attribute' => 'Количество линий PCI Express', 'value' => 16],
                    [ 'attribute' => 'Разъемы дополнительного питания', 'value' => '3 x 8 pin'],
                    [ 'attribute' => 'Рекомендуемый блок питания', 'value' => 800, 'unit_type' => 'Вт'],
                ],
                 
                'Система охлаждения' => [
                    [ 'attribute' => 'Тип охлаждения', 'value' => 'активное воздушное'],
                    [ 'attribute' => 'Тип и количество установленных вентиляторов', 'value' => '3 осевых'],
                    [ 'attribute' => 'Радиатор жидкостного охлаждения', 'value' => 'нет'],
                ],
                
                'Дополнительно' => [
                    [ 'attribute' => 'Подсветка элементов видеокарты', 'value' => 'есть'],
                    [ 'attribute' => 'Синхронизация RGB подсветки', 'value' => 'ASRock Polychrome'],
                    [ 'attribute' => 'LCD дисплей', 'value' => 'нет'],
                    [ 'attribute' => 'Переключатель BIOS', 'value' => 'нет'],
                    [ 'attribute' => 'Особенности, дополнительно', 'value' => 'Infinity Cache - 128 Мб, выключатель подсветки'],
                    [ 'attribute' => 'Комплектация', 'value' => 'документация'],
                ],
 
                'Габариты и вес' => [
                    [ 'attribute' => 'Низкопрофильная карта (Low Profile)', 'value' => 'нет'],
                    [ 'attribute' => 'Количество занимаемых слотов расширения', 'value' => 2.8],
                    [ 'attribute' => 'Длина видеокарты', 'value' => 330, 'unit_type' => 'мм'],
                    [ 'attribute' => 'Ширина видеокарты', 'value' => 140, 'unit_type' => 'мм'],
                    [ 'attribute' => 'Толщина видеокарты', 'value' => 56, 'unit_type' => 'мм'],
                    [ 'attribute' => 'Вес', 'value' => 1784, 'unit_type' => 'г'],
                ],
            ],
            17 => [
                'Заводские данные' => [
                    [ 'attribute' => 'Гарантия продавца', 'value' => 36, 'unit_type' => 'мес.'],
                ],

                'Общие параметры' => [
                    [ 'attribute' => 'Тип', 'value' => 'видеокарта'],
                    [ 'attribute' => 'Модель', 'value' => 'Sapphire AMD Radeon RX 7800 XT PURE'],
                    [ 'attribute' => 'Код производителя', 'value' => '[11330-03]'],
                    [ 'attribute' => 'Цвет', 'value' => 'белый'],
                    [ 'attribute' => 'Предназначена для майнинга (добыча криптовалют) ', 'value' => 'нет'],
                    [ 'attribute' => 'LHR', 'value' => 'нет'],

                    [ 'attribute' => 'Год релиза', 'value' => 2022],
                    [ 'attribute' => 'Производитель', 'value' => 'Sapphire'],
                    [ 'attribute' => 'Производитель графического процессора', 'value' => 'AMD'],
                    [ 'attribute' => 'Назначение', 'value' => 'игровая видеокарта'],
                ],

                'Основные параметры' => [
                    [ 'attribute' => 'Графический процессор', 'value' => 'Radeon RX 7800 XT'],
                    [ 'attribute' => 'Микроархитектура', 'value' => 'AMD RDNA 3'],
                    [ 'attribute' => 'Техпроцесс', 'value' => '5нм'],
                ],

                'Спецификации видеопроцессора' => [
                    [ 'attribute' => 'Штатная частота работы видеочипа', 'value' => 2475, 'unit_type' => 'Мгц'],
                    [ 'attribute' => 'Турбочастота', 'value' => 3840, 'unit_type' => 'Мгц'],
                    [ 'attribute' => 'Количество универсальных процессоров (ALU)', 'value' => 4608],
                    [ 'attribute' => 'Число текстурных блоков', 'value' => 240],
                    [ 'attribute' => 'Число блоков растеризации', 'value' => 96],
                    [ 'attribute' => 'Поддержка трассировки лучей', 'value' => 'есть'],
                    [ 'attribute' => 'Аппаратное ускорение трассировки лучей (RT-ядра)', 'value' => 60],
                    [ 'attribute' => 'Тензорные ядра', 'value' => 'нет'],
                ],

                'Спецификации видеопамяти' => [
                    [ 'attribute' => 'Объем видеопамяти', 'value' => 16, 'unit_type' => 'ГБ'],
                    [ 'attribute' => 'Тип памяти', 'value' => 'GDDR6'],
                    [ 'attribute' => 'Разрядность шины памяти', 'value' => 256, 'unit_type' => 'бит'],
                    [ 'attribute' => 'Максимальная пропускная способность памяти', 'value' => 624, 'unit_type' => 'Гбайт/сек'],
                    [ 'attribute' => 'Эффективная частота памяти', 'value' => 19500, 'unit_type' => 'Мгц'],
                ],

                'Вывод изображения' => [
                    [ 'attribute' => 'Тип и количество видеоразъемов', 'value' => '2 x DisplayPort, 2 x HDMI'],
                    [ 'attribute' => 'Версия HDMI', 'value' => 2.1],
                    [ 'attribute' => 'Версия DisplayPort', 'value' => 2.1],
                    [ 'attribute' => 'Количество подключаемых одновременно мониторов', 'value' => 4],
                    [ 'attribute' => 'Максимальное разрешение', 'value' => '7680x4320 (8K Ultra HD)'],
                ],

                'Подключение' => [
                    [ 'attribute' => 'Интерфейс подключения', 'value' => 'PCI-E 4.0'],
                    [ 'attribute' => 'Форм-фактор разъема подключения', 'value' => 'PCIe x16'],
                    [ 'attribute' => 'Количество линий PCI Express', 'value' => 16],
                    [ 'attribute' => 'Разъемы дополнительного питания', 'value' => '2 x 8 pin'],
                    [ 'attribute' => 'Рекомендуемый блок питания', 'value' => 700, 'unit_type' => 'Вт'],
                    [ 'attribute' => 'Потребляемая мощность', 'value' => 270, 'unit_type' => 'Вт'],
                ],
                 
                'Система охлаждения' => [
                    [ 'attribute' => 'Тип охлаждения', 'value' => 'активное воздушное'],
                    [ 'attribute' => 'Тип и количество установленных вентиляторов', 'value' => '3 осевых'],
                    [ 'attribute' => 'Радиатор жидкостного охлаждения', 'value' => 'нет'],
                ],
                
                'Дополнительно' => [
                    [ 'attribute' => 'Подсветка элементов видеокарты', 'value' => 'есть'],
                    [ 'attribute' => 'Синхронизация RGB подсветки', 'value' => 'нет'],
                    [ 'attribute' => 'LCD дисплей', 'value' => 'нет'],
                    [ 'attribute' => 'Переключатель BIOS', 'value' => 'нет'],
                    [ 'attribute' => 'Особенности, дополнительно', 'value' => 'Infinity Cache - 64 Мб'],
                    [ 'attribute' => 'Комплектация', 'value' => 'документация, кронштейн для поддержки карты'],
                ],
 
                'Габариты и вес' => [
                    [ 'attribute' => 'Низкопрофильная карта (Low Profile)', 'value' => 'нет'],
                    [ 'attribute' => 'Количество занимаемых слотов расширения', 'value' => 2.5],
                    [ 'attribute' => 'Длина видеокарты', 'value' => 320, 'unit_type' => 'мм'],
                    [ 'attribute' => 'Ширина видеокарты', 'value' => 129, 'unit_type' => 'мм'],
                    [ 'attribute' => 'Толщина видеокарты', 'value' => 52.6, 'unit_type' => 'мм'],
                ],
            ],
            18 => [
                'Заводские данные' => [
                    [ 'attribute' => 'Гарантия продавца', 'value' => 36, 'unit_type' => 'мес.'],
                ],

                'Общие параметры' => [
                    [ 'attribute' => 'Тип', 'value' => 'видеокарта'],
                    [ 'attribute' => 'Модель', 'value' => 'Sapphire AMD Radeon RX 6400 PULSE'],
                    [ 'attribute' => 'Код производителя', 'value' => '[11315-01-20G]'],
                    [ 'attribute' => 'Цвет', 'value' => 'черный'],
                    [ 'attribute' => 'Предназначена для майнинга (добыча криптовалют) ', 'value' => 'нет'],
                    [ 'attribute' => 'LHR', 'value' => 'нет'],

                    [ 'attribute' => 'Год релиза', 'value' => 2022],
                    [ 'attribute' => 'Производитель', 'value' => 'Sapphire'],
                    [ 'attribute' => 'Производитель графического процессора', 'value' => 'AMD'],
                    [ 'attribute' => 'Назначение', 'value' => 'видеокарта для дома и офиса'],
                ],

                'Основные параметры' => [
                    [ 'attribute' => 'Графический процессор', 'value' => 'Radeon RX 6400'],
                    [ 'attribute' => 'Микроархитектура', 'value' => 'AMD RDNA 2'],
                    [ 'attribute' => 'Техпроцесс', 'value' => '6нм'],
                ],

                'Спецификации видеопроцессора' => [
                    [ 'attribute' => 'Штатная частота работы видеочипа', 'value' => 1923, 'unit_type' => 'Мгц'],
                    [ 'attribute' => 'Турбочастота', 'value' => 2321, 'unit_type' => 'Мгц'],
                    [ 'attribute' => 'Количество универсальных процессоров (ALU) ', 'value' => 768],
                    [ 'attribute' => 'Число текстурных блоков', 'value' => 48],
                    [ 'attribute' => 'Число блоков растеризации', 'value' => 32],
                    [ 'attribute' => 'Поддержка трассировки лучей', 'value' => 'есть'],
                    [ 'attribute' => 'Аппаратное ускорение трассировки лучей (RT-ядра)', 'value' => 12],
                    [ 'attribute' => 'Тензорные ядра', 'value' => 'нет'],
                ],

                'Спецификации видеопамяти' => [
                    [ 'attribute' => 'Объем видеопамяти', 'value' => 4, 'unit_type' => 'ГБ'],
                    [ 'attribute' => 'Тип памяти', 'value' => 'GDDR6'],
                    [ 'attribute' => 'Разрядность шины памяти', 'value' => 64, 'unit_type' => 'бит'],
                    [ 'attribute' => 'Максимальная пропускная способность памяти', 'value' => 128, 'unit_type' => 'Гбайт/сек'],
                    [ 'attribute' => 'Эффективная частота памяти', 'value' => 16000, 'unit_type' => 'Мгц'],
                ],

                'Вывод изображения' => [
                    [ 'attribute' => 'Тип и количество видеоразъемов', 'value' => 'DisplayPort, HDMI'],
                    [ 'attribute' => 'Версия HDMI', 'value' => 2.1],
                    [ 'attribute' => 'Версия DisplayPort', 'value' => 1.4],
                    [ 'attribute' => 'Количество подключаемых одновременно мониторов', 'value' => 2],
                    [ 'attribute' => 'Максимальное разрешение', 'value' => '7680x4320 (8K Ultra HD)'],
                ],

                'Подключение' => [
                    [ 'attribute' => 'Интерфейс подключения', 'value' => 'PCI-E 4.0'],
                    [ 'attribute' => 'Форм-фактор разъема подключения', 'value' => 'PCIe x16'],
                    [ 'attribute' => 'Количество линий PCI Express', 'value' => 4],
                    [ 'attribute' => 'Разъемы дополнительного питания', 'value' => 'нет'],
                    [ 'attribute' => 'Рекомендуемый блок питания', 'value' => 350, 'unit_type' => 'Вт'],
                    [ 'attribute' => 'Потребляемая мощность', 'value' => 55, 'unit_type' => 'Вт'],
                ],
                 
                'Система охлаждения' => [
                    [ 'attribute' => 'Тип охлаждения', 'value' => 'активное воздушное'],
                    [ 'attribute' => 'Тип и количество установленных вентиляторов', 'value' => '1 осевых'],
                    [ 'attribute' => 'Радиатор жидкостного охлаждения', 'value' => 'нет'],
                ],
                
                'Дополнительно' => [
                    [ 'attribute' => 'Подсветка элементов видеокарты', 'value' => 'нет'],
                    [ 'attribute' => 'Синхронизация RGB подсветки', 'value' => 'нет'],
                    [ 'attribute' => 'LCD дисплей', 'value' => 'нет'],
                    [ 'attribute' => 'Переключатель BIOS', 'value' => 'нет'],
                    [ 'attribute' => 'Особенности, дополнительно', 'value' => 'Infinity Cache - 16 Мб'],
                    [ 'attribute' => 'Комплектация', 'value' => 'документация, низкопрофильная планка'],
                ],
 
                'Габариты и вес' => [
                    [ 'attribute' => 'Низкопрофильная карта (Low Profile)', 'value' => 'есть'],
                    [ 'attribute' => 'Количество занимаемых слотов расширения', 'value' => 1],
                    [ 'attribute' => 'Длина видеокарты', 'value' => 170, 'unit_type' => 'мм'],
                    [ 'attribute' => 'Ширина видеокарты', 'value' => 56, 'unit_type' => 'мм'],
                    [ 'attribute' => 'Толщина видеокарты', 'value' => 17.2, 'unit_type' => 'мм'],
                ],
            ],
            19 => [
                'Заводские данные' => [
                    [ 'attribute' => 'Гарантия продавца', 'value' => 36, 'unit_type' => 'мес.'],
                    [ 'attribute' => 'Страна-производитель', 'value' => 'Китай'],
                ],

                'Общие параметры' => [
                    [ 'attribute' => 'Тип', 'value' => 'видеокарта'],
                    [ 'attribute' => 'Модель', 'value' => 'ASRock Intel Arc A380 Challenger ITX OC'],
                    [ 'attribute' => 'Код производителя', 'value' => '[A380 CLI 6GO]'],
                    [ 'attribute' => 'Цвет', 'value' => 'черный'],
                    [ 'attribute' => 'Предназначена для майнинга (добыча криптовалют) ', 'value' => 'нет'],
                    [ 'attribute' => 'LHR', 'value' => 'нет'],

                    [ 'attribute' => 'Год релиза', 'value' => 2022],
                    [ 'attribute' => 'Производитель', 'value' => 'Sapphire'],
                    [ 'attribute' => 'Производитель графического процессора', 'value' => 'Intel'],
                    [ 'attribute' => 'Назначение', 'value' => 'видеокарта для дома и офиса'],
                ],

                'Основные параметры' => [
                    [ 'attribute' => 'Графический процессор', 'value' => 'Arc A380'],
                    [ 'attribute' => 'Микроархитектура', 'value' => 'Intel Xe-HPG'],
                    [ 'attribute' => 'Техпроцесс', 'value' => '7нм'],
                ],

                'Спецификации видеопроцессора' => [
                    [ 'attribute' => 'Штатная частота работы видеочипа', 'value' => 2000, 'unit_type' => 'Мгц'],
                    [ 'attribute' => 'Турбочастота', 'value' => 2250, 'unit_type' => 'Мгц'],
                    [ 'attribute' => 'Количество универсальных процессоров (ALU) ', 'value' => 1024],
                    [ 'attribute' => 'Число текстурных блоков', 'value' => 64],
                    [ 'attribute' => 'Число блоков растеризации', 'value' => 32],
                    [ 'attribute' => 'Поддержка трассировки лучей', 'value' => 'есть'],
                    [ 'attribute' => 'Аппаратное ускорение трассировки лучей (RT-ядра)', 'value' => 8],
                    [ 'attribute' => 'Тензорные ядра', 'value' => 128],
                ],

                'Спецификации видеопамяти' => [
                    [ 'attribute' => 'Объем видеопамяти', 'value' => 6, 'unit_type' => 'ГБ'],
                    [ 'attribute' => 'Тип памяти', 'value' => 'GDDR6'],
                    [ 'attribute' => 'Разрядность шины памяти', 'value' => 96, 'unit_type' => 'бит'],
                    [ 'attribute' => 'Максимальная пропускная способность памяти', 'value' => 186, 'unit_type' => 'Гбайт/сек'],
                    [ 'attribute' => 'Эффективная частота памяти', 'value' => 15500, 'unit_type' => 'Мгц'],
                ],

                'Вывод изображения' => [
                    [ 'attribute' => 'Тип и количество видеоразъемов', 'value' => '3 x DisplayPort, HDMI'],
                    [ 'attribute' => 'Версия HDMI', 'value' => 2.1],
                    [ 'attribute' => 'Версия DisplayPort', 'value' => 2.0],
                    [ 'attribute' => 'Количество подключаемых одновременно мониторов', 'value' => 4],
                    [ 'attribute' => 'Максимальное разрешение', 'value' => '7680x4320 (8K Ultra HD)'],
                ],

                'Подключение' => [
                    [ 'attribute' => 'Интерфейс подключения', 'value' => 'PCI-E 4.0'],
                    [ 'attribute' => 'Форм-фактор разъема подключения', 'value' => 'PCIe x16'],
                    [ 'attribute' => 'Количество линий PCI Express', 'value' => 8],
                    [ 'attribute' => 'Разъемы дополнительного питания', 'value' => '8 pin'],
                    [ 'attribute' => 'Рекомендуемый блок питания', 'value' => 500, 'unit_type' => 'Вт'],
                ],
                 
                'Система охлаждения' => [
                    [ 'attribute' => 'Тип охлаждения', 'value' => 'активное воздушное'],
                    [ 'attribute' => 'Тип и количество установленных вентиляторов', 'value' => '1 осевых'],
                    [ 'attribute' => 'Радиатор жидкостного охлаждения', 'value' => 'нет'],
                ],
                
                'Дополнительно' => [
                    [ 'attribute' => 'Подсветка элементов видеокарты', 'value' => 'нет'],
                    [ 'attribute' => 'Синхронизация RGB подсветки', 'value' => 'нет'],
                    [ 'attribute' => 'LCD дисплей', 'value' => 'нет'],
                    [ 'attribute' => 'Переключатель BIOS', 'value' => 'нет'],
                    [ 'attribute' => 'Комплектация', 'value' => 'документация'],
                ],
 
                'Габариты и вес' => [
                    [ 'attribute' => 'Низкопрофильная карта (Low Profile)', 'value' => 'нет'],
                    [ 'attribute' => 'Количество занимаемых слотов расширения', 'value' => 2],
                    [ 'attribute' => 'Длина видеокарты', 'value' => 190, 'unit_type' => 'мм'],
                    [ 'attribute' => 'Ширина видеокарты', 'value' => 124, 'unit_type' => 'мм'],
                    [ 'attribute' => 'Толщина видеокарты', 'value' => 39, 'unit_type' => 'мм'],
                    [ 'attribute' => 'Вес', 'value' => 400, 'unit_type' => 'г'],
                ],
            ],
            // 20 => [

            // ],
            // 21 => [

            // ],
            // 22 => [

            // ],
            // 23 => [

            // ],
            // 24 => [

            // ],
            // 25 => [

            // ],

        ];

        foreach ($product_characteristics as $product_id => $attributeGroups) {
            foreach ($attributeGroups as $group => $attributes) {
                // Проверка на существование AttributeGroup и добавление, если не существует
                $attributeGroup = AttributeGroup::firstOrCreate(['name' => $group]);
        
                foreach ($attributes as $attribute) {
                    // Проверка на существование атрибута и его значения в ProductAttribute и AttributeValue
                    $productAttribute = ProductAttribute::firstOrCreate([
                        'name' => $attribute['attribute'],
                        'group_id' => $attributeGroup->id
                    ]);
        
                    // Определение типа значения
                    if (is_numeric($attribute['value'])) {
                        // Если значение числовое
                        $valueInt = $attribute['value'];
                        // Проверяем, есть ли единица измерения
                        $unitType = isset($attribute['unit_type']) ? $attribute['unit_type'] : null;
        
                        // Создаем запись в AttributeValue
                        $attributeValue = AttributeValue::firstOrCreate([
                            'attribute_id' => $productAttribute->id,
                            'value_int' => $valueInt,
                            'unit_type' => $unitType
                        ]);
                    } else {
                        // Если значение строковое
                        $valueString = $attribute['value'];
                        // Создаем запись в AttributeValue
                        $attributeValue = AttributeValue::firstOrCreate([
                            'attribute_id' => $productAttribute->id,
                            'value_string' => $valueString
                        ]);
                    }
        
                    // Создание записи в ProductCharacteristic
                    ProductCharacteristic::create([
                        'product_id' => $product_id,
                        'attribute_id' => $productAttribute->id,
                        'value_id' => $attributeValue->id,
                        'is_visible' => $attribute['is_visible'] ?? true,
                        'order' => $attribute['order'] ?? null,
                    ]);
                }
            }
        }

        // foreach ($product_characteristics as $product_id => $attributeGroups) {
        //     foreach ($attributeGroups as $group => $attributes) {
        //         // Проверка на существование AttributeGroup и добавление, если не существует
        //         $attributeGroup = AttributeGroup::firstOrCreate(['name' => $group]);
                
                
        //         foreach ($attributes as $attribute) {
        //             // Проверка на существование атрибута и его значения в ProductAttribute и AttributeValue
        //             $productAttribute = ProductAttribute::firstOrCreate([
        //                 'name' => $attribute['attribute'],
        //                 'group_id' => $attributeGroup->id
        //             ]);
                    

        //             $attributeValue = AttributeValue::firstOrCreate([
        //                 'attribute_id' => $productAttribute->id,
        //                 'name' => $attribute['value']
        //             ]);

        //             // Создание записи в ProductCharacteristic
        //             ProductCharacteristic::create([
        //                 'product_id' => $product_id,
        //                 'attribute_id' => $productAttribute->id,
        //                 'value_id' => $attributeValue->id
        //             ]);
        //         }
        //     }
        // }
    }
}
