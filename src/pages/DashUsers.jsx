import React from 'react';
import { Button } from "../components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../components/ui/table";
import { Link } from "react-router-dom";

function DashUsers(){
    const users = [
    { id: 1, first_name: "Иван", last_name: "Иванов", email: "ivan@ex.com" },
    { id: 2, first_name: "Павел", last_name: "Плюшкин", email: "pavlik455@ex.com" },
    ];
    return(
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Пользователи</h2>
        <Link to="/admin_dash/add_user">
          <Button>Добавить пользователя</Button>
        </Link>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Имя</TableHead>
            <TableHead>Фамилия</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.first_name}</TableCell>
              <TableCell>{user.last_name}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default DashUsers