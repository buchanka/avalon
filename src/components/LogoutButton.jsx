import { useNavigate } from "react-router-dom";
import { useState } from "react"; 

export default function LogoutButton() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setIsLoading(true);
    console.log('Пользователь вышел');
    setIsLoading(false);
    navigate("/"); 
  };

  return (
    <button 
      onClick={handleLogout}
      disabled={isLoading}
      className={`px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ${isLoading ? 'opacity-50' : ''}`}
    >
      {isLoading ? 'Выход...' : 'Выйти'}
    </button>
  );
}