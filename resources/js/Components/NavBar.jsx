import { useEffect, useState, useRef, useMemo } from 'react';
import { Link } from "@inertiajs/react";
import { BellIcon, ChevronDownIcon, HeartIcon, MagnifyingGlassIcon, ScaleIcon, ShoppingBagIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { usePage } from '@inertiajs/react';
import CartDropdown from './Cart/CartDropdown';

const LinkNav = ({ name, href, icon: Icon, value, isModal = false}) => {

	return(
		<div className="ml-4 flow-root lg:ml-6 relative">
			<Link href={href} className="-m-2 flex flex-col items-center p-2 group z-10">
				<Icon
					className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-orange-700"
					aria-hidden="true"
				/>
				<span className='text-sm text-gray-400 group-hover:text-orange-700'>{name}</span>
			</Link>
			{value.length > 0 && (
				<div 
					className='absolute rounded-full border w-6 h-6 
						flex justify-center items-center text-white text-sm bg-orange-500 top-0 right-0 select-none z-[-1]'
				>
					{value.length}
				</div>
			)}
			{isModal && (
				<div className='absolute right-0 z-50 bg-white'>
					<CartDropdown/>
				</div>
				
			)}

		</div>
	);
}

const ButtonUser = ({ }) => {

	const [isAnimating, setIsAnimating] = useState(false);
	const [isVisible, setIsVisible] = useState(false);

	const openDropdown = () => {
		setIsVisible(true);
		setIsAnimating(true);
	}

	const closeDropdown = () => {
		setIsAnimating(false);
	}


	return (
		<div 
			className="flow-root relative"
		>
			<Link 
				href={route('profile.settings')} 
				className="flex flex-col items-center" 
				onMouseEnter={openDropdown} 
				onMouseLeave={closeDropdown}
			>
				<UserCircleIcon
					className="size-10 flex-shrink-0 text-gray-400 z-50"
					aria-hidden="true"
				/>
			</Link>
			<div
				className={`border shadow-lg right-4 -top-2 absolute min-w-[300px] z-40 bg-white rounded-lg transform origin-top-right transition-all duration-200 
					${isAnimating ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-50 invisible'}`
				}
				onMouseEnter={openDropdown}
				onMouseLeave={closeDropdown}
			>
				<DropdonwMenu/>
			</div>
		</div>
	);

}

const DropdonwMenu = () => {
  	const { auth } = usePage().props;

	const menuItems = [
		{ name: 'Войти', href: route('login') },
		{ name: 'Регистрация', href: route('register') },
	];

	const menuItemsAuth = [
		{ name: 'Заказы', link: 'profile.order'},
		{ name: 'Бонусы', link: 'profile.prozapass'},
		{ name: 'Подписки', link: 'profile.subscriptions'},
		{ name: 'Обратная связь', link: 'profile.feedback'},
		{ name: 'Мои адреса', link: 'profile.address'},
		{ name: 'Обращения в сервис', link: 'profile.service-requests'},
		{ name: 'Настройки профиля', link: 'profile.settings'},
	];

  	return (
		<ul className='text-sm'>
			{auth.user ? (
				<div className='m-3'>
					<Link href={route('profile.settings')} as='button' className='font-bold p-2 hover:text-orange-500'>{auth.user.name}</Link>
					<div className='flex flex-col items-center'>
						{menuItemsAuth.map((item, index) => (
							<Link 
								key={index}
								href={route(item.link)} 
								className="hover:text-orange-500 p-2 w-full"
							>
								{item.name}
							</Link>
						))}
						<Link 
							method='post' 
							href={'logout'} 
							as='button'
							className='hover:text-orange-500 p-2 w-full text-left'
						>
							Выйти
						</Link>
					</div>
				</div>
			) : (
				<>
					{menuItems.map((item, index) => (
						<div key={index} className='flex items-center justify-center m-5'>
							<Link href={item.href}>{item.name}</Link>
						</div>
					))}
				</>
			)}
		</ul>
  	);
}

const SearchBar = () => {
	return(
		<div 
			className='max-w-md h-full flex border border-white rounded-lg 
			hover:border hover:border-slate-400 hover:shadow-lg 
			focus-within:border-slate-400 focus-within:shadow-lg'
		>
			<input 
				className='w-full h-full ml-2 focus:outline-none border-none focus:ring-0 focus:border-none'
				placeholder='Поиск по сайту...'
				/>
			<button><MagnifyingGlassIcon className='w-6 mr-2 ml-2 text-gray-400'/></button>
		</div>
	);
}

const Menu = ({ categories }) => {
	const [isMenuOpen, setMenuOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState(categories[0]);
	const [isHovered, setIsHovered] = useState(false);
	const timerRef = useRef(null);

	const toggleMenu = () => {
		setMenuOpen(!isMenuOpen);
	};

	const handleMouseEnter = (category) => {
		setIsHovered(true);
		timerRef.current = setTimeout(() => {
			setSelectedCategory(category);
		}, 300);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
		clearTimeout(timerRef.current);
	};

	useEffect(() => {
		return () => {
			clearTimeout(timerRef.current);
		};
	}, []);

// TODO
	return (
		<>
			<button 
				className='bg-orange-500 rounded-lg w-full flex justify-center 
				text-white items-center text-sm font-semibold leading-6 
				hover:bg-orange-300' 
				onClick={toggleMenu}
			>
				<p>Каталог</p>
				<div className={isMenuOpen ? 'rotate-180 transform' : ''}>
				<ChevronDownIcon className='w-6' />
				</div>
			</button>
			{isMenuOpen && (
				<div 
					className="absolute w-full z-10 left-0 mt-16 bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 rounded-2xl"
				>
					<div className='flex justify-start'>
						<div>
						<ul className='ml-4 mr-4 text-lg w-96'>
							{categories.map((category) => (
							<Link 
								key={category.id}
								className={`hover-text-orange-700 p-3 ${selectedCategory === category ? 'text-orange-700' : ''}`} 
								href={route('categories', category.slug)} 
								onMouseEnter={() => handleMouseEnter(category)}
								onMouseLeave={handleMouseLeave}
							>
								<div className='hover:text-orange-700 p-3'>
									<li>{category.name}</li>
								</div>
								<hr/>
							</Link>
							))}
						</ul>
						</div>

						<div>
							{selectedCategory && (
								<div className='mb-10'>
									{selectedCategory.children.map((child) => (
										<div key={child.id} className='grid grid-cols-1'>
											<div className='mt-2 mb-2'>
												<Link 
													href={route('categories', child.slug)} 
													className='hover:text-orange-700 text-lg font-bold'
												>
													{child.name}
												</Link>
											</div>
											<hr className='mb-2'/>
											<div className="grid grid-cols-3">
												{child.children.map((ch) => (
													<div className='m-1'>
														<Link 
															href={route('categories', ch.slug)} 
															className='hover:text-orange-700'
														>
															{ch.name}
														</Link>
													</div>
												))}
											</div>
										</div>
									))}
								</div>
							)}
						</div>

					</div>
				</div>
			)}
		</>
	);
};

const Navbar = ({ categoris_menu }) => {

	const { auth } = usePage().props;

	const navigationLinks = [
		{ name: 'Сравнить' , href: route('compare'), icon: ScaleIcon, value: 0 },
		{ name: 'Избранное', href: route('wishlist.redirect'), icon: HeartIcon, value: auth.wishlist },
		{ name: 'Корзина', href: route('cart'), icon: ShoppingBagIcon, value: auth.cart, isModal: true },
		{ name: 'Уведомления', href: route('notification'), icon: BellIcon, value: 0 },
	];

  	const userButton = { name: 'Войти', icon: UserCircleIcon };

	return (
		<div className='flex justify-between items-center relative mb-4 mt-4'>

			<div className='flex rounded-lg bg-orange-400 h-12 items-center'>
				
				<Link 
					className='w-32 h-full flex justify-center items-center text-9x1 font-semibold leading-6 text-white'
					href={route('catalog')}  
				>
					Logo
				</Link>

				<div className='w-32 flex h-full p-1'>
					<Menu categories={categoris_menu}/>
				</div>
			</div>

			<div className="h-12">
				<SearchBar/>
			</div>
			
			<div>
				<div className='grid grid-cols-5 gap-5'>
					<CompareLink/>
					<NotificationsLink/>
					<WishlistLink wishlistItems={auth.wishlist}/>
					<CartLink cartItems={auth.cart}/>

					{/* {navigationLinks.map((navLink, index) => (
						<LinkNav name={navLink.name} key={index} href={navLink.href} icon={navLink.icon} value={navLink.value} isModal={navLink.isModal} />
					))} */}
					<ButtonUser/>
				</div>
			</div>
		</div>
	);
};

export default Navbar;


const CompareLink = ({}) => (
	<div className="flow-root relative">
		<Link href={route('compare')} className=" flex flex-col items-center group z-10">
			<ScaleIcon
				className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-orange-700"
				aria-hidden="true"
			/>
			<span className='text-sm text-gray-400 group-hover:text-orange-700'>Сравнить</span>
		</Link>
	</div>
);

const WishlistLink = ({ wishlistItems }) => (
	<div className="flow-root relative">
		<Link href={route('wishlist.redirect')} className="flex flex-col items-center group z-10">
			<HeartIcon
				className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-orange-700"
				aria-hidden="true"
			/>
			<span className='text-sm text-gray-400 group-hover:text-orange-700'>Избранное</span>
		</Link>
		{wishlistItems.length > 0 && (
			<div 
				className='absolute rounded-full border w-6 h-6 
					flex justify-center items-center text-white text-sm bg-orange-500 top-0 right-0 select-none z-[-1]'
			>
				{wishlistItems.length}
			</div>
		)}

	</div>
);

const CartLink = ({ cartItems }) => {

	const { url } = usePage();
	// console.log(url);
	const [isAnimating, setIsAnimating] = useState(false);
	const [isVisible, setIsVisible] = useState(false);

	const openDropdown = () => {
		if (url === '/cart') return;
		setIsVisible(true); // Показываем элемент, устанавливаем display: block
		// setTimeout(() => setIsAnimating(true), 10); // Запускаем анимацию через небольшую задержку
		setIsAnimating(true);
	}

	const closeDropdown = () => {
		setIsAnimating(false); // Запускаем анимацию исчезновения
		// setTimeout(() => setIsVisible(false), 500); // Через 200 мс (время анимации) скрываем элемент полностью
	}

	const selectedProductTotalPrice = useMemo(() => {
        const totalAmount = cartItems
            .reduce((sum, item) => sum + parseFloat(item.product.price || 0), 0);

        const initialTotalAmount = Math.round(totalAmount * 100) / 100;

        return initialTotalAmount;
    }, [cartItems]);

	const hasItemsInCart = cartItems.length > 0;

	return (
		<div className="flow-root relative"
			onMouseEnter={hasItemsInCart ? openDropdown : null} 
			onMouseLeave={closeDropdown}
		>
			<Link href={route('cart')} className="flex flex-col items-center group z-10" >
				<ShoppingBagIcon
					className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-orange-700"
					aria-hidden="true"
				/>
				<span className={`text-sm group-hover:text-orange-700 ${ hasItemsInCart ? 'text-black font-bold' : 'text-gray-400'}`}>
					{hasItemsInCart ? `${selectedProductTotalPrice} ₽` : 'Корзина'}
				</span>
			</Link>
			{hasItemsInCart  && (
				<>
					<div 
						className='absolute rounded-full border w-6 h-6 
							flex justify-center items-center text-white text-sm bg-orange-500 top-0 right-0 select-none z-[-1]'
					>
						{cartItems.length}
					</div>			

					<div
						className={`fixed inset-0 bg-black transition-all duration-200 ${isAnimating ? 'opacity-50 visible' : 'opacity-0 invisible'} z-40 pointer-events-none`}
						// style={{ display: isVisible ? 'block' : 'none' }}
					/>
					<div
						// className={`absolute right-0 z-50 bg-white rounded-lg transition-transform duration-200 transform ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
						className={`absolute right-0 z-50 bg-white rounded-lg transform origin-top-right transition-all duration-200 ${isAnimating ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-50 invisible'}`}
						// style={{ display: isVisible ? 'block' : 'none' }}
						onMouseEnter={openDropdown}
						onMouseLeave={closeDropdown}
					>
						<CartDropdown cartItems={cartItems} />
					</div>
				</>
			)}
		</div>		
	);

};

const NotificationsLink = ({}) => (
	<div className="flow-root relative">
		<Link href={route('notification')} className="flex flex-col items-center group z-10">
			<BellIcon
				className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-orange-700"
				aria-hidden="true"
			/>
			<span className='text-sm text-gray-400 group-hover:text-orange-700'>Уведомления</span>
		</Link>
	</div>
);