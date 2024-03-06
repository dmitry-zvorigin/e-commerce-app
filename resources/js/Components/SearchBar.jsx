import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar() {
    return (
        <>
            <div className="flex w-full flex-wrap items-stretch">
                <input
                    type="search"
                    className="
                        m-0 -mr-0.5 block min-w-0 flex-auto rounded-l 
                        border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 
                        py-[0.25rem] text-base font-normal leading-[1.6] text-white outline-none 
                        transition duration-200 ease-in-out focus:z-[3] focus:border-primary 
                        focus:text-white focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-white 
                        dark:text-white dark:placeholder:text-white dark:focus:border-primary"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="button-addon1" 
                />

                {/* <!--Search button--> */}
                <button
                    className="
                    z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs 
                    font-medium uppercase leading-tight 
                    text-white shadow-md transition duration-150 ease-in-out 
                     
                    focus:bg-white
                    focus:shadow-lg 
                    focus:outline-none 
                    focus:ring-0 

                    active:bg-primary-800 
                    active:shadow-lg
                    focus:outline-solid

                    hover:shadow-lg 
                    hover:bg-white
                    hover:text-white
                    "

                    type="button"
                    id="button-addon1"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                >
                    <MagnifyingGlassIcon                     
                        className="h-6 w-6 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                    />
                </button>
            </div>
        </>
    );
}