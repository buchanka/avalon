import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import first from '../assets/images/second block/first.jpg';
import second from '../assets/images/second block/second.jpg';
import third from '../assets/images/second block/third.jpg';
import fourth from '../assets/images/second block/fourth.jpg';
import fifth from '../assets/images/second block/fifth.jpg';
import './SwiperStyles.css';
import Animation from './Animation';

const images = [first, second, third, fourth, fifth];
const imageNames = ["Фигурные свечи", "Ароматизированные свечи", "Лимитированные коллекции", "Наборы свечей", "Материалы для свечей"];

function SecondBlock() {
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
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="h-full p-4">
                <div className="relative mx-auto w-full min-h-[250px] min-w-[250px] max-w-[320px] overflow-hidden rounded-lg group">
                  <Animation>
                    <img
                      src={image}
                      loading="lazy"
                      alt={imageNames[index]}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </Animation>
                  <div className="absolute inset-0 flex flex-col justify-center items-center z-10 pointer-events-none">
                    <h2 className="inline-block break-words whitespace-pre-wrap text-white font-montserrat text-xl md:text-2xl font-medium italic text-center px-4 py-2 bg-slate-400 bg-opacity-50 rounded-lg">
                      {imageNames[index]}
                    </h2>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
}

export default SecondBlock;

