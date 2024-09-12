import Banners from "@/Components/Banners";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header/Header";

export default function ({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Banners/>
            <header className="container mx-auto px-4">
                <Header/>
            </header>
            <hr/>
            <div className="container mx-auto px-4 flex-grow">
                <main>{children}</main>
            </div>
            <Footer/>
        </div>
    );
}