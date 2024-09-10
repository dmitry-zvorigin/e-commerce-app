import { useEffect, useState, useRef, useMemo } from 'react';
import { Link } from "@inertiajs/react";
import { BellIcon, ChevronDownIcon, HeartIcon, MagnifyingGlassIcon, ScaleIcon, ShoppingBagIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { usePage } from '@inertiajs/react';
import CartDropdown from './CartDropdown';
import ProfileDropdown from './ProfileDropdown';

export default function Navigation () {

    const { auth } = usePage().props;
    // console.log(auth);
    return (
        <div className='flex justify-end'> 
            <div className='grid grid-cols-4'>
                <CompareLink/>
                <NotificationsLink/>
                <WishlistLink wishlistItems={auth.wishlist}/>
                <CartLink cartItems={auth.cart}/>
            </div>
            <ButtonUser auth={auth}/> 
        </div>
    );
}

const CompareLink = ({}) => (
	<div className="flow-root relative">
		<Link 
            href={route('compare')} 
            className=" flex flex-col items-center p-2 hover:bg-gray-100 rounded-lg"
        >
			<ScaleIcon
				className="h-6 w-6 flex-shrink-0 text-gray-400"
				aria-hidden="true"
			/>
			<span className='text-sm text-gray-400'>Сравнить</span>
		</Link>
	</div>
);

const NotificationsLink = ({}) => (
	<div className="flow-root relative">
		<Link 
            href={route('notification')} 
            className="flex flex-col items-center p-2 hover:bg-gray-100 rounded-lg"
        >
			<BellIcon
				className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-orange-700"
				aria-hidden="true"
			/>
			<span className='text-sm text-gray-400 group-hover:text-orange-700'>Уведомления</span>
		</Link>
	</div>
);

const WishlistLink = ({ wishlistItems }) => (
	<div className="flow-root relative">
		<Link href={route('wishlist.redirect')} className="flex flex-col items-center group z-10 p-2 hover:bg-gray-100 rounded-lg">
			<HeartIcon
				className="h-6 w-6 flex-shrink-0 text-gray-400 "
				aria-hidden="true"
			/>
			<span className='text-sm text-gray-400'>Избранное</span>
		</Link>
		{wishlistItems.length > 0 && (
			<div 
				className='absolute rounded-full border w-6 h-6 
					flex justify-center items-center text-white text-sm bg-orange-500 top-1 right-1 select-none pointer-events-none'
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
		setIsVisible(true);
		setIsAnimating(true);
	}

	const closeDropdown = () => {
		setIsAnimating(false);
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
			<Link 
                href={route('cart')} 
                className="flex flex-col items-center z-10 hover:bg-gray-100 p-2 rounded-lg"
            >
				<ShoppingBagIcon
					className="h-6 w-6 flex-shrink-0 text-gray-400"
					aria-hidden="true"
				/>
				<span className={`text-sm text-nowrap  ${ hasItemsInCart ? 'text-black font-bold' : 'text-gray-400'}`}>
					{hasItemsInCart ? `${selectedProductTotalPrice} ₽` : 'Корзина'}
				</span>
			</Link>
			{hasItemsInCart  && (
				<>
					<div 
						className='absolute rounded-full border w-6 h-6 
							flex justify-center items-center text-white text-sm bg-orange-500 top-1 right-1 select-none pointer-events-none'
					>
						{cartItems.length}
					</div>			

					<div
						className={`fixed inset-0 bg-black transition-all duration-200 ${isAnimating ? 'opacity-50 visible' : 'opacity-0 invisible'} z-40 pointer-events-none`}
					/>
					<div
						className={`absolute right-0 z-50 bg-white rounded-lg transform origin-top-right transition-all duration-200 ${isAnimating ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-50 invisible'}`}
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

const ButtonUser = ({ auth }) => {
	const [isAnimating, setIsAnimating] = useState(false);
	const [isVisible, setIsVisible] = useState(false);

	const openDropdown = () => {
		setIsVisible(true);
		setIsAnimating(true);
	};

	const closeDropdown = () => {
		setIsAnimating(false);
	};


	return (
		<div 
			className="flow-root relative ml-5 py-2"
		>
			<Link 
				href={route('profile.settings')} 
				className="flex flex-col items-center" 
				onMouseEnter={openDropdown} 
				onMouseLeave={closeDropdown}
			>
				<UserCircleIcon
					// className="size-10 flex-shrink-0 text-gray-400 z-50"
                    className={`size-10 text-gray-400 z-30`}
					aria-hidden="true"
				/>
			</Link>
			<div
				className={`border shadow-lg right-0 top-0 absolute min-w-[300px] z-20 bg-white rounded-lg transform origin-top-right transition-all duration-200 
					${isAnimating ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-50 invisible'}`
				}
				onMouseEnter={openDropdown}
				onMouseLeave={closeDropdown}
			>
				<ProfileDropdown auth={auth}/>
			</div>
		</div>
	);

}