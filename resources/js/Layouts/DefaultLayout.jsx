import Banners from "@/Components/Banners";
import Footer from "@/Components/Footer";
import Navbar from "@/Test/Navbar";

export default function ({ children, categories_menu }) {

    return (
        <div>
            <Banners/>
            <header className="container mx-auto px-4">
                <Navbar categoris_menu={categories_menu}/>
            </header>
            <hr/>
            <div className="container mx-auto px-4">
                
                <main>{children}</main>

                {/* <Footer/> */}
            </div>
        </div>
    );
}