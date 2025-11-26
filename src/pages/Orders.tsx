import { useState, useEffect } from 'react';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Search, Filter, ExternalLink } from 'lucide-react';
import { dataService } from '@/lib/dataService';
import { Order } from '@/types';

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);

  // Load orders from data service
  useEffect(() => {
    setOrders(dataService.getOrders());
  }, []);

  // Listen for storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setOrders(dataService.getOrders());
    };

    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(() => {
      setOrders(dataService.getOrders());
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const filteredOrders = orders.filter(
    (order) =>
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.merchantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusCounts = {
    pending: orders.filter((o) => o.status === 'pending').length,
    processing: orders.filter((o) => o.status === 'processing').length,
    shipped: orders.filter((o) => o.status === 'shipped').length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Order Tracking</h1>
        <p className="text-muted-foreground">Monitor and manage order fulfillment</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {Object.entries(statusCounts).map(([status, count]) => (
          <Card key={status}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium capitalize">{status}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{count}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Orders</CardTitle>
              <CardDescription>Track order status and fulfillment</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Merchant</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.orderId}</TableCell>
                  <TableCell>{order.merchantName}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>₹{order.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <StatusBadge status={order.status} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <StatusBadge status={order.paymentStatus} />
                    </div>
                  </TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
