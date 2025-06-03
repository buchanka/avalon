import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowLeft, Heart } from 'lucide-react';
import { Card } from '../components/ui/card';
import pink from '../assets/images/third block/pink.webp';
import purple from '../assets/images/third block/purple.jpg';
import blue from '../assets/images/third block/blue.jpg';
import cocoa from '../assets/images/third block/cocoa.jpg';
import { CardButtons } from '../components/CardButtons';

const productData = [
  { 
    id: 0,
    name: "pink",
    price: "585 руб.",
    image: pink,
    isFavorite: true
  },
  { 
    id: 1,
    name: "purple",
    price: "345 руб",
    image: purple,
    isFavorite: true
  },
  { 
    id: 2,
    name: "blue",
    price: "567 руб.",
    image: blue,
    isFavorite: false
  },
  { 
    id: 3,
    name: "cocoa",
    price: "776 руб.",
    image: cocoa,
    isFavorite: false
  }
];

export default function Favorites() {
  const [products, setProducts] = useState(productData);

  const toggleFavorite = (productId) => {
    setProducts(prev => prev.map(item => 
      item.id === productId ? {...item, isFavorite: !item.isFavorite} : item
    ));
  };

  const favoriteItems = products.filter(item => item.isFavorite);

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-4 mb-6">
        <Heart className="w-8 h-8 fill-red-500 text-red-500" />
        <h1 className="text-2xl font-bold">Избранное</h1>
      </div>

      {favoriteItems.length > 0 ? (
        <section>
          <div className="py-4 max-w-[1300px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 px-4">
              {favoriteItems.map((item) => (
                <div key={item.id} className="h-full p-4 min-w-[250px] group">
                  <div className="flex flex-col h-full">
                    <div className="relative mx-auto w-full min-h-[250px] min-w-[250px] max-w-[320px] overflow-hidden rounded-lg">
                      <img
                        src={item.image}
                        loading="lazy"
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg transform hover:scale-110 transition-transform duration-300"
                      />
                      <button 
                        onClick={() => toggleFavorite(item.id)}
                        className="absolute top-2 right-2 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all duration-200 group-hover:opacity-100 focus:outline-none"
                        aria-label={item.isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
                      >
                        <Heart 
                          className={`h-5 w-5 ${item.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'}`}
                        />
                      </button>
                    </div>
                    <div className="flex flex-col flex-grow justify-between mt-2">
                      <div className='text-center'>
                        <h4 className="font-montserrat italic text-black font-medium">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {item.price}
                        </p>
                      </div>
                      <div className="mt-1 space-y-2">
                        <Link 
                          to="/product_card" 
                          className="block text-center text-black hover:text-gray-600 transition-colors text-sm underline"
                        >
                          Подробнее
                        </Link>
                        <div className="flex justify-center">
                          <CardButtons />
                        </div>
                      </div>
                    </div>
                  </div>         
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <Card className="p-8 text-center">
          <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-medium mb-2">В избранном пока пусто</h3>
          <p className="text-gray-500 mb-6">Добавляйте товары в избранное, чтобы не потерять</p>
          <Button asChild>
            <Link to="/catalog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Перейти в каталог
            </Link>
          </Button>
        </Card>
      )}
    </div>
  );
}