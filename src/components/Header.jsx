import React, { useState, useEffect } from "react";
import { useMenuContext } from '../contexts/BurgerMenuContext/MenuContext';
import BurgerMenu from "../contexts/icons/BurgerMenu";
import PinterestIcon from "../contexts/icons/PinterestIcon"
import TelegramIconSmall from "../contexts/icons/TelegramIcon";
import VkIconSmall from "../contexts/icons/VkIcon";
import SearchIconSmall from "../contexts/icons/SearchIcon";
import AccountIconSmall from "../contexts/icons/AccountIcon";
import CartIconSmall from "../contexts/icons/CartIcon";
import HeartIconSmall from "../contexts/icons/HeartIcon";
import logo from '../assets/images/logo/logo.svg';
import logo_gradient from '../assets/images/logo/logo_gradient.svg';
import SearchPopup from "./SearchPopup";
import MultilevelMenu from "./MultilevelResponsiveMenu";
import ContactsPopup from "./ContactsPopup";
import AuthModal from "./AuthModal";
import './Header.css';
import { Link, useNavigate } from "react-router-dom";
import api from '../services/api';

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const {isMenuOpen} = useMenuContext();
    const [authModal, setAuthModal] = useState({ open: false, type: null });
    const [isAuthenticated, setIsAuthenticated] = useState(false); 
    const [isAuthCheckComplete, setIsAuthCheckComplete] = useState(false);
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await api.get('/customer/profile');
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
                localStorage.removeItem('token'); 
            } finally {
                setIsAuthCheckComplete(true); 
            }
        };
        
        if (localStorage.getItem('token')) {
            checkAuth();
        } else {
            setIsAuthCheckComplete(true); 
            setIsAuthenticated(false);
        }
        
        const handleStorageChange = (e) => {
            if (e.key === 'token') {
                checkAuth();
            }
        };
        
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке категорий:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    const handleBurgerOpen = () => setIsBurgerOpen(true);
    const handleBurgerClose = () => setIsBurgerOpen(false);

   const handleProfileClick = (e) => {
        if (!isAuthenticated && isAuthCheckComplete) { 
            e.preventDefault();
            setAuthModal({ open: true, type: "login" });
        } else if (isAuthenticated) {
            navigate('/user_profile');
        }
    };

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
                    <button aria-label="Поиск товара" onClick={handleOpen} type="button">
                        <SearchIconSmall className="" />
                    </button>
                    <Link 
                        to={isAuthenticated ? "/user_profile" : "#"} 
                        onClick={handleProfileClick}
                        aria-label="Профиль"
                    >
                        <AccountIconSmall className="" />
                    </Link>
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
                <div className="hidden lg:flex flex-row place-content-center gap-4 my-2">
                    <Link to="/catalog">
                        <div className="font-montserrat text-black font-medium">Каталог</div>
                    </Link>
                     {categories.map(category => (
                        <Link 
                            key={category.id} 
                            to={{
                                pathname: '/catalog',
                                search: `?categories=${category.id}`
                            }}
                            state={{ fromCategory: true }}
                        >
                            <div className="font-montserrat text-black font-medium">
                                {category.name}
                            </div>
                        </Link>
                    ))}
                    <Link to="/faq">
                        <div className="font-montserrat text-black font-medium">FAQ</div>
                    </Link>
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