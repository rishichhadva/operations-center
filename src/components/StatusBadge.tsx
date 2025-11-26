import { Badge } from '@/components/ui/badge';

type StatusType =
  | 'pending'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'paid'
  | 'failed'
  | 'refunded'
  | 'settled'
  | 'disputed'
  | 'open'
  | 'in_progress'
  | 'resolved'
  | 'closed';

interface StatusBadgeProps {
  status: StatusType;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getVariant = (status: StatusType) => {
    switch (status) {
      case 'approved':
      case 'delivered':
      case 'paid':
      case 'settled':
      case 'resolved':
      case 'closed':
        return 'default';
      case 'pending':
      case 'under_review':
      case 'processing':
      case 'open':
        return 'secondary';
      case 'shipped':
      case 'in_progress':
        return 'outline';
      case 'rejected':
      case 'cancelled':
      case 'failed':
        return 'destructive';
      case 'refunded':
      case 'disputed':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <Badge 
      variant={getVariant(status)} 
      className="capitalize whitespace-nowrap"
    >
      {status.replace('_', ' ')}
    </Badge>
  );
};
