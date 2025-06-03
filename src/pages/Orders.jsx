import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowLeft, Package, CheckCircle2, Clock, Truck, XCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";

export default function Orders() {
  // Моковые данные заказов
  const orders = [
    {
      id: "#1001",
      date: "15 мая 2023",
      status: "Доставлен",
      items: [
        { name: "Свеча 'Лотос'", price: 543, quantity: 1 },
        { name: "Свеча 'Череп'", price: 457, quantity: 2 }
      ],
      total: 1457,
      trackingNumber: "TRK123456789"
    },
    {
      id: "#1002",
      date: "10 мая 2023",
      status: "В пути",
      items: [
        { name: "Свеча 'Лотос'", price: 543, quantity: 1 }
      ],
      total: 543,
      trackingNumber: "TRK987654321"
    },
    {
      id: "#1003",
      date: "5 мая 2023",
      status: "Отменен",
      items: [
        { name: "Свеча 'Череп'", price: 457, quantity: 1 }
      ],
      total: 457,
      trackingNumber: null
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "Доставлен":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "В пути":
        return <Truck className="h-5 w-5 text-blue-500" />;
      case "Обработка":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "Отменен":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Package className="w-8 h-8" />
          <h1 className="text-2xl font-bold">Мои заказы</h1>
        </div>
        <Button variant="outline" className="bg-cornflower_blue/30 hover:bg-cornflower_blue/50" asChild>
          <Link to="/catalog" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Вернуться в каталог
          </Link>
        </Button>
      </div>

      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="border-b">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-4">
                    <CardTitle className="text-lg">Заказ {order.id}</CardTitle>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className={`text-sm font-medium ${
                        order.status === "Доставлен" ? "text-green-600" :
                        order.status === "В пути" ? "text-blue-600" :
                        order.status === "Отменен" ? "text-red-600" :
                        "text-yellow-600"
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Дата: {order.date}</p>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <h3 className="font-medium mb-3">Товары:</h3>
                    <ul className="space-y-3">
                      {order.items.map((item, index) => (
                        <li key={index} className="flex justify-between">
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <span>{(item.price * item.quantity).toFixed(2)} руб.</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="font-medium">Итого:</span>
                        <span className="font-bold">{order.total.toFixed(2)} руб.</span>
                      </div>
                      {order.trackingNumber && (
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Трек-номер:</p>
                          <p className="font-mono text-sm">{order.trackingNumber}</p>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Подробнее
                        </Button>
                        {order.status === "Доставлен" && (
                          <Button variant="outline" size="sm">
                            Повторить заказ
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center p-8">
          <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-medium mb-2">У вас нет заказов</h3>
          <p className="text-gray-500 mb-6">Совершите покупки в нашем каталоге</p>
          <Button asChild>
            <Link to="/catalog" className="flex items-center justify-center gap-2">
              Перейти в каталог
            </Link>
          </Button>
        </Card>
      )}
    </div>
  );
}