import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowLeft, CreditCard, Package } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import { toast } from 'sonner';
import QRCode from 'react-qr-code';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

export default function Checkout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [formData, setFormData] = useState({
    phone: user?.phone || '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  const [cart, setCart] = useState({
    items: [],
    subtotal: 0,
    shipping: 0,
    discount: 0,
    total: 0
  });

  // Функция для форматирования номера карты
  const formatCardNumber = (value) => {
    // Удаляем все нецифровые символы
    const cleaned = value.replace(/\D/g, '');
    
    // Добавляем пробелы после каждых 4 цифр
    const parts = [];
    for (let i = 0; i < cleaned.length && i < 16; i += 4) {
      parts.push(cleaned.substring(i, i + 4));
    }
    
    return parts.join(' ');
  };

  const formatAndValidateExpiry = (value) => {
    // Удаляем все нецифровые символы
    let cleaned = value.replace(/\D/g, '');
    
    // Ограничиваем длину до 4 цифр (YYMM)
    if (cleaned.length > 4) {
      cleaned = cleaned.substring(0, 4);
    }
    
    // Добавляем слеш после первых 2 цифр (года)
    if (cleaned.length > 2) {
      cleaned = `${cleaned.substring(0, 2)}/${cleaned.substring(2)}`;
    }
    
    return cleaned;
  };

  const validateExpiry = (expiry) => {
    if (!expiry || expiry.length < 5) return false; // Полный формат YY/MM
    
    const [yearStr, monthStr] = expiry.split('/');
    if (!monthStr || !yearStr) return false;
    
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);
    
    // Проверяем что месяц между 1 и 12
    if (month < 1 || month > 12) return false;
    
    // Получаем текущую дату
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Последние 2 цифры года
    const currentMonth = currentDate.getMonth() + 1; // Месяцы в JS 0-11
    
    // Проверяем что год не меньше текущего
    if (year < currentYear) return false;
    
    // Если год равен текущему, проверяем что месяц не меньше текущего
    if (year === currentYear && month < currentMonth) return false;
    
    return true;
  };

  // Обработчик изменения номера карты
  const handleCardNumberChange = (e) => {
    const { value } = e.target;
    const formattedValue = formatCardNumber(value);
    setFormData(prev => ({ ...prev, cardNumber: formattedValue }));
  };

  // Обработчик изменения срока действия карты
  const handleExpiryChange = (e) => {
    const { value } = e.target;
    const formattedValue = formatAndValidateExpiry(value);
    setFormData(prev => ({ ...prev, expiry: formattedValue }));
  };

  const isFormValid = () => {
    return (
      formData.phone &&
      formData.address &&
      formData.cardNumber.replace(/\s/g, '').length === 16 &&
      validateExpiry(formData.expiry) &&
      formData.cvc.length >= 3
    );
  };

  // Обработчик изменения CVC
  const handleCvcChange = (e) => {
    const { value } = e.target;
    // Ограничиваем ввод только цифрами и максимум 4 символа
    const cleaned = value.replace(/\D/g, '').substring(0, 4);
    setFormData(prev => ({ ...prev, cvc: cleaned }));
  };

   React.useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await api.get('/customer/cart');
        const items = response.data.cart.items || [];
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = 0; 
        const total = subtotal + shipping;
        
        setCart({
          items,
          subtotal,
          shipping,
          discount: 0,
          total
        });
      } catch (error) {
        console.error('Ошибка при загрузке корзины:', error);
      }
    };

    fetchCart();
  }, []);


  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      toast.error('Пожалуйста, заполните все поля корректно');
      return;
    }
    setLoading(true);
    
    try {
      // Создаем заказ
      const orderResponse = await api.post('/customer/orders', {
        address: formData.address,
        phone: formData.phone
      });
      
      // Создаем платеж (сохраняем только последние 4 цифры карты)
      const cardLastFour = formData.cardNumber.replace(/\s/g, '').slice(-4);
      await api.post('/customer/payments', {
        orderId: orderResponse.data.order.id,
        cardLastFour,
        amount: cart.total
      });

      setOrderId(orderResponse.data.order.id);
      setShowSuccessDialog(true);
    } catch (error) {
      console.error('Ошибка при оформлении заказа:', error);
      toast.error(error.response?.data?.message || 'Ошибка при оформлении заказа');
    } finally {
      setLoading(false);
    }
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

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Левая колонка - форма оформления */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Контактная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Адрес доставки</Label>
                  <Input 
                    id="address" 
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
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
                  <Input 
                    id="cardNumber" 
                    value={formData.cardNumber}
                    onChange={handleCardNumberChange}
                    maxLength={19} // 16 цифр + 3 пробела
                    placeholder="4242 4242 4242 4242"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Срок действия</Label>
                    <Input 
                      id="expiry" 
                      value={formData.expiry}
                      onChange={handleExpiryChange}
                      maxLength={5} // YY/MM
                      placeholder="YY/MM"
                      required
                      className={formData.expiry && !validateExpiry(formData.expiry) ? 'border-red-500' : ''}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input 
                      id="cvc" 
                      value={formData.cvc}
                      onChange={handleCvcChange}
                      maxLength={4}
                      placeholder="123"
                      required
                    />
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
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                          {item.product?.image ? (
                            <img 
                              src={item.product.image} 
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Package className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{item.product?.name}</p>
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
                    <span>{cart.subtotal.toFixed(2)} руб.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Доставка:</span>
                    <span>{cart.shipping === 0 ? 'Бесплатно' : `${cart.shipping.toFixed(2)} руб.`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2">
                    <span>Итого:</span>
                    <span>{cart.total.toFixed(2)} руб.</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Button 
                  type="submit" 
                  className="w-full bg-darkpurple/10" 
                  size="lg"
                  disabled={loading || cart.items.length === 0}
                >
                  {loading ? 'Оформление...' : 'Подтвердить заказ'}
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  Нажимая на кнопку, вы соглашаетесь с условиями обработки персональных данных
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Заказ успешно оформлен!</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            <QRCode 
              value={`${window.location.origin}/order-success/${orderId}`}
              size={200}
              level="H"
            />
            <p className="text-sm text-gray-500 text-center">
              Сохраните этот QR-код для отслеживания заказа
            </p>
            <Button 
              className="w-full" 
              onClick={() => {
                setShowSuccessDialog(false);
                navigate('/orders');
              }}
            >
              Перейти к моим заказам
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}