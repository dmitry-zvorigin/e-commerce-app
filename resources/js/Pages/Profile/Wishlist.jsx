import SidebarProfileLayout from "@/Layouts/SidebarProfileLayout";
import { HeartIcon, ScaleIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";

const Wishlist = () => {

    return (
        <SidebarProfileLayout>

            <div className="w-full flex justify-center items-center p-5 h-full">
                <HeartIcon className="w-52 h-52 text-gray-500 m-20"/>
                <div>
                    <h1 className="text-4xl font-bold">Список избранного пуст</h1>
                    <p>Для добавления товаров в избранное  <Link href={route('catalog')} className="text-blue-700">перейдите в каталог</Link></p>
                </div>
            </div>

        </SidebarProfileLayout>
    );
}

export default Wishlist;