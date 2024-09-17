import { usePage } from "@inertiajs/react";
import { createContext, useState, useContext, useRef, useEffect } from "react";

const MenuContext = createContext();

const MenuProvider = ({ children }) =>  {
    const { url } = usePage();

    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isMenuAnimating, setIsMenuAnimating] = useState(false);
    const timeRef = useRef(null);

    const openMenu = () => {
        if (url === '/cart') return;
        setIsMenuVisible(true);
        setIsMenuAnimating(true);
    };

    const closeMenu = () => {
        setIsMenuAnimating(false);
    };

    const startCloseMenuTimer = () => {
        if (timeRef.current) {
            clearTimeout(timeRef.current);
        }

        timeRef.current = setTimeout(() => {
            closeMenu();
        }, 2000);
    };

    useEffect(() => {
        return () => {
            if (timeRef.current) {
                clearTimeout(timeRef.current);
            }
        };
    }, []);

    return (
        <MenuContext.Provider value={{ isMenuVisible, isMenuAnimating, openMenu, closeMenu, startCloseMenuTimer }} >
            {children}
        </MenuContext.Provider>
    );

}

export { MenuProvider }
export const useMenu = () => useContext(MenuContext);