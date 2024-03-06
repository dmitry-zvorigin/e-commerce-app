import { BellIcon, HeartIcon, ScaleIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

export default function ShoppingBar() {

    return (
        <>
        <div className="ml-4 flow-root lg:ml-6">
            <a href="#" className="group -m-2 flex items-center p-2">
                <ScaleIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-white"
                    aria-hidden="true"
                />
                <span className="ml-2 text-sm font-medium text-white group-hover:text-gray-300">0</span>
                <span className="sr-only">items in cart, view bag</span>
            </a>
        </div>

        <div className="ml-4 flow-root lg:ml-6">
            <a href="#" className="group -m-2 flex items-center p-2">
                <HeartIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-white"
                    aria-hidden="true"
                />
                <span className="ml-2 text-sm font-medium text-white group-hover:text-gray-300">0</span>
                <span className="sr-only">items in cart, view bag</span>
            </a>
        </div>

        <div className="ml-4 flow-root lg:ml-6">
            <a href="#" className="group -m-2 flex items-center p-2">
                <ShoppingBagIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-white"
                    aria-hidden="true"
                />
                <span className="ml-2 text-sm font-medium text-white group-hover:text-gray-300">0</span>
                <span className="sr-only">items in cart, view bag</span>
            </a>
        </div>

        <div className="ml-4 flow-root lg:ml-6">
            <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>
        </div>
        </>
    );
}