import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ShoppingCart, Heart, Package, User } from "lucide-react";
import { Card, CardHeader, CardContent } from "../components/ui/card";

export default function UserProfile() {
  // Демо-данные пользователя
  const user = {
    first_name: "Иван",
    last_name: "Иванов",
    email: "ivan@example.com",
    avatar: "/placeholder-avatar.jpg"
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-8">Личный кабинет</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Левая колонка - навигация */}
        <div className="w-full lg:w-1/4 space-y-4">
          <Card className="p-4">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden mb-4">
                <img 
                  src={user.avatar} 
                  alt="Аватар" 
                  className="w-full h-full object-cover"
                />
              </div>
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
        
        {/* Правая колонка - информация */}
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
                
                
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
