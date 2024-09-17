import Banners from "@/Components/Banners";
import { MenuProvider } from "@/Components/Context/MenuContext";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header/Header";
import { StrictMode } from "react";

export default function ({ children }) {
    return (
        <StrictMode>
            <MenuProvider>
                <div className="flex flex-col min-h-screen">
                    <Banners/>
                    <div className="sticky top-0 bg-white z-50">
                        <header className="container mx-auto px-4">
                            <Header/>
                        </header>
                        <hr/>
                    </div>
                    <div className="container mx-auto px-4 flex-grow">
                        <main>{children}</main>
                    </div>
                    <Footer/>
                </div>
            </MenuProvider>
        </StrictMode>

    );
}