export type UserRole = 'agent' | 'manager' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Merchant {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessType: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedBy?: string;
}

export interface Order {
  id: string;
  orderId: string;
  merchantName: string;
  customerName: string;
  amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  createdAt: string;
}

export interface Payment {
  id: string;
  transactionId: string;
  merchantName: string;
  amount: number;
  status: 'pending' | 'settled' | 'failed' | 'disputed';
  method: 'card' | 'upi' | 'netbanking' | 'wallet';
  date: string;
  reconciledBy?: string;
}

export interface Ticket {
  id: string;
  ticketId: string;
  subject: string;
  merchantName: string;
  category: 'technical' | 'billing' | 'onboarding' | 'general';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}
