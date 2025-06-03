import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import Sidebar from "../components/admindash_layout/Sidebar";

export default function AdminDash() {
  return (
      <div> 
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Товары</CardTitle>
            </CardHeader>
            <CardContent>1234</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Заказы</CardTitle>
            </CardHeader>
            <CardContent>56</CardContent>
          </Card>
        </div>
      </div>
  );
}