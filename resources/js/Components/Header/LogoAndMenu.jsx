import { Link, usePage } from "@inertiajs/react";
import CatalogDropdown from "./CatalogDropdown";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function LogoAndMenu() {

    const { categoriesMenu } = usePage().props;
    const [isMenuOpen, setMenuOpen] = useState(false);

    const handleOpenMenu = () => {
        setMenuOpen(!isMenuOpen);
    }
    
    return (
        <div className="h-full w-full rounded-lg bg-gradient-to-b from-orange-300 to-orange-400 grid grid-cols-2">
                <div className="flex justify-center items-center">
                    <Link 
                        href={route('catalog')}  
                        className='text-9x1 font-semibold text-white flex items-center justify-center w-full h-full rounded-s-lg 
                            hover:bg-orange-300 duration-200'
                    >
                        <span>Logo</span>
                    </Link>
                </div>

                <div className='text-center flex m-2 bg-gradient-to-b to-orange-500 from-orange-600 rounded-lg'>
                    <button 
                        className='rounded-lg w-full flex justify-center 
                        text-white items-center text-sm font-semibold 
                        hover:bg-orange-500 duration-200' 
                        onClick={handleOpenMenu}
                    >
                        <p>Каталог</p>
                        <div 
                            className={`ml-2 ${isMenuOpen ? 'rotate-180 transform' : ''}`}
                        >
                            <ChevronDownIcon className='size-5' />
                        </div>
                    </button>
				</div>
                {isMenuOpen && (
                    <CatalogDropdown categories={categoriesMenu}/>
                )}
        </div>
    );
}

