import DefaultLayout from "@/Layouts/DefaultLayout";
import ScrollToTopButton from "@/MyComponents/ScrollToTopButton";
import { 
    ArchiveBoxIcon, BanknotesIcon, BellIcon, ClipboardDocumentCheckIcon, Cog6ToothIcon, 
    HeartIcon, HomeModernIcon, MegaphoneIcon, 
    ShieldCheckIcon, TicketIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";

const Links = [
    [
        { name: 'Заказы', icon: <ClipboardDocumentCheckIcon className="w-5 h-5"/>, link: 'profile.order'},
        { name: 'Избранное', icon: <HeartIcon className="w-5 h-5"/>, link: 'profile.wishlist'},
        { name: 'Подписки', icon: <BellIcon className="w-5 h-5"/>, link: 'profile.subscriptions'},
        { name: 'Мои адреса', icon: <HomeModernIcon className="w-5 h-5"/>, link: 'profile.address'},
        { name: 'Бонусы', icon: <BanknotesIcon className="w-5 h-5"/>, link: 'profile.prozapass'},
        { name: 'Достижения', icon: <ArchiveBoxIcon className="w-5 h-5"/>, link: 'profile.achievements'},
    ],
    [
        { name: 'Обращения в СЦ', icon: <WrenchScrewdriverIcon className="w-5 h-5"/>, link: 'profile.service-requests'},
        { name: 'Обратная связь', icon: <TicketIcon className="w-5 h-5"/>, link: 'profile.feedback'},
    ],
    [
        { name: 'Безопасность', icon: <ShieldCheckIcon className="w-5 h-5"/>, link: 'profile.security'},
        { name: 'Настройка уведомлений', icon: <MegaphoneIcon className="w-5 h-5"/>, link: 'profile.notifications'},
        { name: 'Настройки профиля', icon: <Cog6ToothIcon className="w-5 h-5"/>, link: 'profile.settings'},
    ],
];



const SidebarProfileLayout = ({ children }) => {

    return (
        <DefaultLayout>
            <div className="bg-white">
                <div className="max-w-full my-8">
                    {/* <Breadcrumbs breadcrumbs={breadcrumbs} /> */}
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900">Корзина</h2>

                    <div className="flex flex-row">
                        <div className="border border-slate-300 rounded-lg flex mt-8 min-w-[300px]">
                            <nav className="w-full">
                                {Links.map((linkGroup, groupIndex) => (
                                    <div key={`group-${groupIndex}`} className="border-b border-slate-300">
                                        <ul key={`group-${groupIndex}`} className="">
                                            {linkGroup.map((link, index) => (
                                                <li key={index} className="flex items-center text-gray-700 my-2">
                                                    <Link 
                                                        href={route(link.link)} 
                                                        className="hover:text-orange-500 p-3 w-full"
                                                    >
                                                        <div className="flex items-center space-x-2">
                                                            {link.icon}
                                                            <span>{link.name}</span>
                                                        </div>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </nav>
                        </div>
                        <div className="border border-slate-300 rounded-lg mt-8 w-full ml-5">
                            {children}
                        </div>
                    </div>


                </div>
            </div>
            <ScrollToTopButton/>
        </DefaultLayout>
    );
}

export default SidebarProfileLayout;