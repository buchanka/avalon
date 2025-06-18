import React, { useState } from 'react';
import api from '../services/api';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function UploadAvatar({ onAvatarUpdate }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (file) => {
  const formData = new FormData();
  formData.append('avatar', file);
  setLoading(true);

  try {
    const response = await api.post('/customer/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (response.data.url) {
      // Принудительное обновление с уникальным параметром
      const newUrl = `${response.data.url}?force=${Date.now()}`;
      
      // Создаём новое изображение для предзагрузки
      const img = new Image();
      img.src = newUrl;
      img.onload = () => {
        // Двойное обновление для гарантии
        onAvatarUpdate('');
        setTimeout(() => onAvatarUpdate(newUrl), 100);
      };
      img.onerror = () => console.error('Image load error');
    }
  } catch (error) {
    console.error('Ошибка при загрузке аватара:', error);
  } finally {
    setLoading(false);
    setFile(null);
  }
};

  return (
    <div className="space-y-3">
      <Input type="file" accept="image/*" onChange={handleFileChange} />
      <Button onClick={() => handleUpload(file)} disabled={loading || !file}>
        {loading ? 'Загрузка...' : 'Загрузить аватар'}
      </Button>
    </div>
  );
}
