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
import { Search, Filter, MessageSquare, Undo2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { dataService } from '@/lib/dataService';
import { Ticket } from '@/types';

const Tickets = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load tickets from data service
  useEffect(() => {
    setTickets(dataService.getTickets());
  }, []);

  // Listen for storage changes (when other tabs/users make changes)
  useEffect(() => {
    const handleStorageChange = () => {
      setTickets(dataService.getTickets());
    };

    window.addEventListener('storage', handleStorageChange);
    // Also check periodically for changes (for same-tab updates)
    const interval = setInterval(() => {
      setTickets(dataService.getTickets());
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.ticketId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.merchantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssign = (id: string) => {
    const updated = dataService.updateTicket(id, {
      assignedTo: user?.name,
      status: 'in_progress',
    });
    setTickets(updated);
    toast.success('Ticket assigned to you');
  };

  const handleResolve = (id: string) => {
    const updated = dataService.updateTicket(id, {
      status: 'resolved',
    });
    setTickets(updated);
    toast.success('Ticket marked as resolved');
  };

  const handleClose = (id: string) => {
    const updated = dataService.updateTicket(id, {
      status: 'closed',
    });
    setTickets(updated);
    toast.success('Ticket closed');
  };

  const handleUndo = () => {
    const result = dataService.undoLastAction();
    if (result.success) {
      setTickets(dataService.getTickets());
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-destructive text-destructive-foreground';
      case 'high':
        return 'bg-warning text-warning-foreground';
      case 'medium':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Support Tickets</h1>
        <p className="text-muted-foreground">Manage merchant support requests</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {['open', 'in_progress', 'resolved', 'closed'].map((status) => (
          <Card key={status}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium capitalize">{status.replace('_', ' ')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {tickets.filter((t) => t.status === status).length}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Tickets</CardTitle>
              <CardDescription>View and manage support tickets</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tickets..."
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
                <TableHead>Ticket ID</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Merchant</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead className="text-right w-[240px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium font-mono text-sm">{ticket.ticketId}</TableCell>
                  <TableCell className="max-w-xs truncate">{ticket.subject}</TableCell>
                  <TableCell>{ticket.merchantName}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {ticket.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <StatusBadge status={ticket.status} />
                    </div>
                  </TableCell>
                  <TableCell>{ticket.assignedTo || 'Unassigned'}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2 flex-wrap">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      {!ticket.assignedTo && ticket.status === 'open' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 min-w-[110px]"
                          onClick={() => handleAssign(ticket.id)}
                        >
                          Assign to Me
                        </Button>
                      )}
                      {ticket.status === 'in_progress' && ticket.assignedTo === user?.name && (
                        <>
                          <Button 
                            variant="default" 
                            size="sm" 
                            className="h-8 min-w-[90px]"
                            onClick={() => handleResolve(ticket.id)}
                          >
                            Resolve
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 min-w-[80px]"
                            onClick={() => handleClose(ticket.id)}
                          >
                            Close
                          </Button>
                        </>
                      )}
                      {ticket.status === 'resolved' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 min-w-[80px]"
                          onClick={() => handleClose(ticket.id)}
                        >
                          Close
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

export default Tickets;
