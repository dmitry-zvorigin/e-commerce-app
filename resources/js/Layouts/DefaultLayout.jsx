import Banners from "@/Components/Banners";
import Footer from "@/Components/Footer";
import Navbar from "@/Test/Navbar";

export default function ({ children, categories_menu }) {

    return (
        <>
            <Banners/>
            <header className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <Navbar categoris_menu={categories_menu}/>
            </header>
            <hr/>
            <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                
                <main>{children}</main>

                {/* <Footer/> */}
            </div>
        </>
    );
}