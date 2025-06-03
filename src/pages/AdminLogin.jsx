import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/card";
import axios from "axios";

// Настройка axios по умолчанию
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost';

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");

  try {
    console.log('🔄 Получаем CSRF cookie...');
    
    // 1. Получаем CSRF токен
    await axios.get('/sanctum/csrf-cookie', {
      withCredentials: true
    });
    
    console.log('📤 Отправляем запрос логина...');
    
    // 2. Отправляем запрос на вход
    const response = await axios.post('api/admin/login', {
      email,
      password
    }, {
      withCredentials: true
    });

    console.log('✅ Успешный логин:', response.data);

    // 3. Проверяем пользователя
    const userResponse = await axios.get('api/admin/user', {
      withCredentials: true
    });
    
    console.log('👤 Данные пользователя:', userResponse.data);

    if (userResponse.data.role_id !== 1) {
      throw new Error('Доступ запрещен');
    }

    // 4. Перенаправляем в админ-панель
    navigate('/admin_dash');

  } catch (err) {
    console.error('❌ Login error:', err);
    console.error('📋 Error details:', {
      status: err.response?.status,
      statusText: err.response?.statusText,
      data: err.response?.data,
      headers: err.response?.headers
    });
    
    setError(err.response?.data?.message || err.message || 'Ошибка входа');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Вход в админ-панель</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 text-red-500 text-center text-sm">
              {error}
            </div>
          )}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Вход...' : 'Войти'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            Только для администраторов
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}