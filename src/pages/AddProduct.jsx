import React, { useState, useEffect } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import api from '../services/api';
import { toast } from 'sonner';

export default function DashProducts() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category_id: '',
    description: '',
    height: '',
    width: '',
    length: '',
    burn_time: '',
    stock: '', // Добавлено новое поле
    image: null
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/admin/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке категорий:', error);
        toast.error('Не удалось загрузить категории');
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = '';
      if (formData.image) {
        const imageFormData = new FormData();
        imageFormData.append('image', formData.image);

        try {
          const uploadResponse = await api.post('/admin/products/upload-image-new', imageFormData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });

          if (!uploadResponse.data || !uploadResponse.data.url) {
            throw new Error('Неверный формат ответа сервера');
          }
          
          imageUrl = uploadResponse.data.url;
          
          toast.success('Изображение загружено!');
        } catch (uploadError) {
          console.error('Ошибка загрузки изображения:', uploadError);
          toast.error(uploadError.response?.data?.message || 'Ошибка при загрузке изображения');
          setLoading(false);
          return; 
        }
      }

      const productData = {
        ...formData,
        image: imageUrl,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0, // Преобразование в число
        height: formData.height ? parseFloat(formData.height) : null,
        width: formData.width ? parseFloat(formData.width) : null,
        length: formData.length ? parseFloat(formData.length) : null,
        burn_time: formData.burn_time ? parseFloat(formData.burn_time) : null
      };

      const createPromise = api.post('/admin/products', productData);

      await toast.promise(createPromise, {
        loading: 'Создание товара...',
        success: () => {
          setFormData({
            name: '',
            price: '',
            category_id: '',
            description: '',
            height: '',
            width: '',
            length: '',
            burn_time: '',
            stock: '', // Сброс поля
            image: null
          });
          setImagePreview(null);
          return 'Товар успешно добавлен!';
        },
        error: (error) => {
          return error.response?.data?.message || 'Произошла ошибка при создании товара';
        }
      });

    } catch (error) {
      console.error('Ошибка при добавлении товара:', error);
      toast.error(error.response?.data?.message || 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Управление товарами</h1>
      
      {/* Форма добавления товара */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Добавить новый товар</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Название товара</Label>
              <Input 
                id="name" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Свеча Лотос" 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Цена (руб.)</Label>
              <Input 
                id="price" 
                type="number" 
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="999" 
                required
                step="0.01"
                min="0"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category_id">Категория</Label>
              <Select 
                onValueChange={(value) => setFormData(prev => ({ ...prev, category_id: value }))}
                value={formData.category_id}
                required
              >
                <SelectTrigger className="w-full font-montserrat">
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent className="w-[var(--radix-select-trigger-width)] font-montserrat">
                  {categories.map(category => (
                    <SelectItem 
                      key={category.id} 
                      value={String(category.id)}
                      className="select-item w-full py-3 bg-gray-100 hover:bg-gray-100 data-[state=checked]:bg-gray-100 font-montserrat"
                    >
                      <p className="font-montserrat font-normal">
                        {category.name}
                      </p>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Новое поле - Количество на складе */}
            <div className="space-y-2">
              <Label htmlFor="stock">Количество на складе</Label>
              <Input 
                id="stock" 
                type="number" 
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="100" 
                required
                min="0"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea 
              id="description" 
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Подробное описание товара..." 
              rows={4} 
            />
          </div>

          {/* Размеры и характеристики */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height">Высота (см)</Label>
              <Input 
                id="height" 
                type="number" 
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                placeholder="10.5" 
                step="0.1"
                min="0"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="width">Ширина (см)</Label>
              <Input 
                id="width" 
                type="number" 
                name="width"
                value={formData.width}
                onChange={handleInputChange}
                placeholder="5.5" 
                step="0.1"
                min="0"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="length">Длина (см)</Label>
              <Input 
                id="length" 
                type="number" 
                name="length"
                value={formData.length}
                onChange={handleInputChange}
                placeholder="5.5" 
                step="0.1"
                min="0"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="burn_time">Время горения (часы)</Label>
              <Input 
                id="burn_time" 
                type="number" 
                name="burn_time"
                value={formData.burn_time}
                onChange={handleInputChange}
                placeholder="30" 
                step="0.1"
                min="0"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Изображение товара</Label>
            <div className="flex items-center gap-4">
              <Input 
                id="image" 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
              />
              {imagePreview && (
                <div className="w-16 h-16 rounded-md overflow-hidden border">
                  <img 
                    src={imagePreview} 
                    alt="Превью" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={() => {
              setFormData({
                name: '',
                price: '',
                category_id: '',
                description: '',
                height: '',
                width: '',
                length: '',
                burn_time: '',
                stock: '',
                image: null
              });
              setImagePreview(null);
            }}>
              Очистить
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Сохранение...' : 'Сохранить товар'}
            </Button>
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