import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import api from '../services/api';
import './SwiperStyles.css';
import Animation from './Animation';

const placeholderImages = [
  'https://storage.yandexcloud.net/new-test-bucket-123/collections/collection1.jpg',
  'https://storage.yandexcloud.net/new-test-bucket-123/collections/collection2.webp',
  'https://storage.yandexcloud.net/new-test-bucket-123/collections/collection3.jpg',
  'https://storage.yandexcloud.net/new-test-bucket-123/collections/collection4.jpg',
  'https://storage.yandexcloud.net/new-test-bucket-123/collections/collection5.jpg',
  'https://storage.yandexcloud.net/new-test-bucket-123/collections/collection6.jpg',
];

function TileOfCollections() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await api.get('/collections');
        setCollections(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Error fetching collections:', err);
      }
    };

    fetchCollections();
  }, []);

  if (loading) return <div className="text-center py-8">Загрузка коллекций...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Ошибка загрузки: {error}</div>;
  if (collections.length === 0) return <div className="text-center py-8">Коллекции не найдены</div>;

  return (
    <section>
      <h3 className="text-center text-black text-2xl font-montserrat font-normal pt-7 pb-2">
        Коллекции свечей
      </h3>
      <div className="py-4">
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
          {collections.map((collection, index) => (  
            <SwiperSlide key={collection.id}>
              <div className="h-full p-4">
                <div className="relative mx-auto w-full min-h-[250px] min-w-[250px] max-w-[320px] overflow-hidden rounded-lg">
                  <Animation>
                    <img
                      src={collection.imageUrl || placeholderImages[index % placeholderImages.length]}
                      loading="lazy"
                      alt={collection.name}  
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </Animation>
                  <div className='absolute inset-0 flex flex-col justify-center items-center z-10 pointer-events-none'>
                    <h4 className="inline-block break-words whitespace-pre-wrap text-white font-montserrat text-xl md:text-2xl font-medium italic text-center px-4 py-2 bg-slate-400 bg-opacity-50 rounded-lg">
                      {collection.name}
                    </h4>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default TileOfCollections;

