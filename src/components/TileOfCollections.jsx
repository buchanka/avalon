import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import pink from '../assets/images/third block/pink.webp';
import purple from '../assets/images/third block/purple.jpg';
import blue from '../assets/images/third block/blue.jpg';
import cocoa from '../assets/images/third block/cocoa.jpg';
import golden from '../assets/images/third block/golden.jpg';
import white from '../assets/images/third block/white.jpg';
import './SwiperStyles.css';
import Animation from './Animation';

const images = [pink, purple, blue, cocoa, golden, white];
const imageNames = ["pink", "purple", "blue", "cocoa", "golden", "white"];

function TileOfCollections() {
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

          {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="h-full p-4">
              <div className="relative mx-auto w-full min-h-[250px] min-w-[250px] max-w-[320px] overflow-hidden rounded-lg">
              <Animation>
                <img
                  src={image}
                  loading="lazy"
                  alt={imageNames[index]}
                  className="w-full h-full object-cover rounded-lg transform hover:scale-110 transition-transform duration-300"
                />
                </Animation>
              </div>
                <div className='absolute inset-0 flex flex-col justify-center items-center z-10 pointer-events-none'>
                  <h4 className="inline-block break-words whitespace-pre-wrap text-white font-montserrat text-xl md:text-2xl font-medium italic text-center px-4 py-2 bg-slate-400 bg-opacity-50 rounded-lg">
                    {imageNames[index]}
                  </h4>
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

