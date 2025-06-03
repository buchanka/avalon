import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowLeft, CreditCard, Package, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export default function Checkout() {
  // Моковые данные заказа
  const order = {
    items: [
      { id: 1, name: "Свеча 'Лотос'", price: 543, quantity: 1 },
      { id: 2, name: "Свеча 'Череп'", price: 457, quantity: 2 },
    ],
    subtotal: 1457,
    shipping: 0,
    discount: 50,
    total: 1407
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Button variant="outline" asChild className="mb-6 bg-cornflower_blue/30 hover:bg-cornflower_blue/50">
        <Link to="/cart" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Вернуться в корзину
        </Link>
      </Button>

      <h1 className="text-2xl font-bold mb-8 flex items-center gap-3">
        <CreditCard className="w-8 h-8" />
        Оформление заказа
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Левая колонка - форма оплаты */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Контактная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input id="phone" type="tel" placeholder="+7 (XXX) XXX-XX-XX" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Доставка</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Имя</Label>
                  <Input id="firstName" placeholder="Иван" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Фамилия</Label>
                  <Input id="lastName" placeholder="Иванов" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Адрес</Label>
                <Input id="address" placeholder="ул. Примерная, д. 1, кв. 1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Город</Label>
                  <Input id="city" placeholder="Москва" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Индекс</Label>
                  <Input id="postalCode" placeholder="123456" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Оплата</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Номер карты</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Срок действия</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Правая колонка - детали заказа */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ваш заказ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                        <Package className="h-5 w-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Количество: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">{(item.price * item.quantity).toFixed(2)} руб.</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Подытог:</span>
                  <span>{order.subtotal.toFixed(2)} руб.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Доставка:</span>
                  <span>{order.shipping === 0 ? 'Бесплатно' : `$${order.shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Скидка:</span>
                  <span className="text-green-500">-{order.discount.toFixed(2)} руб.</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2">
                  <span>Итого:</span>
                  <span>{order.total.toFixed(2)} руб.</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle2 className="h-4 w-4" />
                <span>Бесплатная доставка при заказе от 2000 руб.</span>
              </div>
              <Button className="w-full bg-darkpurple/10" size="lg">
                Подтвердить заказ
              </Button>
              <p className="text-xs text-gray-500 text-center">
                Нажимая на кнопку, вы соглашаетесь с условиями обработки персональных данных
              </p>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Способы оплаты</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <div className="w-12 h-8 bg-gray-100 rounded-md" />
              <div className="w-12 h-8 bg-gray-100 rounded-md" />
              <div className="w-12 h-8 bg-gray-100 rounded-md" />
              <div className="w-12 h-8 bg-gray-100 rounded-md" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}