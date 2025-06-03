import { Button } from "../components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../components/ui/table";
import { Link } from "react-router-dom";
export default function DashProducts() {
  const products = [
    { id: 1, name: "Свеча 'Лотос'", price: 543, stock: 42 },
    { id: 2, name: "Свеча 'Череп'", price: 457, stock: 12 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Товары</h2>
        <Link to="/admin_dash/add_product">
          <Button>Добавить товар</Button>
        </Link>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Название</TableHead>
            <TableHead>Цена</TableHead>
            <TableHead>Остаток</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price} руб.</TableCell>
              <TableCell>{product.stock} шт.</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}