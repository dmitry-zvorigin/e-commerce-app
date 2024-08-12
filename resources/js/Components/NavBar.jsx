import { useEffect, useState, useRef } from 'react';
import { Link } from '@inertiajs/react'
import { BellIcon, ChevronDownIcon, HeartIcon, MagnifyingGlassIcon, ScaleIcon, ShoppingBagIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { usePage } from '@inertiajs/react';

const LinkNav = ({ name, href, icon: Icon, value}) => {

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

		</div>
	);
}

const ButtonUser = ({ name, icon: Icon }) => {
	const [isDropdownOpen, setDropdownOpen] = useState(false);
	const { auth } = usePage().props;

	const openDropdown = () => {
		setDropdownOpen(true);
	}

	const closeDropdown = () => {
		setDropdownOpen(false);
	}


	return (
		<div 
			className="ml-4 flow-root lg:ml-6 relative"
			onMouseEnter={openDropdown} 
			onMouseLeave={closeDropdown}
		>
		<button 
			className="-m-2 flex flex-col items-center p-2 group"
		>
			<Icon
				className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-orange-700"
				aria-hidden="true"
			/>
			{auth.user ? (
				<span className='text-sm text-gray-400 group-hover:text-orange-700'>{auth.user.name}</span>
				) : (
				<span className='text-sm text-gray-400 group-hover:text-orange-700'>{name}</span>
			)}
		</button>
		<div>
			{isDropdownOpen && <DropdonwMenu />}
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
		{ name: 'Профиль', href: route('profile.edit') },
		{ name: 'Выйти', href: route('logout') }
	];

  	return (
		<ul className='absolute z-10 min-w-96 right-0 -top-0 bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 rounded-2xl'>
			{auth.user ? (
				<>
					{menuItemsAuth.map((item, index) => (
						<div key={index} className='flex items-center justify-center m-5'>
						<Link  method="post" href={item.href} as="button">{item.name}</Link>
						</div>
					))}
				</>

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
		{ name: 'Корзина', href: route('cart'), icon: ShoppingBagIcon, value: 0 },
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
				<div className='flex'>
					{navigationLinks.map((navLink, index) => (
						<LinkNav name={navLink.name} key={index} href={navLink.href} icon={navLink.icon} value={navLink.value} />
					))}
					<ButtonUser name={userButton.name} icon={userButton.icon}/>
				</div>
			</div>
		</div>
	);
};

export default Navbar;

