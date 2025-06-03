import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import pink from '../assets/images/third block/pink.webp';
import purple from '../assets/images/third block/purple.jpg';
import blue from '../assets/images/third block/blue.jpg';
import cocoa from '../assets/images/third block/cocoa.jpg';
import { CardButtons } from './CardButtons';
import FavoriteIconSmall from '../contexts/icons/FavoriteIconEmpty';
import FavoriteIconFullSmall from '../contexts/icons/FavoriteIconFull';

const productDescriptions = [
  "585 руб.",
  "345 руб",
  "567 руб.",
  "776 руб."
];

const images = [pink, purple, blue, cocoa];
const imageNames = ["pink", "purple", "blue", "cocoa"];

function ProductCards() {
    const [favorites, setFavorites] = useState({});

    // Функция переключения состояния "избранное"
    const toggleFavorite = (productId) => {
        setFavorites(prev => ({
            ...prev,
            [productId]: !prev[productId]
        }));
    };

    return (
        <section>
            <div className="py-4 max-w-[1300px] mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 px-4">
                    {images.map((image, index) => (
                        <div key={index} className="h-full p-4 min-w-[250px] group">
                            <div className="flex flex-col h-full">
                                <div className="relative mx-auto w-full min-h-[250px] min-w-[250px] max-w-[320px] overflow-hidden rounded-lg">
                                    <img
                                        src={image}
                                        loading="lazy"
                                        alt={imageNames[index]}
                                        className="w-full h-full object-cover rounded-lg transform hover:scale-110 transition-transform duration-300"
                                    />
                                    {/* Иконка сердца */}
                                    <button 
                                        onClick={() => toggleFavorite(index)}
                                        className="absolute top-2 right-2 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all duration-200 group-hover:opacity-100 focus:outline-none"
                                        aria-label={favorites[index] ? "Удалить из избранного" : "Добавить в избранное"}
                                    >
                                        {favorites[index] ? (
                                            <FavoriteIconFullSmall className="h-5 w-5 text-red-500" />
                                        ) : (
                                            <FavoriteIconSmall className="h-5 w-5 text-gray-600 hover:text-red-500" />
                                        )}
                                    </button>
                                </div>
                                <div className="flex flex-col flex-grow justify-between mt-2">
                                    <div className='text-center'>
                                        <h4 className="font-montserrat italic text-black font-medium">
                                            {imageNames[index]}
                                        </h4>
                                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                            {productDescriptions[index]}
                                        </p>
                                    </div>
                                    <div className="mt-1 space-y-2">
                                        <Link 
                                            to="/product_card" 
                                            className="block text-center text-black hover:text-gray-600 transition-colors text-sm underline"
                                        >
                                            Подробнее
                                        </Link>
                                        <div className="flex justify-center">
                                            <CardButtons />
                                        </div>
                                    </div>
                                </div>
                            </div>         
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ProductCards;