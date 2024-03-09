import Breadcrumbs from "@/Components/Breadcrumbs";
import Filters from "@/Components/Filters";
import Pagination from "@/Components/Pagination";
import DefaultLayout from "@/Layouts/DefaultLayout";

export default function Products({ categories_menu, breadcrumbs }) {

    return (
        <>
            <DefaultLayout categories_menu={categories_menu}>
            <div className="bg-white">
                <div className="max-w-full py-16 sm:py-24 lg:max-w-7xl">
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                    <Filters/>
                </div>
            </div>
                <Filters/>
            </DefaultLayout>
            
        </>
    );

}