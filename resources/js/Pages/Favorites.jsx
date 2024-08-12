import DefaultLayout from "@/Layouts/DefaultLayout";
import { HeartIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";

const Favorites = () => {

    return (
        <DefaultLayout>
            <div className="bg-white">
                <div className="max-w-full my-8">
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                        Избранное
                    </h2>
                </div>
                <div className="border border-slate-300 rounded-lg mt-8 mb-8">
                
                    <div className="w-full flex justify-center items-center p-5 h-full">
                        <HeartIcon className="w-52 h-52 text-gray-500 m-20"/>
                        <div>
                            <h1 className="text-4xl font-bold">Список избранного пуст</h1>
                            <p>Для добавления товаров в избранное  <Link href={route('catalog')} className="text-blue-700">перейдите в каталог</Link></p>
                        </div>
                    </div>

                </div>
            </div>


        </DefaultLayout>
    );
}

export default Favorites;