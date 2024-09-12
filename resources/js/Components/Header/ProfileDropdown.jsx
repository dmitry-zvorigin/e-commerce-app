import { Link } from "@inertiajs/react";

export default function ProfileDropdown({ auth }) {

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
                            method='POST' 
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