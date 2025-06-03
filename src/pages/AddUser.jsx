import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";


export default function DashProducts() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Управление пользователями</h1>
      
      {/* Форма добавления товара */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Добавить нового пользователя</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">Имя пользователя</Label>
              <Input id="first_name" placeholder="Иван" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="last_name">Фамилия</Label>
              <Input id="last_name" placeholder="Иванов" />
            </div>
          
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="ivan45@gmail.com" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Фото профиля</Label>
            <Input id="image" type="file" />
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline">Отмена</Button>
            <Button type="submit">Сохранить пользователя</Button>
          </div>
        </form>
      </div>
      
      {/* Таблица существующих пользователей */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Список пользователей</h2>
        {/* Здесь будет ваша таблица пользователей */}
      </div>
    </div>
  );
}