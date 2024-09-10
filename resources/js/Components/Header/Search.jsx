import { ClockIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

// export default function Search() {

//     const inputRef = useRef(null);
//     const searchRef = useRef(null);

//     const handleFocus = () => {
//         inputRef.current.focus();
//     };

//     const [isAnimating, setIsAnimating] = useState(false);
// 	const [isVisible, setIsVisible] = useState(false);

// 	const openDropdown = () => {
//         inputRef.current.focus();
// 		setIsVisible(true); // Показываем элемент, устанавливаем display: block
// 		// setTimeout(() => setIsAnimating(true), 10); // Запускаем анимацию через небольшую задержку
// 		setIsAnimating(true);
// 	};

// 	const closeDropdown = () => {
// 		setIsAnimating(false); // Запускаем анимацию исчезновения
// 		// setTimeout(() => setIsVisible(false), 500); // Через 200 мс (время анимации) скрываем элемент полностью
// 	};

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (searchRef.current && !searchRef.current.contains(event.target)) {
//                 closeDropdown();
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     return (
//         <div 
//             className="h-full w-full rounded-lg outline-none ring-0 border border-gray-100 flex-col justify-center items-center gap-2 
//                 bg-gray-100 hover:shadow-xl hover:bg-white group transition-shadow duration-200 cursor-text relative"
//             onClick={openDropdown} 
//             ref={searchRef}
//         >
//             <div className="flex justify-center items-center h-full w-full gap-5">
//                 <input 
//                     ref={inputRef}
//                     className="w-full outline-none ring-0 focus:outline-none border-none focus:ring-0 focus:border-none bg-gray-100 group-hover:bg-white text-slate-500"
//                     type="text"
//                     placeholder="Поиск по сайту"
//                 />

//                 <button>
//                     <XMarkIcon className="size-6 text-slate-400"/>
//                 </button>
                
//                 <div className="border-l-2 h-[24px] border-slate-400"/>

//                 <button>
//                     <MagnifyingGlassIcon className="size-6 text-slate-400"/>
//                 </button>
//             </div>

//             {/* <div className="absolute bg-white z-50 w-full"> 
//                 <PresearchSuggests/>
//             </div> */}

//             {isVisible && (
//                 <div
//                     className={`absolute w-full bg-white rounded-lg 
//                         ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
//                 >
//                     <PresearchSuggests />
//                 </div>
//             )}

//             {/* {isVisible && (
//                 <div
//                     className={`fixed inset-0 bg-black transition-all duration-200 opacity-50 z-40`}
//                 />
//             )} */}

//         </div>
//     );
// }

// const PresearchSuggests = () => {

//     return (
//         <div className="mt-5">
//             <div className="flex justify-between">
//                 <h1>История поиска</h1>
//                 <button>Очистить историю</button>
//             </div>
//             <div>
//                 {Array.from({ length: 5}).map((_, item) => (
//                     <div className="flex justify-between  cursor-pointer text-slate-400">
//                         <div className="flex hover:bg-slate-500">
//                             <ClockIcon className="size-5"/>
//                             {item}
//                         </div>
//                         <button className="hover:text-slate-600">
//                             <XMarkIcon className="size-5"/>
//                         </button>
//                     </div>

//                 ))}
//             </div>
//         </div>
//     );
// }


export default function Search() {
    const inputRef = useRef(null);
    const searchRef = useRef(null);

    const [isAnimating, setIsAnimating] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const openDropdown = () => {
        inputRef.current.focus();
        setIsVisible(true);
        setIsAnimating(true);
    };

    const closeDropdown = () => {
        setIsAnimating(false);
        setIsVisible(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                closeDropdown();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (

        <>
            {isVisible && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40"
                />
            )}

            <div 
                className={`relative h-full w-full ${isVisible ? 'z-50' : ''}`}
                ref={searchRef}
            >
                <div 
                    className={`h-full w-full rounded-lg outline-none ring-0 border border-gray-100 flex-col justify-center items-center gap-2 
                    bg-gray-100 cursor-text shadow-md hover:shadow-xl hover:bg-white group transition-shadow duration-200 ${
                        isVisible ? ' bg-white' : 'hover:bg-gray-100'
                    }`}
                    onClick={openDropdown} 
                >
                    <div className="flex justify-center items-center h-full w-full gap-5 p-2 hover:bg-white group rounded-lg">
                        <input 
                            ref={inputRef}
                            // className="  "
                            className={`text-slate-500  focus:border-none rounded-lg w-full ring-0 focus:outline-none border-none focus:ring-0 outline-none bg-gray-100 ${isVisible ? 'bg-white' : 'group-hover:bg-white'}`}
                            type="text"
                            placeholder="Поиск по сайту"
                        />

                        <button>
                            <XMarkIcon className="size-6 text-slate-400"/>
                        </button>
                        
                        <div className="border-l-2 h-[24px] border-slate-400"/>

                        <button>
                            <MagnifyingGlassIcon className="size-6 text-slate-400"/>
                        </button>
                    </div>
                </div>

                {isVisible && (
                    <div
                        className={`absolute left-0 right-0 bg-white rounded-b-lg border border-t-0 border-gray-100 shadow-md z-50 -my-2`}
                    >
                        <PresearchSuggests />
                    </div>
                )}

            </div>
        </>

    );
}

const PresearchSuggests = () => {
    return (
        <div className="mt-2 p-4">
            <div className="flex justify-between mb-3">
                <h1>История поиска</h1>
                <button className="text-blue-500">Очистить историю</button>
            </div>
            <div>
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="flex justify-between cursor-pointer text-slate-400 py-1">
                        <div className="flex items-center hover:bg-slate-100 rounded-md p-1 w-full">
                            <ClockIcon className="w-5 h-5 mr-2"/>
                            История {index + 1}
                        </div>
                        <button className="hover:text-slate-600">
                            <XMarkIcon className="w-5 h-5"/>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};