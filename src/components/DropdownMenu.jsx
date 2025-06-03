import './DropdownMenu.css';
import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown } from "react-icons/fa";
//компонент ссылки
import { Link } from "react-router-dom";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="dropdown relative" ref={dropdownRef}>
      <Link to="/catalog">
        <button
          className="font-montserrat menubutton text-black font-medium"
          onClick={() => setIsOpen(!isOpen)} 
        >
          Каталог <FaChevronDown className=""/>
        </button>
      </Link>
      {isOpen && (
        <div className="dropdown-options fixed z-10">
          <a className="font-montserrat" href="#">
            Фигурные свечи
          </a>
          <a className="font-montserrat" href="#">
            Лимитированные коллекции
          </a>
          <a className="font-montserrat" href="#">
            Ароматизированные свечи
          </a>
        </div>
      )}
    </div>
  );
}

export default Dropdown;



