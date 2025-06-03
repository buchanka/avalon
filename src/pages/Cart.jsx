import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ShoppingCart, X, ArrowLeft } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/card";

export default function Cart() {
  // Моковые данные товаров в корзине
  const cartItems = [
    { id: 1, name: "Свеча 'Лотос'", price: 543, quantity: 1, image: "/placeholder-phone.jpg" },
    { id: 2, name: "Свеча 'Череп'", price: 457, quantity: 2, image: "/placeholder-case.jpg" },
    { id: 3, name: "Свеча 'Лотос'", price: 543, quantity: 1, image: "/placeholder-airpods.jpg" },
  ];

  // Подсчёт общей суммы
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-4 mb-6">
        <ShoppingCart className="w-8 h-8" />
        <h1 className="text-2xl font-bold">Ваша корзина</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Список товаров */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <Card key={item.id} className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-4 flex flex-col sm:flex-row justify-between">
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-500 mt-1">{item.price.toFixed(2)} руб.</p>
                  </div>
                  <div className="mt-4 sm:mt-0 flex items-center gap-4">
                    <div className="flex items-center border rounded-md">
                      <Button variant="ghost" size="sm" className="h-8 w-8">
                        -
                      </Button>
                      <span className="px-2">{item.quantity}</span>
                      <Button variant="ghost" size="sm" className="h-8 w-8">
                        +
                      </Button>
                    </div>
                    <Button variant="ghost" size="icon" className="text-gray-500">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-8 text-center">
              <p className="text-gray-500">Ваша корзина пуста</p>
            </Card>
          )}
        </div>

        {/* Итого */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Итого</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Товары ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</span>
                <span>{total.toFixed(2)} руб.</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Общая сумма</span>
                <span>{total.toFixed(2)} руб.</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
                <Link to="/checkout">
                    <Button className="w-full bg-cornflower_blue/30 hover:bg-cornflower_blue/50">Оформить заказ</Button>
                </Link>
            </CardFooter>
          </Card>
        </div>
        <Button variant="outline" className="w-full bg-dust_pink/30 hover:bg-dust_pink/50" asChild>
            <Link to="/catalog" className="flex items-center justify-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Продолжить покупки
            </Link>
        </Button>
      </div>
    </div>
  );
}