import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { useState } from 'react';


export default function ButttonCatalog({ categories }) {

    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    console.log(categories);
  return (
    <Popover className="relative">
        {({ open }) => (
            <>
            <div className=''> 
                <Popover.Button className="text-white">
                    Каталог
                    <ChevronDownIcon className={open ? 'rotate-180 transform' : ''} />
                </Popover.Button>
            </div>


            <Transition
                show={open}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >

            <Popover.Panel className="absolute z-10 bg-white rounded-lg p-4 border border-black flex">
                <div className='flex outline'>
                    <div className='flex-auto h-96 w-96 grid grid-cols-1 outline'>
                            {categories.map((category) => (
                                <div className='outline'>
                                    <a key={category.id} href={`/${category.slug}`} onMouseEnter={() => setSelectedCategory(category)} >
                                        {category.name}
                                    </a>
                                </div>

                            ))}
                    </div>
                    <div className='flex-auto w-96 outline'>
                        {selectedCategory && (
                            <div className='outline'>
                                {selectedCategory.children.map((child) => (
                                    <div className='grid grid-cols-1 outline'>
                                        <a href="">{child.name}</a>
                                        <div class="grid grid-cols-4 outline">
                                            <div className='outline'>
                                                <a href='#'>Дочь</a>
                                            </div>
                                            <div className='outline'>
                                                <a href='#'>Дочь</a>
                                            </div>
                                            <div className='outline'>
                                                <a href='#'>Дочь</a>
                                            </div>
                                            <div className='outline'>
                                                <a href='#'>Дочь</a>
                                            </div>
                                            <div className='outline'>
                                                <a href='#'>Дочь</a>
                                            </div>
                                            <div className='outline'>
                                                <a href='#'>Дочь</a>
                                            </div>
                                            <div className='outline'>
                                                <a href='#'>Дочь</a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Popover.Panel>
            </Transition>
            </>
        )}
    </Popover>
  );
};
  