import DefaultLayout from "@/Layouts/DefaultLayout";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";

const Cart = ({  }) => {
    return (
        <DefaultLayout>
            <div className="bg-white">
                <div className="max-w-full my-8">
                    {/* <Breadcrumbs breadcrumbs={breadcrumbs} /> */}
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900">Корзина</h2>

                    <div className="border border-slate-300 rounded-lg h-96 w-full flex  flex-col items-center justify-center mt-8">
                        <ShoppingCartIcon className="w-52 h-52 text-gray-500"/>
                        <h1 className="text-4xl font-bold">Пока пусто</h1>
                        <p>Воспользуйтесь <Link href={route('catalog')} className="text-blue-700">каталогом</Link> или поиском</p>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default Cart;