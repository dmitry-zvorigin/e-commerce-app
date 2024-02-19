import Banners from "@/Components/Banners";
import Filters from "@/Components/Filters";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import Pagination from "@/Components/Pagination";

export default function Home() {

    return(
        <>
            <Banners/>
            <Header/>
            <Filters/>
        </>
    );
}