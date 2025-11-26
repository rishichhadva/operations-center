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
import { Search, Filter, Eye, Undo2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { dataService } from '@/lib/dataService';
import { Merchant } from '@/types';

const Merchants = () => {
  const { user } = useAuth();
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load merchants from data service
  useEffect(() => {
    setMerchants(dataService.getMerchants());
  }, []);

  // Listen for storage changes (when other tabs/users make changes)
  useEffect(() => {
    const handleStorageChange = () => {
      setMerchants(dataService.getMerchants());
    };

    window.addEventListener('storage', handleStorageChange);
    // Also check periodically for changes (for same-tab updates)
    const interval = setInterval(() => {
      setMerchants(dataService.getMerchants());
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const filteredMerchants = merchants.filter(
    (merchant) =>
      merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      merchant.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusUpdate = (id: string, newStatus: 'approved' | 'rejected' | 'under_review') => {
    if (user?.role === 'agent') {
      toast.error('Only Managers and Admins can update merchant status');
      return;
    }

    const updated = dataService.updateMerchantStatus(id, newStatus, user?.name);
    setMerchants(updated);
    toast.success(`Merchant ${newStatus === 'approved' ? 'approved' : newStatus === 'rejected' ? 'rejected' : 'marked for review'}`);
  };

  const handleUndo = () => {
    const result = dataService.undoLastAction();
    if (result.success) {
      setMerchants(dataService.getMerchants());
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Merchant Onboarding</h1>
        <p className="text-muted-foreground">Review and approve merchant applications</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {['pending', 'under_review', 'approved', 'rejected'].map((status) => (
          <Card key={status}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium capitalize">{status.replace('_', ' ')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {merchants.filter((m) => m.status === status).length}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Merchant Applications</CardTitle>
              <CardDescription>Manage merchant onboarding requests</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search merchants..."
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
                <TableHead>Merchant Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Business Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Reviewed By</TableHead>
                <TableHead className="text-right w-[280px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMerchants.map((merchant) => (
                <TableRow key={merchant.id}>
                  <TableCell className="font-medium">{merchant.name}</TableCell>
                  <TableCell>{merchant.email}</TableCell>
                  <TableCell>{merchant.businessType}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <StatusBadge status={merchant.status} />
                    </div>
                  </TableCell>
                  <TableCell>{new Date(merchant.submittedAt).toLocaleDateString()}</TableCell>
                  <TableCell>{merchant.reviewedBy || '-'}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2 flex-wrap">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {merchant.status === 'pending' && (user?.role === 'manager' || user?.role === 'admin') && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 min-w-[80px]"
                            onClick={() => handleStatusUpdate(merchant.id, 'under_review')}
                          >
                            Review
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            className="h-8 min-w-[80px]"
                            onClick={() => handleStatusUpdate(merchant.id, 'approved')}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="h-8 min-w-[80px]"
                            onClick={() => handleStatusUpdate(merchant.id, 'rejected')}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                      {merchant.status === 'under_review' && (user?.role === 'manager' || user?.role === 'admin') && (
                        <>
                          <Button
                            variant="default"
                            size="sm"
                            className="h-8 min-w-[80px]"
                            onClick={() => handleStatusUpdate(merchant.id, 'approved')}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="h-8 min-w-[80px]"
                            onClick={() => handleStatusUpdate(merchant.id, 'rejected')}
                          >
                            Reject
                          </Button>
                        </>
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

export default Merchants;
