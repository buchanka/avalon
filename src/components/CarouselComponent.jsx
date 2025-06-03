import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade'; 
import slider1 from "../assets/images/slider/slider1.jpg";
import slider2 from "../assets/images/slider/slider2.jpg";
import slider3 from "../assets/images/slider/slider3.webp";
import './SwiperStyles.css'; 
import 'swiper/css/autoplay';
import { Link } from 'react-router-dom';


const slides = [
  { 
    image: slider1, 
    title: "Уют каждый день", 
    text: "Ароматные свечи, чтобы порадовать себя и тех, кто дорог",
    buttonText: "Каталог" 
  },
  { image:slider2, 
    title:"Уютный дом каждый день.",
    text: "Ароматы для дома и праздника.",
    buttonText: "Каталог"
},
{ image:slider3, 
  title:"Уникальный ассортимент.",
  text: "Только авторские модели наших художников.",
  buttonText: "Каталог"
}
];

function CarouselComponent() {
  return (
    <section className='slider-section relative p-4'>
      
      <Swiper
        modules={[Navigation, EffectFade, Autoplay]} 
        navigation={true}
        loop={true}
        autoplay={{delay: 3000}}
        effect="fade"
        speed={800} 
        className="mySwiper arrow-white rounded-xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img src={slide.image} alt={`Slide ${index + 1}`} loading="lazy" className="w-full h-[600px] object-cover rounded-xl"/>
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='p-10 bg-white bg-opacity-80 rounded-lg text-black sm:w-[80%]'>
                <div className="flex justify-center items-center py-2">
                  <Link to="/catalog">
                    <button className="bg-black font-extralight px-8 py-3 font-montserrat text-white text-2xl">
                      {slide.buttonText} 
                    </button>
                  </Link>
                </div>
                <h1 className='font-montserrat text-3xl text-black text-center mb-4'>
                  {slide.title}
                </h1>
                <p className='font-montserrat text-2xl font-bold text-center'>
                  {slide.text}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
           {slides.map((s, i) => (
            <div
             key={i}
             className={`rounded-full w-3 h-3 cursor-pointer transition-colors duration-300 ${
               i === i ? "bg-white" : "bg-gray-500"
              }`}

           />
         ))}
         </div>
      </Swiper> 
     </section>
   );
}

export default CarouselComponent;






