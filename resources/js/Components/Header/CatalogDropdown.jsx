import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

export default function CatalogDropdown ({ categories }) {

    const [isMenuOpen, setMenuOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [isHovered, setIsHovered] = useState(false);
    const timerRef = useRef(null);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const handleMouseEnter = (category) => {
        setIsHovered(true);
        timerRef.current = setTimeout(() => {
            setSelectedCategory(category);
        }, 300);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        clearTimeout(timerRef.current);
    };

    useEffect(() => {
        return () => {
            clearTimeout(timerRef.current);
        };
    }, []);
    
    // TODO
    return (
        <>
            <div 
                className="absolute w-full z-10 left-0 mt-16 bg-white text-sm leading-6 shadow-2xl rounded-lg border border-slate-300"
            >
                <div className='flex justify-start'>
                    <div>
                    <ul className='ml-4 mr-4 text-lg w-96'>
                        {categories.map((category) => (
                        <Link 
                            key={category.id}
                            className={`hover-text-orange-700 p-3 ${selectedCategory === category ? 'text-orange-700' : ''}`} 
                            href={route('categories', category.slug)} 
                            onMouseEnter={() => handleMouseEnter(category)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className='hover:text-orange-700 p-3'>
                                <li>{category.name}</li>
                            </div>
                            <hr/>
                        </Link>
                        ))}
                    </ul>
                    </div>

                    <div>
                        {selectedCategory && (
                            <div className='mb-10'>
                                {selectedCategory.children.map((child) => (
                                    <div key={child.id} className='grid grid-cols-1'>
                                        <div className='mt-2 mb-2'>
                                            <Link 
                                                href={route('categories', child.slug)} 
                                                className='hover:text-orange-700 text-lg font-bold'
                                            >
                                                {child.name}
                                            </Link>
                                        </div>
                                        <hr className='mb-2'/>
                                        <div className="grid grid-cols-3">
                                            {child.children.map((ch) => (
                                                <div className='m-1'>
                                                    <Link 
                                                        href={route('categories', ch.slug)} 
                                                        className='hover:text-orange-700'
                                                    >
                                                        {ch.name}
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
}