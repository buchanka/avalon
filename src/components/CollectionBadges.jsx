import React from "react";

function CollectionBadges() {
  return (
    <div className="flex flex-wrap gap-3">
      <button className="flex items-center justify-center text-black bg-cornflower_blue bg-opacity-40 min-w-[140px] px-4 h-10 rounded-3xl font-montserrat font-light hover:bg-cornflower_blue transition-colors hover:text-white">
        Бестселлеры
      </button>

      <button className="flex items-center justify-center text-black bg-dust_pink bg-opacity-50 min-w-[140px] px-4 h-10 rounded-3xl font-montserrat font-light hover:bg-dust_pink transition-colors hover:text-white">
        Фигурные свечи
      </button>

      <button className="flex items-center justify-center text-black bg-plum bg-opacity-50 min-w-[180px] px-4 h-10 rounded-3xl font-montserrat font-light hover:bg-plum transition-colors hover:text-white">
        Лимитированные коллекции
      </button>

      <button className="flex items-center justify-center text-black bg-purple bg-opacity-50 min-w-[140px] px-4 h-10 rounded-3xl font-montserrat font-light hover:bg-purple transition-colors hover:text-white">
        Наборы свечей
      </button>
    </div>
  );
}

export default CollectionBadges;
