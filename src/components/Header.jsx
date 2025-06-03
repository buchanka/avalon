import React, { useState } from "react";
//контекст нав меню
import { useMenuContext } from '../contexts/BurgerMenuContext/MenuContext';
// контексты иконок
import BurgerMenu from "../contexts/icons/BurgerMenu";
import PinterestIcon from "../contexts/icons/PinterestIcon"
import TelegramIconSmall from "../contexts/icons/TelegramIcon";
import VkIconSmall from "../contexts/icons/VkIcon";
import SearchIconSmall from "../contexts/icons/SearchIcon";
import AccountIconSmall from "../contexts/icons/AccountIcon";
import CartIconSmall from "../contexts/icons/CartIcon";
import HeartIconSmall from "../contexts/icons/HeartIcon";
//лого
import logo from '../assets/images/logo/logo.svg';
import logo_gradient from '../assets/images/logo/logo_gradient.svg';
//компоненты
import SearchPopup from "./SearchPopup";
import Dropdown from "./DropdownMenu";
import MultilevelMenu from "./MultilevelResponsiveMenu";
import ContactsPopup from "./ContactsPopup";
import AuthModal from "./AuthModal";
//стили
import './Header.css';
//компонент ссылки
import { Link } from "react-router-dom";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const {isMenuOpen} = useMenuContext();
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    const handleBurgerOpen = () => setIsBurgerOpen(true);
    const handleBurgerClose = () => setIsBurgerOpen(false);
    const [authModal, setAuthModal] = useState({ open: false, type: null });
    return(
    <>
        <header className="">
            <nav className="bg-black py-2 flex justify-between px-6">
                <div className="flex items-center">
                    <button onClick={handleBurgerOpen} type="button" aria-label="Бургер-меню" className="lg:hidden"> 
                        <BurgerMenu className=""/>
                    </button>
                    <div className="hidden lg:flex space-x-3 items-center">
                        <a href="https://ru.pinterest.com/" target="_blank" rel="noopener noreferrer">
                            <PinterestIcon className='size-10'/>
                        </a>
                        
                        <a href="https://web.telegram.org/" target="_blank" rel="noopener noreferrer">
                            <TelegramIconSmall className='size-12'/>
                        </a>
                        
                        <a href="https://vk.com/" target="_blank" rel="noopener noreferrer">
                            <VkIconSmall className='size-11'/>
                        </a>
                        <ContactsPopup/>
                    </div>
                </div>

                <div className="flex space-x-3 items-center">
                    <button aria-label="Поиск" onClick={handleOpen} type="button">
                        <SearchIconSmall className="" />
                    </button>
                    <button onClick={() => setAuthModal({ open: true, type: "login" })}>
                        <AccountIconSmall className="" />
                    </button>
                    <Link to="/cart">
                        <CartIconSmall className=""/>
                    </Link>
                    <Link to="/favorites">
                        <HeartIconSmall className="" />
                    </Link>
                </div>
            </nav>

            <div className="">
                <div className="flex flex-col items-center bg-icecream py-3">
                    <Link to="/">
                        <img className="w-46 h-14" src={logo} alt="logo" />    
                        <div className="flex flex-row justify-center">
                            <img className="w-40 h-6" src={logo_gradient} alt="logo_gradient"/>
                        </div>
                    </Link>
                </div>
                <div className="bg-frost p-2 border-y border-momo">
                    <div className="hidden lg:flex flex-row place-content-center gap-4 my-2">
                        {/*<div className="font-montserrat text-black font-medium">О нас</div>*/}
                        <Dropdown/>
                        <div className="font-montserrat text-black font-medium">Бестселлеры</div>
                        <Link to="/faq">
                            <div className="font-montserrat text-black font-medium">Поддержка</div>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
        <SearchPopup isOpen={isOpen} onClose={handleClose} />  
        <MultilevelMenu isBurgerOpen={isBurgerOpen} onClose={handleBurgerClose} />
        <AuthModal 
        isOpen={authModal.open} 
        type={authModal.type} 
        onClose={() => setAuthModal({ open: false, type: null })} 
        />
    </>
    )
};
                               

export default Header;