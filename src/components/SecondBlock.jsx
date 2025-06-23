import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './SwiperStyles.css';
import Animation from './Animation';
import api from '../services/api';

const placeholderImages = [
  'https://storage.yandexcloud.net/new-test-bucket-123/categories/category1.jpg',
  'https://storage.yandexcloud.net/new-test-bucket-123/categories/category2.jpg',
  'https://storage.yandexcloud.net/new-test-bucket-123/categories/category3.jpg',
  'https://storage.yandexcloud.net/new-test-bucket-123/categories/category4.jpg',
  
];

function SecondBlock() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log('Отправка запроса на /categories'); 
        const response = await api.get('/categories'); 
        console.log('Ответ:', response.data); 
        
        if (response.data && Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          throw new Error('Некорректный формат данных');
        }
      } catch (err) {
        console.error('Ошибка:', err);
        setError(err.response?.data?.message || err.message || 'Ошибка загрузки');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);


  if (loading) {
    return <div className="text-center py-8">Загрузка категорий...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Ошибка: {error}</div>;
  }

  return (
    <div className="rounded-lg border-y border-momo py-4">
      <section className="py-4">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          spaceBetween={20}
          className="mySwiper max-w-[1300px] mx-auto"
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <SwiperSlide key={category.id || index}>
                <div className="h-full p-4">
                  <div className="relative mx-auto w-full min-h-[250px] min-w-[250px] max-w-[320px] overflow-hidden rounded-lg group">
                    <Animation>
                      <img
                        src={category.imageUrl || placeholderImages[index % placeholderImages.length]}
                        loading="lazy"
                        alt={category.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </Animation>
                    <div className="absolute inset-0 flex flex-col justify-center items-center z-10 pointer-events-none">
                      <h2 className="inline-block break-words whitespace-pre-wrap text-white font-montserrat text-xl md:text-2xl font-medium italic text-center px-4 py-2 bg-slate-400 bg-opacity-50 rounded-lg">
                        {category.name}
                      </h2>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <div className="text-center py-8 w-full">Категории не найдены</div>
          )}
        </Swiper>
      </section>
    </div>
  );
}

export default SecondBlock;
