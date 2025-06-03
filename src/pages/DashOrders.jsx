import React from 'react';
import { Button } from "../components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogPortal,
  DialogOverlay
} from "../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { useState } from "react";


export default function DashOrders() {
  // Моковые данные заказов
  const orders = [
    { id: 1001, customerId: 501, amount: 199.99, status: "В обработке", date: "2023-05-15" },
    { id: 1002, customerId: 502, amount: 89.50, status: "Отправлен", date: "2023-05-14" },
    { id: 1003, customerId: 503, amount: 245.00, status: "Доставлен", date: "2023-05-10" },
    { id: 1004, customerId: 504, amount: 59.99, status: "Отменен", date: "2023-05-05" },
  ];

  // Состояние для модального окна
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Обработчик открытия формы
  const handleStatusChange = (order) => {
  console.log("Opening dialog for order:", order.id);
  setSelectedOrder(order);
  setIsDialogOpen(true);
  console.log("isDialogOpen:", true); 
};

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Управление заказами</h2>
        <div className="flex gap-2">
          
          <Button variant="outline">Фильтры</Button>
        </div>
      </div>

      {/* Таблица заказов */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID заказа</TableHead>
              <TableHead>Дата</TableHead>
              <TableHead>ID клиента</TableHead>
              <TableHead>Сумма</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">#{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>#{order.customerId}</TableCell>
                <TableCell>${order.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    order.status === "В обработке" ? "bg-blue-100 text-blue-800" :
                    order.status === "Отправлен" ? "bg-yellow-100 text-yellow-800" :
                    order.status === "Доставлен" ? "bg-green-100 text-green-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {order.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleStatusChange(order)}
                  >
                    Изменить статус
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Модальное окно смены статуса */}
      {selectedOrder && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogPortal>
            <DialogOverlay className="fixed inset-0 bg-black/50 z-40" />
            <DialogContent  className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl z-50 w-full max-w-md"
            >
                <DialogHeader>
                <DialogTitle>Изменение статуса заказа #{selectedOrder.id}</DialogTitle>
                <DialogDescription>
                    Выберите новый статус для этого заказа из списка ниже
                </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                <div className="space-y-2">
                    <Label>Текущий статус</Label>
                    <Input value={selectedOrder.status} disabled />
                </div>
                <div className="space-y-2">
                    <Label>Новый статус</Label>
                    <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Выберите статус" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="В обработке">В обработке</SelectItem>
                        <SelectItem value="Подтвержден">Подтвержден</SelectItem>
                        <SelectItem value="Отправлен">Отправлен</SelectItem>
                        <SelectItem value="Доставлен">Доставлен</SelectItem>
                        <SelectItem value="Отменен">Отменен</SelectItem>
                    </SelectContent>
                    </Select>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                    <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    >
                    Отмена
                    </Button>
                    <Button>Сохранить изменения</Button>
                </div>
                </div>
            </DialogContent>
            </DialogPortal>
        </Dialog>
        )}
    </div>
  );
}

function Label({ children }) {
  return <label className="block text-sm font-medium text-gray-700">{children}</label>;
}

function Input({ ...props }) {
  return <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" {...props} />;
}