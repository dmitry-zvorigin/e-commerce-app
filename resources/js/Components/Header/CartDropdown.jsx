import { deleteSelectedProducts } from "@/Service/Api/Cart";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Link, router, usePage } from "@inertiajs/react";
import { useMemo } from "react";

export default function CartDropdown ({ cartItems }) {

    const selectedProductTotalPrice = useMemo(() => {
        const totalAmount = cartItems
            .reduce((sum, item) => sum + parseFloat(item.product.price || 0), 0);

        const initialTotalAmount = Math.round(totalAmount * 100) / 100;

        return initialTotalAmount;
    }, [cartItems]);


    function handleDeleteProducts() {

        const cartIds = cartItems.map(item => item.id);

        deleteSelectedProducts(
            cartIds,
            () => {
                console.log('Товары успешно удалены');
            },
            (error) => {
                console.error('Ошибка при удалении товаров:', error);
            }
        )
    }

    return (
        <div className="w-[500px] px-5 py-2">
            <div className="flex justify-between">
                <div className="font-bold">Основные товары {cartItems.length}</div>
                <div className="">
                    <button
                        onClick={handleDeleteProducts}
                    >
                        Очистить список
                    </button>
                </div>
            </div>

            <div 
                className={`flex flex-col gap-5 overflow-auto my-5 ${
                    cartItems.length > 3 ? 'h-[300px]' : 'h-auto'
                }`}
            >
                {cartItems.map((cartItem, index) => (
                    <CartModalBody key={cartItem.id} product={cartItem.product} cartId={cartItem.id} />
                ))}
            </div>

            <div className="border-t my-2"/>
            <div className="flex justify-between">
                <div>
                    <p>Итого:</p>
                    <p className="font-bold text-xl">{selectedProductTotalPrice} ₽</p>
                </div>
                <div className="flex gap-5">
                    <div>
                        <button
                            className="border border-slate-300 rounded-lg py-2 px-2 hover:bg-gray-200"
                        >
                            Оформить заказ
                        </button>
                    </div>

                    <div>
                        <Link
                            className="border rounded-lg text-white  py-2 px-2 bg-gradient-to-b from-orange-400 to-orange-500 hover:from-orange-300 hover:to-orange-400"
                            href={route('cart')}
                            as="button"
                        >
                            В корзину
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CartModalBody = ({ product, cartId }) => {

    function handleDeleteProduct(cartId) {

        const cartIds = [cartId];

        deleteSelectedProducts(
            cartIds,
            () => {
                console.log('Товары успешно удалены');
            },
            (error) => {
                console.error('Ошибка при удалении товаров:', error);
            }
        )
    }

    return (
        <div className="grid grid-cols-[1fr_7fr_3fr_1fr] gap-5">
            <div className="h-[70px] w-[70px]">
                <Link
                    href={route('product.show', { productSlug: product.slug })}
                >
                    <img
                        src={`/products_images/image_thumbnail/${product.image}`}
                        alt={product.name}
                        className="object-contain"                          
                    />
                </Link>
            </div>
            <div className="flex">
                <Link
                    className="hover:text-orange-500"
                    href={route('product.show', { productSlug: product.slug })}
                >
                    <h1 className="">{product.name} <mark className="text-sm text-gray-400 bg-white">{product.quantity} шт.</mark></h1>
                </Link>
            </div>
            <div className="text-end font-bold text-nowrap">
                {product.price} ₽
            </div>
            <div className="text-center">
                <button
                    className="text-gray-400"
                    onClick={() => handleDeleteProduct(cartId)}
                >
                    <TrashIcon className="w-5 h-5"/>
                </button>
            </div>
        </div>
    );
}