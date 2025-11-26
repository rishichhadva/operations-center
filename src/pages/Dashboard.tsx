import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { StatCard } from '@/components/StatCard';
import { Users, ShoppingCart, CreditCard, HeadphonesIcon, TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/StatusBadge';
import { dataService } from '@/lib/dataService';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalMerchants: 0,
    pendingMerchants: 0,
    totalOrders: 0,
    activeOrders: 0,
    totalPayments: 0,
    pendingPayments: 0,
    openTickets: 0,
    urgentTickets: 0,
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    const updateStats = () => {
      const merchants = dataService.getMerchants();
      const orders = dataService.getOrders();
      const payments = dataService.getPayments();
      const tickets = dataService.getTickets();

      setStats({
        totalMerchants: merchants.length,
        pendingMerchants: merchants.filter((m) => m.status === 'pending').length,
        totalOrders: orders.length,
        activeOrders: orders.filter((o) => ['pending', 'processing', 'shipped'].includes(o.status)).length,
        totalPayments: payments.reduce((sum, p) => sum + p.amount, 0),
        pendingPayments: payments.filter((p) => p.status === 'pending').length,
        openTickets: tickets.filter((t) => ['open', 'in_progress'].includes(t.status)).length,
        urgentTickets: tickets.filter((t) => t.priority === 'urgent' && t.status !== 'closed').length,
      });

      const activity = [
        ...orders.slice(0, 2).map((o) => ({ type: 'order' as const, data: o })),
        ...tickets.slice(0, 2).map((t) => ({ type: 'ticket' as const, data: t })),
      ].sort((a, b) => new Date(b.data.createdAt).getTime() - new Date(a.data.createdAt).getTime());
      setRecentActivity(activity);
    };

    updateStats();
    const interval = setInterval(updateStats, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name}. Here's what's happening today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Merchants"
          value={stats.totalMerchants}
          icon={Users}
          trend={{ value: '12%', isPositive: true }}
          description={`${stats.pendingMerchants} pending review`}
        />
        <StatCard
          title="Active Orders"
          value={stats.activeOrders}
          icon={ShoppingCart}
          trend={{ value: '8%', isPositive: true }}
          description={`${stats.totalOrders} total orders`}
        />
        {(user?.role === 'manager' || user?.role === 'admin') && (
          <StatCard
            title="Payments"
            value={`₹${(stats.totalPayments / 1000).toFixed(1)}K`}
            icon={CreditCard}
            trend={{ value: '15%', isPositive: true }}
            description={`${stats.pendingPayments} pending reconciliation`}
          />
        )}
        <StatCard
          title="Support Tickets"
          value={stats.openTickets}
          icon={HeadphonesIcon}
          trend={{ value: '5%', isPositive: false }}
          description={`${stats.urgentTickets} urgent`}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Quick Stats
            </CardTitle>
            <CardDescription>Key metrics at a glance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Merchant Approval Rate</span>
              <span className="font-semibold">75%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Avg. Order Processing Time</span>
              <span className="font-semibold">2.4 hours</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Payment Success Rate</span>
              <span className="font-semibold">98.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Avg. Ticket Resolution Time</span>
              <span className="font-semibold">4.2 hours</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-warning" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((item, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                  {item.type === 'order' ? (
                    <ShoppingCart className="h-4 w-4 mt-1 text-primary" />
                  ) : (
                    <HeadphonesIcon className="h-4 w-4 mt-1 text-primary" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {item.type === 'order'
                        ? `New order ${item.data.orderId}`
                        : `Ticket ${item.data.ticketId}: ${item.data.subject}`}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.type === 'order'
                        ? `${item.data.merchantName} - ₹${item.data.amount}`
                        : item.data.merchantName}
                    </p>
                  </div>
                  <StatusBadge status={item.data.status as any} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
