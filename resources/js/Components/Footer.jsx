export default function Footer() {

	const company = [
		'О Компании',
		'Новости',
		'Партнерам',
		'Вакансии',
		'Политика конфиденциальности',
		'Персональные данные',
		'Правила продаж',
		'Правила пользования сайта',
		'На информационном ресурсе применяются рекомендательные технологии',
		'Сервисные центры',
	];

	const buyers = [
		'Как оформить заказ',
		'Способы оплаты',
		'Кредиты',
		'Доставка',
		'Статус заказа',
		'Обмен, возврат, гарантия',
		'Проверка статуса ремонта',
		'Юридическим лицам',
		'Проверка счета',
		'Корпоративные отделы',
		'Подарочные карты',
		'Бонусная программа',
		'Помощь',
		'Обратная связь',
	];

    return (
		<footer className="mt-auto bg-gray-800 text-white p-4 text-center">
			<div className="container mx-auto px-20">

				<div className="flex">
					<div className="flex">
						<div className="text-start min-w-60 flex flex-col">
							<h1 className="pb-4">Компания</h1>
							<div className="border-t-[1px] border-white py-2">
								<ul className="columns-1">
									{company.map((element, index) => (
										<li key={index} className="py-2"><a href="#" className="hover:text-orange-400">{element}</a></li>
									))}
								</ul>
							</div>

						</div>
						<div className="text-start min-w-[570px] ml-16 flex flex-col">
							<h1 className="pb-4">Покупателям</h1>
							<div className="border-t-[1px] border-white py-2">
								<ul className="columns-2">
									{buyers.map((element, index) => (
										<li key={index} className="py-2 transition"><a href="#" className="hover:text-orange-400">{element}</a></li>	
									))}
								</ul>
							</div>
						</div>
					</div>
					<div className="max-w-[297px] ml-16">
						<div className="text-start">
							<h1 className="pb-4">Оставайтесь на связи</h1>
							
							<div className="border-t-[1px] border-white py-2">
								<p className="py-2">8-888-88-88-888</p>
								<p className="mb-5">Следите за новинками и акциями:</p>
								<input className="text-black w-full rounded-lg" type="email"/>
								<p className="text-xs mt-5">Подписываясь на рассылку, Вы соглашаетесь
								c условиями политики конфиденциальности и политики обработки персональных данных</p>
							</div>

						</div>
					</div>
				</div>

				<div className="text-start mt-5">
					<p>© 2024 Copyright</p>
				</div>
				
			</div>
		</footer>

      );
}