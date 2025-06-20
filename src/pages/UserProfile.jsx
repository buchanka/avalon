import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ShoppingCart, Heart, Package, User } from "lucide-react";
import { Card, CardHeader, CardContent } from "../components/ui/card";
import LogoutButton from '../components/LogoutButton';
import UploadAvatar from '../components/UploadAvatar';
import api from '../services/api';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
        try {
            const response = await api.get('/customer/profile');
            const userData = response.data.user;
            if (userData.avatar) { 
                userData.avatar = `${userData.avatar}${
                    userData.avatar.includes('?') ? '&' : '?'
                }t=${Date.now()}`;
            }
            setUser(userData);
        } catch (error) {
            console.error('Ошибка при загрузке данных пользователя:', error);
        } finally {
            setLoading(false);
        }
    };

    fetchUser();
}, []);

  const handleProfileUpdate = (updatedUser) => {
      setUser(prev => ({
        ...prev,
        ...updatedUser,
        avatar: updatedUser.avatar 
          ? `${updatedUser.avatar}?t=${Date.now()}`
          : prev.avatar
      }));
    };

  if (loading) {
    return <div className="container mx-auto py-8 px-4">Загрузка...</div>;
  }

  if (!user) {
    return <div className="container mx-auto py-8 px-4">Ошибка загрузки данных пользователя</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-8">Личный кабинет</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4 space-y-4">
          <Card className="p-4">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden mb-4">
                <img 
                  src={user.avatar || "/placeholder-avatar.jpg"} 
                  alt="Аватар"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/placeholder-avatar.jpg";
                    if (user.avatar) {
                      setTimeout(() => {
                        e.target.src = `${user.avatar}?retry=${Date.now()}`;
                      }, 500);
                    }
                  }}
                />
              </div>
              <UploadAvatar onAvatarUpdate={(url) => setUser((prev) => ({ ...prev, avatar: url }))} />
              <h2 className="text-lg font-medium text-center">
                {user.first_name} {user.last_name}
              </h2>
            </div>
            
            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/orders" className="flex items-center gap-3">
                  <Package className="h-5 w-5" />
                  <span>Мои заказы</span>
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/favorites" className="flex items-center gap-3">
                  <Heart className="h-5 w-5" />
                  <span>Избранное</span>
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/cart" className="flex items-center gap-3">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Корзина</span>
                </Link>
              </Button>
            </nav>
          </Card>
        </div>
        
        <div className="flex-1">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Личные данные</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="w-full sm:w-1/3">
                    <p className="text-gray-500">Имя</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{user.first_name}</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="w-full sm:w-1/3">
                    <p className="text-gray-500">Фамилия</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{user.last_name}</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="w-full sm:w-1/3">
                    <p className="text-gray-500">Email</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
                <div className='flex flex-row gap-2 justify-start'>
                  <LogoutButton></LogoutButton>
                   <Link to="/user_profile/edit">
                   <Button className="hover:bg-cornflower_blue/20">
                    <p>Редактировать профиль</p>
                    </Button>
                   </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
