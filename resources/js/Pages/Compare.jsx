import DefaultLayout from "@/Layouts/DefaultLayout";
import { ScaleIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";

const Compare = () => {

    return (
        <DefaultLayout>
            <div className="bg-white">
                <div className="max-w-full my-8">
                    {/* <Breadcrumbs breadcrumbs={breadcrumbs} /> */}

                    <div className="border border-slate-300 rounded-lg h-96 w-full flex items-center mt-8 p-10">
                        {/* <ShoppingCartIcon className="w-52 h-52 text-gray-500"/> */}
                        <ScaleIcon className="w-52 h-52 text-gray-500 m-20"/>
                        <div>
                            <h1 className="text-4xl font-bold">Список сравнения пуст</h1>
                            <p>Для добавления товаров к сравнению  <Link href={route('catalog')} className="text-blue-700">перейдите в каталог</Link></p>
                        </div>

                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default Compare;