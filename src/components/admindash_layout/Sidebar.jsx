import { Link } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, User, Users } from "lucide-react";
import { Card } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Sidebar() {
  return (
    <div className="hidden border-r bg-muted/40 md:block w-64 fixed h-screen">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <h1 className="text-xl font-semibold">Админ</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin_dash" className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted">
            <LayoutDashboard className="w-5 h-5" /> Дашборд
          </Link>
          <Link to="/admin_dash/products" className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted">
            <Package className="w-5 h-5" /> Товары
          </Link>
          <Link to="/admin_dash/orders" className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted">
            <ShoppingCart className="w-5 h-5" /> Заказы
          </Link>
          <Link to="/admin_dash/users" className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted">
            <Users className="w-5 h-5" /> Пользователи
          </Link>
        </nav>

        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Card className="p-5 my-8 hover:bg-muted transition-colors cursor-pointer">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span className="text-sm">Вход для админа</span>
            </div>
          </Card>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Профиль</DropdownMenuItem>
          <DropdownMenuItem>Выйти</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
    </div>
  );
}