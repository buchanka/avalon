import { FaSliders } from "react-icons/fa6";
import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

function FilterButton() {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => setIsOpen(!isOpen);

    return (
        <>
        <div className="inline-flex">
           <button 
            onClick={togglePopup} 
            aria-label="Фильтры" 
            className="h-10 md:h-10 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
        <FaSliders className="h-5 w-5 text-gray-700" />
        <span className="text-gray-700 font-medium">Фильтры</span>
        </button>
        </div>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div 
                        className="fixed inset-0 bg-black opacity-50" 
                        onClick={togglePopup}
                    ></div>
                    <div className="bg-white rounded-md shadow-lg p-4 z-50 w-[30%] min-h-[200px] relative">
                        <button 
                            onClick={togglePopup} 
                            className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 focus:outline-none"
                        >
                            <XMarkIcon className="h-6 w-6 text-gray-600 hover:text-gray-800" />
                        </button>
                        <div className='text-black font-montserrat text-xl font-normal text-center align-baseline p-2'>
                            <h1>Фильтры</h1>
                        </div>
                        {/* Пустое содержимое для фильтров */}
                        <div className="flex justify-center items-center mt-4 ">
                            <button className="flex items-center justify-center gap-2 bg-black border text-white font-montserrat p-2 w-32 h-10 hover:bg-gray-800 transition-colors">
                                <p>Применить</p>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default FilterButton;