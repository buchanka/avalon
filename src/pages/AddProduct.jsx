import React from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

export default function DashProducts() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Управление товарами</h1>
      
      {/* Форма добавления товара */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Добавить новый товар</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Название товара</Label>
              <Input id="name" placeholder="Свеча 'Лотос'" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Цена (руб.)</Label>
              <Input id="price" type="number" placeholder="999" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Категория</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bestsellers">Бестселлеры</SelectItem>
                <SelectItem value="shaped">Фигурные свечи</SelectItem>
                <SelectItem value="aroma">Ароматические свечи</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea id="description" placeholder="Подробное описание товара..." rows={4} />
          </div>
          
          <div className="space-y-2">
            <Label>Изображение товара</Label>
            <Input id="image" type="file" />
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline">Отмена</Button>
            <Button type="submit">Сохранить товар</Button>
          </div>
        </form>
      </div>
      
      {/* Таблица существующих товаров */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Список товаров</h2>
        {/* Здесь будет ваша таблица товаров */}
      </div>
    </div>
  );
}