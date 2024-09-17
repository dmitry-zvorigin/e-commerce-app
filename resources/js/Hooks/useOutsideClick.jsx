import { useEffect } from "react";

export default function useOutsideClick(ref, buttonRef, callback) {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                ref.current && 
                !ref.current.contains(event.target) &&
                buttonRef.current && 
                !buttonRef.current.contains(event.target)
            ) {
                callback();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, buttonRef, callback]);
}