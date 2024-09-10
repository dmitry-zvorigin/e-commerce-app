import Navigation from "./Navigation";
import Search from "./Search";
import LogoAndMenu from "./LogoAndMenu";

export default function Header () {

    return (
        <div className="grid grid-cols-[2fr_4fr_3fr] h-[60px] my-5 gap-5 items-center relative">
            <LogoAndMenu/>
            <Search/>
            <Navigation/>
        </div>
    );

}