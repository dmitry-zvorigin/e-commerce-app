
export default function CartDropdown ({}) {

    return (
        <div className="border rounded-lg h-[200px] ">
            <div>
                <div>Основные товары 19</div>
                <div><button>Очистить список</button></div>
            </div>
            <div>

            </div>
            <div className="flex">
                <div>
                    <p>Итого</p>
                    <p>Сумма</p>
                </div>
                <div>
                    <div><button>Оформить заказ</button></div>
                    <div><button>В корзину</button></div>
                </div>
            </div>
        </div>
    );
}