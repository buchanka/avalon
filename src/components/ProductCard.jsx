import React from 'react';
import { FaHeart, FaShare, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CollectionBadges from './CollectionBadges';
import { CardButtons } from './CardButtons';
import { ProductAccordion } from './ProductAccordion';

export const ProductCard = () => {
  return (
    <div className="max-w-6xl mx-auto p-2 my-12 sm:p-8 bg-white rounded-lg shadow-md relative">
      {/* Название товара */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-6 order-1">Название товара</h2>

      <div className="flex flex-col md:flex-row md:gap-6">
        {/* Левая часть (фото и аккордеон) */}
        <div className="w-full md:w-1/2 flex flex-col order-3 md:order-1">
          <div className="bg-gray-200 rounded-lg overflow-hidden aspect-square flex items-center justify-center m-4">
            <p className="text-gray-500">Изображение товара</p>
          </div>

          {/* Аккордеон только на мобильных */}
          <div className="mt-4 md:hidden">
            <ProductAccordion />
          </div>
        </div>

        {/* Правая часть (вся информация) */}
        <div className="w-full md:w-1/2 flex flex-col gap-4 order-2 md:order-2">

          {/* Цена и кнопки на мобильных */}
          <div className="md:hidden order-2">
            <div className="flex justify-between items-start mb-2">
              <div className="text-3xl font-bold text-gray-800">4 990 ₽</div>
              <div className="p-2">
                <CardButtons />
              </div>
            </div>
          </div>

          {/* Кнопки "избранное" и "поделиться" */}
          <div className="flex gap-4 mb-2 order-4">
            <button className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100">
              <FaHeart className="h-5 w-5" />
              <span>В избранное</span>
            </button>
            <button className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100">
              <FaShare className="h-5 w-5" />
              <span>Поделиться</span>
            </button>
          </div>

          {/* Характеристики на мобильных */}
          <div className="grid grid-cols-2 gap-2 text-gray-700 md:hidden order-5">
            <div><span className="font-medium">Высота:</span> 15 см</div>
            <div><span className="font-medium">Длина:</span> 10 см</div>
            <div><span className="font-medium">Ширина:</span> 10 см</div>
            <div><span className="font-medium">Вес:</span> 450 г</div>
            <div className="col-span-2"><span className="font-medium">Время горения:</span> 40 часов</div>
          </div>

          {/* Блок "в коллекциях" */}
          <div className="order-6">
            <h3 className="text-lg font-medium text-gray-800 mb-2">В коллекциях:</h3>
            <CollectionBadges />
          </div>

          {/* Десктопная версия — цена, характеристики, кнопки */}
          <div className="hidden md:flex flex-col md:flex-row gap-6 order-7">
            <div className="flex-1">
              <div className="text-3xl font-bold text-gray-800 mb-2">4 990 ₽</div>
              <div className="space-y-2 text-gray-700">
                <div><span className="font-medium">Высота:</span> 15 см</div>
                <div><span className="font-medium">Длина:</span> 10 см</div>
                <div><span className="font-medium">Ширина:</span> 10 см</div>
                <div><span className="font-medium">Вес:</span> 450 г</div>
                <div><span className="font-medium">Время горения:</span> 40 часов</div>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-start">
              <div className="p-2">
                <CardButtons />
              </div>
            </div>
          </div>

          {/* Аккордеон для десктопа */}
          <div className="hidden md:block mt-4 order-8">
            <ProductAccordion />
          </div>
        </div>
      </div>

      {/* Кнопка "Назад" */}
      <div className="mt-6 flex justify-start">
        <Link 
          to="/catalog" 
          className="text-black bg-dust_pink bg-opacity-50 flex items-center gap-2 hover:bg-dust_pink transition-colors px-3 py-2 rounded hover:text-white text-sm sm:text-base"
        >
          <FaArrowLeft className="h-4 w-4" />
          <span>Назад</span>
        </Link>
      </div>
    </div>
  );
};
