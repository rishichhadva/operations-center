import { Merchant, Order, Payment, Ticket } from '@/types';
import { mockMerchants, mockOrders, mockPayments, mockTickets } from './mockData';

// History entry for undo functionality
interface HistoryEntry<T> {
  type: 'merchant' | 'payment' | 'ticket' | 'order';
  action: string;
  itemId: string;
  previousState: T;
  timestamp: string;
}

class DataService {
  private readonly MERCHANTS_KEY = 'operations_merchants';
  private readonly PAYMENTS_KEY = 'operations_payments';
  private readonly TICKETS_KEY = 'operations_tickets';
  private readonly ORDERS_KEY = 'operations_orders';
  private readonly HISTORY_KEY = 'operations_history';
  private readonly MAX_HISTORY = 50;

  // Initialize data from localStorage or use mock data
  private initializeData<T>(key: string, mockData: T[]): T[] {
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return mockData;
      }
    }
    return mockData;
  }

  // Get merchants
  getMerchants(): Merchant[] {
    return this.initializeData(this.MERCHANTS_KEY, mockMerchants);
  }

  // Get payments
  getPayments(): Payment[] {
    return this.initializeData(this.PAYMENTS_KEY, mockPayments);
  }

  // Get tickets
  getTickets(): Ticket[] {
    return this.initializeData(this.TICKETS_KEY, mockTickets);
  }

  // Get orders
  getOrders(): Order[] {
    return this.initializeData(this.ORDERS_KEY, mockOrders);
  }

  // Save merchants
  private saveMerchants(merchants: Merchant[]) {
    localStorage.setItem(this.MERCHANTS_KEY, JSON.stringify(merchants));
  }

  // Save payments
  private savePayments(payments: Payment[]) {
    localStorage.setItem(this.PAYMENTS_KEY, JSON.stringify(payments));
  }

  // Save tickets
  private saveTickets(tickets: Ticket[]) {
    localStorage.setItem(this.TICKETS_KEY, JSON.stringify(tickets));
  }

  // Save orders
  private saveOrders(orders: Order[]) {
    localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));
  }

  // Add to history for undo
  private addToHistory<T>(entry: HistoryEntry<T>) {
    const history = this.getHistory();
    history.unshift(entry);
    // Keep only last MAX_HISTORY entries
    if (history.length > this.MAX_HISTORY) {
      history.splice(this.MAX_HISTORY);
    }
    localStorage.setItem(this.HISTORY_KEY, JSON.stringify(history));
  }

  // Get history
  getHistory(): HistoryEntry<any>[] {
    const stored = localStorage.getItem(this.HISTORY_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  }

  // Clear history
  clearHistory() {
    localStorage.removeItem(this.HISTORY_KEY);
  }

  // Update merchant status
  updateMerchantStatus(
    id: string,
    newStatus: 'pending' | 'under_review' | 'approved' | 'rejected',
    reviewedBy?: string
  ): Merchant[] {
    const merchants = this.getMerchants();
    const merchant = merchants.find((m) => m.id === id);
    
    if (!merchant) return merchants;

    // Save previous state for undo
    this.addToHistory<Merchant>({
      type: 'merchant',
      action: 'status_update',
      itemId: id,
      previousState: { ...merchant },
      timestamp: new Date().toISOString(),
    });

    // Update merchant
    const updated = merchants.map((m) =>
      m.id === id
        ? { ...m, status: newStatus, reviewedBy: reviewedBy || m.reviewedBy }
        : m
    );

    this.saveMerchants(updated);
    return updated;
  }

  // Update payment status
  updatePaymentStatus(
    id: string,
    newStatus: 'pending' | 'settled' | 'failed' | 'disputed',
    reconciledBy?: string
  ): Payment[] {
    const payments = this.getPayments();
    const payment = payments.find((p) => p.id === id);

    if (!payment) return payments;

    // Save previous state for undo
    this.addToHistory<Payment>({
      type: 'payment',
      action: 'status_update',
      itemId: id,
      previousState: { ...payment },
      timestamp: new Date().toISOString(),
    });

    // Update payment
    const updated = payments.map((p) =>
      p.id === id
        ? { ...p, status: newStatus, reconciledBy: reconciledBy || p.reconciledBy }
        : p
    );

    this.savePayments(updated);
    return updated;
  }

  // Update ticket
  updateTicket(
    id: string,
    updates: Partial<Ticket>
  ): Ticket[] {
    const tickets = this.getTickets();
    const ticket = tickets.find((t) => t.id === id);

    if (!ticket) return tickets;

    // Save previous state for undo
    this.addToHistory<Ticket>({
      type: 'ticket',
      action: 'update',
      itemId: id,
      previousState: { ...ticket },
      timestamp: new Date().toISOString(),
    });

    // Update ticket
    const updated = tickets.map((t) =>
      t.id === id
        ? { ...t, ...updates, updatedAt: new Date().toISOString() }
        : t
    );

    this.saveTickets(updated);
    return updated;
  }

  // Undo last action
  undoLastAction(): { success: boolean; message: string } {
    const history = this.getHistory();
    if (history.length === 0) {
      return { success: false, message: 'No actions to undo' };
    }

    const lastAction = history[0];
    const previousState = lastAction.previousState;

    try {
      switch (lastAction.type) {
        case 'merchant': {
          const merchants = this.getMerchants();
          const updated = merchants.map((m) =>
            m.id === lastAction.itemId ? (previousState as Merchant) : m
          );
          this.saveMerchants(updated);
          break;
        }
        case 'payment': {
          const payments = this.getPayments();
          const updated = payments.map((p) =>
            p.id === lastAction.itemId ? (previousState as Payment) : p
          );
          this.savePayments(updated);
          break;
        }
        case 'ticket': {
          const tickets = this.getTickets();
          const updated = tickets.map((t) =>
            t.id === lastAction.itemId ? (previousState as Ticket) : t
          );
          this.saveTickets(updated);
          break;
        }
      }

      // Remove from history
      history.shift();
      localStorage.setItem(this.HISTORY_KEY, JSON.stringify(history));

      return { success: true, message: 'Action undone successfully' };
    } catch (error) {
      return { success: false, message: 'Failed to undo action' };
    }
  }

  // Check if undo is available
  canUndo(): boolean {
    return this.getHistory().length > 0;
  }

  // Get last action description
  getLastActionDescription(): string | null {
    const history = this.getHistory();
    if (history.length === 0) return null;

    const last = history[0];
    const actions: Record<string, string> = {
      status_update: 'Status update',
      update: 'Update',
    };

    return `${actions[last.action] || 'Action'} on ${last.type}`;
  }

  // Reset all data to initial mock data
  resetAllData() {
    localStorage.removeItem(this.MERCHANTS_KEY);
    localStorage.removeItem(this.PAYMENTS_KEY);
    localStorage.removeItem(this.TICKETS_KEY);
    localStorage.removeItem(this.ORDERS_KEY);
    localStorage.removeItem(this.HISTORY_KEY);
  }
}

export const dataService = new DataService();

