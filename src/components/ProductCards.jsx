import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CardButtons } from './CardButtons';
import FavoriteIconSmall from '../contexts/icons/FavoriteIconEmpty';
import FavoriteIconFullSmall from '../contexts/icons/FavoriteIconFull';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import { toast } from 'sonner';

function ProductCards({ products }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        const fetchFavorites = async () => {
            if (user) {
                try {
                    const favoritesResponse = await api.get('/customer/favorites');
                    const favoritesData = Array.isArray(favoritesResponse.data) ? favoritesResponse.data : [];
                    setFavorites(favoritesData.map(f => f.id));
                } catch (err) {
                    console.error('Ошибка при загрузке избранного:', err);
                }
            }
        };

        fetchFavorites();
    }, [user]);

    const handleToggleFavorite = async (productId) => {
        if (!user) {
            setShowAuthModal(true);
            return;
        }

        try {
            if (favorites.includes(productId)) {
                await api.delete(`/customer/favorites/${productId}`);
                setFavorites(prev => prev.filter(id => id !== productId));
                toast.success('Товар удалён из избранного');
            } else {
                await api.post('/customer/favorites', { product_id: productId });
                setFavorites(prev => [...prev, productId]);
                toast.success('Товар добавлен в избранное');
            }
        } catch (err) {
            console.error('Ошибка загрузки избранного:', err);
            setError('Произошла ошибка при обновлении избранного');
        }
    };

    if (loading) return <div className="text-center py-8">Загрузка...</div>;
    if (error) return <div className="text-center py-8 text-red-500">Ошибка: {error}</div>;

    return (
        <>
            <section>
                <div className="py-4 max-w-[1300px] mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 px-4">
                        {products.map((product) => (
                            <div key={product.id} className="h-full p-4 min-w-[250px] group">
                                <div className="flex flex-col h-full">
                                    <div className="relative mx-auto w-full min-h-[250px] min-w-[250px] max-w-[320px] overflow-hidden rounded-lg">
                                        <img
                                            src={product.image || 'https://storage.yandexcloud.net/new-test-bucket-123/product-placeholder.webp'}
                                            loading="lazy"
                                            alt={product.name}
                                            className="w-full h-full object-cover rounded-lg transform hover:scale-110 transition-transform duration-300"
                                        />
                                        <button 
                                            onClick={() => handleToggleFavorite(product.id)}
                                            className="absolute top-2 right-2 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all duration-200 group-hover:opacity-100 focus:outline-none"
                                            aria-label={favorites.includes(product.id) ? "Удалить из избранного" : "Добавить в избранное"}
                                        >
                                            {favorites.includes(product.id) ? (
                                                <FavoriteIconFullSmall className="h-5 w-5 text-red-500" />
                                            ) : (
                                                <FavoriteIconSmall className="h-5 w-5 text-gray-600 hover:text-red-500" />
                                            )}
                                        </button>
                                    </div>
                                    <div className="flex flex-col flex-grow justify-between mt-2">
                                        <div className='text-center'>
                                            <h4 className="font-montserrat italic text-black font-medium">
                                                {product.name}
                                            </h4>
                                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                                {product.price} руб.
                                            </p>
                                        </div>
                                        <div className="mt-1 space-y-2">
                                            <Link 
                                                to={`/product_card/${product.id}`} 
                                                className="block text-center text-black hover:text-gray-600 transition-colors text-sm underline"
                                            >
                                                Подробнее
                                            </Link>
                                            <div className="flex justify-center">
                                                <CardButtons productId={product.id} />
                                            </div>
                                        </div>
                                    </div>
                                </div>         
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <AuthModal 
                isOpen={showAuthModal} 
                onClose={() => setShowAuthModal(false)} 
                type="login"
            />
        </>
    );
}

export default ProductCards;