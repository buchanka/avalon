import React, {useState} from "react";
import cocoa from "../assets/images/reviews/cocoa.jpg";
import blue from "../assets/images/reviews/blue.jpg";
import golden from "../assets/images/reviews/golden.jpg";
import avatar from "../assets/images/reviews/avatar/avatar.png";
import fourStars from "../assets/images/reviews/rating/fourStars.png";
import fiveStars from "../assets/images/reviews/rating/fiveStars.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './SwiperStyles.css';

function Reviews() {
    const [ExpandedReviews, setExpandedReviews] = useState([]);

    const handleExpand = (index) => {
        setExpandedReviews(prevExpanded => {
            const newExpanded = [...prevExpanded];
            newExpanded[index] = !newExpanded[index]; 
            return newExpanded;
        });
    };

    const reviews = [
        {avatar: avatar, nick: "Имя 1", text: "Текст отзыва 1...", image: cocoa, productName: "Название свечи 1", price: "568 руб.", rating: fourStars},
        {avatar: avatar, nick: "Имя 2", text: "Текст отзыва 2...", image: blue, productName: "Название свечи 2", price: "568 руб.", rating: fiveStars},
        {avatar: avatar, nick: "Имя 3", text: "Текст отзыва 3...", image: golden, productName: "Название свечи 3", price: "568 руб.", rating: fourStars},
        {avatar: avatar, nick: "Имя 4", text: "Текст отзыва 4...", image: golden, productName: "Название свечи 4", price: "568 руб.", rating: fourStars},
        {avatar: avatar, nick: "Имя 5", text: "Текст отзыва 5...", image: golden, productName: "Название свечи 5", price: "568 руб.", rating: fiveStars},
    ]


    return (
        <section>
            <h5 className="text-center text-black text-2xl font-montserrat font-normal pt-1 mt-6">Отзывы о нас</h5>
            <div className="bg-custom_gradient3 backdrop-blur-2xl rounded m-6 p-5 relative">
            <div className="swiper-container-wrapper">
                <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    spaceBetween={20} 
                    centeredSlides={false}
                    className="mySwiper max-w-[1300px] mx-auto "
                    breakpoints={{
                            0: {                 
                            slidesPerView: 1,
                            centeredSlides: true,
                            },
                            640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                            centeredSlides: false,
                            },
                            768: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                            centeredSlides: false,
                            },
                            1024: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                            },
                          }}
                        >
                  {reviews.map((review, index) => (
                    <SwiperSlide key={index}>
                    <div className="flex justify-center">
                        <div className="bg-white/60 w-80 h-96 rounded-md flex flex-col justify-between md:min-w-[200px]">
                            <div className="flex items-center justify-center mt-4">
                                <img className="w-22 h-8" src={review.rating} loading="lazy" alt={review.productName}/>
                            </div>
                            <div className="flex flex-row p-4 space-x-2">
                                <img className="size-12" src={review.avatar} loading="lazy" alt={`Avatar ${review.nick}`}/>
                                <p className="text-black font-montserrat font-medium self-center">{review.nick}</p>
                            </div>
                            <p className={`text-xl text-center text-black text-ellipsis font-montserrat break-words hyphens-auto ${ExpandedReviews[index] ? '' : 'line-clamp-1'}`}>
                                {review.text}
                            </p>
                            <p 
                                onClick={() => handleExpand(index)}
                                className="font-extralight font-montserrat cursor-pointer text-center"
                            >
                                {ExpandedReviews[index] ? 'свернуть' : 'развернуть'}
                            </p>
                            <div className="flex flex-row">
                                <img className="size-20 self-start p-2 rounded-xl" src={review.image} loading="lazy" alt={review.productName} />
                                <div className="flex flex-col justify-center">
                                    <p className="font-montserrat text-black text-base">{review.productName}</p>
                                    <p className="font-montserrat text-black text-base">{review.price}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                </div>
            </div>
        </section>
    );
}

export default Reviews;

