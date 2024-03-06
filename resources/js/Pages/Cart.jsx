import DefaultLayout from "@/Layouts/DefaultLayout";

const Cart = ({ categories }) => {
    return (
        <DefaultLayout categories={categories}>
            Корзина
        </DefaultLayout>
    );
}

export default Cart;