import { FaPlus, FaMinus } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";

export const CardButtons = () => {
  return (
    <div className="flex items-center gap-2">
      <button className="flex items-center justify-center gap-2 bg-white border border-black text-black p-2 w-32 h-10 hover:bg-gray-100 transition-colors">
        <TiShoppingCart />
        <p>В корзину</p>
      </button>

      <button className="flex items-center justify-between bg-white border border-black text-black p-2 w-20 h-10 hover:bg-gray-100 transition-colors">
        <FaMinus className="text-xs" />
        <span>1</span>
        <FaPlus className="text-xs" />
      </button>
    </div>
  );
};