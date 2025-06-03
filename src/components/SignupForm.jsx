import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export default function SignupForm({ onSwitchForm }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    middle_name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const formatPhone = (value) => {
    if (!value) return value;
    
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 1) return '+7(';
    if (numbers.length <= 4) return `+7(${numbers.slice(1, 4)}`;
    if (numbers.length <= 7) return `+7(${numbers.slice(1, 4)})${numbers.slice(4, 7)}`;
    if (numbers.length <= 9) return `+7(${numbers.slice(1, 4)})${numbers.slice(4, 7)}-${numbers.slice(7, 9)}`;
    return `+7(${numbers.slice(1, 4)})${numbers.slice(4, 7)}-${numbers.slice(7, 9)}-${numbers.slice(9, 11)}`;
  };

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    const formatted = formatPhone(value);
    setFormData(prev => ({ ...prev, phone: formatted }));
    validateField('phone', formatted);
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'first_name':
      case 'last_name':
        if (!value.trim()) {
          newErrors[name] = ['Это поле обязательно'];
        } else if (!/^[А-ЯЁ][а-яё-]*$/.test(value)) {
          newErrors[name] = ['Должно начинаться с заглавной буквы и может содержать дефис'];
        } else {
          delete newErrors[name];
        }
        break;
        
      case 'middle_name':
        if (value && !/^[А-ЯЁ][а-яё-]*$/.test(value)) {
          newErrors[name] = ['Должно начинаться с заглавной буквы и может содержать дефис'];
        } else {
          delete newErrors[name];
        }
        break;
        
      case 'email':
        if (!value.trim()) {
          newErrors.email = ['Это поле обязательно'];
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = ['Введите корректный email'];
        } else {
          delete newErrors.email;
        }
        break;
        
      case 'phone':
        if (!value.trim()) {
          newErrors.phone = ['Это поле обязательно'];
        } else if (!/^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test(value)) {
          newErrors.phone = ['Формат: +7(999)123-45-67'];
        } else {
          delete newErrors.phone;
        }
        break;
        
      case 'password':
        if (!value.trim()) {
          newErrors.password = ['Это поле обязательно'];
        } else if (value.length < 8) {
          newErrors.password = ['Минимум 8 символов'];
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          newErrors.password = ['Нужна заглавная буква, цифра и строчная буква'];
        } else {
          delete newErrors.password;
        }
        break;
        
      case 'password_confirmation':
        if (!value.trim()) {
          newErrors.password_confirmation = ['Это поле обязательно'];
        } else if (value !== formData.password) {
          newErrors.password_confirmation = ['Пароли не совпадают'];
        } else {
          delete newErrors.password_confirmation;
        }
        break;
    }
    
    setErrors(newErrors);
    return !newErrors[name];
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    if (id in formData) {
      validateField(id, value);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const requiredFields = ['first_name', 'last_name', 'email', 'phone', 'password', 'password_confirmation'];
    
    requiredFields.forEach(field => {
      if (!formData[field]?.trim()) {
        setErrors(prev => ({
          ...prev,
          [field]: ['Это поле обязательно']
        }));
        isValid = false;
      } else {
        validateField(field, formData[field]);
      }
    });
    
    return isValid && Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    setSuccessMessage('');

    // Имитация отправки формы
    setTimeout(() => {
      console.log('Форма отправлена:', formData);
      setIsLoading(false);
      setSuccessMessage('Регистрация прошла успешно!');
      
      
      navigate('/user_profile');
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Регистрация</h1>
        <p className="text-gray-500 mt-2">Создайте новый аккаунт</p>
      </div>

      {errors.general && (
        <div className="text-red-500 text-center text-sm">
          {errors.general[0]}
        </div>
      )}

      {successMessage && (
        <div className="text-green-500 text-center text-sm">
          {successMessage}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first_name">Имя*</Label>
            <Input 
              id="first_name" 
              placeholder="Иван" 
              required 
              value={formData.first_name}
              onChange={handleChange}
              onBlur={() => validateField('first_name', formData.first_name)}
            />
            {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="last_name">Фамилия*</Label>
            <Input 
              id="last_name" 
              placeholder="Иванов" 
              required 
              value={formData.last_name}
              onChange={handleChange}
              onBlur={() => validateField('last_name', formData.last_name)}
            />
            {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name[0]}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="middle_name">Отчество</Label>
          <Input 
            id="middle_name" 
            placeholder="Иванович" 
            value={formData.middle_name}
            onChange={handleChange}
            onBlur={() => validateField('middle_name', formData.middle_name)}
          />
          {errors.middle_name && <p className="text-red-500 text-sm">{errors.middle_name[0]}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email*</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="ivan@example.com" 
            required 
            value={formData.email}
            onChange={handleChange}
            onBlur={() => validateField('email', formData.email)}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email[0]}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Телефон*</Label>
          <Input 
            id="phone" 
            type="tel" 
            placeholder="+7(999)123-45-67" 
            required
            value={formData.phone}
            onChange={handlePhoneChange}
            onBlur={() => validateField('phone', formData.phone)}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone[0]}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Пароль*</Label>
          <Input 
            id="password" 
            type="password" 
            required 
            value={formData.password}
            onChange={handleChange}
            onBlur={() => validateField('password', formData.password)}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password[0]}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password_confirmation">Повторите пароль*</Label>
          <Input 
            id="password_confirmation" 
            type="password" 
            required 
            value={formData.password_confirmation}
            onChange={handleChange}
            onBlur={() => validateField('password_confirmation', formData.password_confirmation)}
          />
          {errors.password_confirmation && <p className="text-red-500 text-sm">{errors.password_confirmation[0]}</p>}
        </div>

        <Button 
          type="submit" 
          className="w-full bg-dust_pink/10 hover:bg-dust_pink/30"
          disabled={isLoading || Object.keys(errors).length > 0}
        >
          {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
        </Button>
      </form>

      <div className="text-center text-sm">
        Уже есть аккаунт?{" "}
        <button
          type="button"
          onClick={() => onSwitchForm("login")}
          className="font-medium text-blue-600 hover:underline"
        >
          Войти
        </button>
      </div>
    </div>
  );
}