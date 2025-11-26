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
import { Badge } from '@/components/ui/badge';
import { Search, Filter, CheckCircle, XCircle, Undo2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { dataService } from '@/lib/dataService';
import { Payment } from '@/types';

const Payments = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load payments from data service
  useEffect(() => {
    setPayments(dataService.getPayments());
  }, []);

  // Listen for storage changes (when other tabs/users make changes)
  useEffect(() => {
    const handleStorageChange = () => {
      setPayments(dataService.getPayments());
    };

    window.addEventListener('storage', handleStorageChange);
    // Also check periodically for changes (for same-tab updates)
    const interval = setInterval(() => {
      setPayments(dataService.getPayments());
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const filteredPayments = payments.filter(
    (payment) =>
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.merchantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReconcile = (id: string, status: 'settled' | 'failed' | 'pending') => {
    const updated = dataService.updatePaymentStatus(id, status, user?.name);
    setPayments(updated);
    if (status === 'pending') {
      toast.success('Payment reset to pending');
    } else {
      toast.success(`Payment ${status === 'settled' ? 'reconciled' : 'marked as failed'}`);
    }
  };

  const handleUndo = () => {
    const result = dataService.undoLastAction();
    if (result.success) {
      setPayments(dataService.getPayments());
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
  const settledAmount = payments
    .filter((p) => p.status === 'settled')
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments
    .filter((p) => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payment Reconciliation</h1>
        <p className="text-muted-foreground">Manage and reconcile payment transactions</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(totalAmount / 1000).toFixed(1)}K</div>
            <p className="text-xs text-muted-foreground">{payments.length} transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Settled Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              ₹{(settledAmount / 1000).toFixed(1)}K
            </div>
            <p className="text-xs text-muted-foreground">
              {payments.filter((p) => p.status === 'settled').length} settled
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Pending Reconciliation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              ₹{(pendingAmount / 1000).toFixed(1)}K
            </div>
            <p className="text-xs text-muted-foreground">
              {payments.filter((p) => p.status === 'pending').length} pending
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Payment Transactions</CardTitle>
              <CardDescription>Review and reconcile payment records</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search payments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              {dataService.canUndo() && (
                <Button variant="outline" size="sm" onClick={handleUndo}>
                  <Undo2 className="h-4 w-4 mr-2" />
                  Undo
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Merchant</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Reconciled By</TableHead>
                <TableHead className="text-right w-[200px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium font-mono text-sm">
                    {payment.transactionId}
                  </TableCell>
                  <TableCell>{payment.merchantName}</TableCell>
                  <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {payment.method}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <StatusBadge status={payment.status} />
                    </div>
                  </TableCell>
                  <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                  <TableCell>{payment.reconciledBy || '-'}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2 flex-wrap">
                      {payment.status === 'pending' && (
                        <>
                          <Button
                            variant="default"
                            size="sm"
                            className="h-8 min-w-[90px]"
                            onClick={() => handleReconcile(payment.id, 'settled')}
                          >
                            <CheckCircle className="h-4 w-4 mr-1.5" />
                            Settle
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="h-8 min-w-[90px]"
                            onClick={() => handleReconcile(payment.id, 'failed')}
                          >
                            <XCircle className="h-4 w-4 mr-1.5" />
                            Fail
                          </Button>
                        </>
                      )}
                      {(payment.status === 'settled' || payment.status === 'failed') && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 min-w-[80px]"
                          onClick={() => handleReconcile(payment.id, 'pending')}
                        >
                          Reset
                        </Button>
                      )}
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

export default Payments;
