# Operations Center

A comprehensive, role-based operations portal for e-commerce management.

Made with ❤️ by [Rishi](https://github.com/rishichhadva)

---

## Setup Steps

### Prerequisites
- Node.js v16 or higher
- npm or bun package manager

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/rishichhadva/operations-center.git
   cd operations-center
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open browser and navigate to `http://localhost:8080`

---

## Assumptions Made

### General Assumptions
- **No Backend Required**: Application uses mock data stored in browser localStorage
- **Browser Storage**: Requires localStorage support (all modern browsers)
- **No Real Authentication**: Role selection is for demo purposes only
- **Data Persistence**: All changes persist in browser localStorage
- **Multi-Tab Support**: Changes sync across browser tabs automatically (1 second polling)
- **Undo System**: Tracks last 50 actions for undo functionality

### Data Assumptions
- Initial data loaded from `src/lib/mockData.ts`
- All updates saved to localStorage via `src/lib/dataService.ts`
- Real-time synchronization via storage event listeners and polling

---

## How to Run the Application

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Open the application**
   - Navigate to `http://localhost:8080` in your browser

3. **Select a role on login page**
   - Operations Agent
   - Operations Manager
   - Admin

4. **Click "Continue to Portal"**

5. **Navigate using the sidebar**
   - Dashboard: Overview and metrics
   - Merchants: Merchant onboarding (Manager/Admin only)
   - Orders: Order tracking (All roles)
   - Payments: Payment reconciliation (Manager/Admin only)
   - Tickets: Support ticket management (All roles)

---

## Component Documentation

### Authentication Component (`src/contexts/AuthContext.tsx`)

#### Setup Steps
- Automatically initialized in `App.tsx`
- No additional setup required
- Uses localStorage for session persistence

#### Assumptions Made
- Mock authentication (no real credentials)
- User roles selected on login page
- Session persists until explicit logout
- User data stored in browser localStorage

#### How to Run
- Access via `useAuth()` hook in any component
- Login automatically redirects to dashboard
- Logout clears session and returns to login

#### Role Definitions
- **agent**: Operations Agent - Basic operational access
- **manager**: Operations Manager - Management and reconciliation access
- **admin**: Admin - Complete system access

---

### Dashboard Component (`src/pages/Dashboard.tsx`)

#### Setup Steps
- Accessible at `/dashboard` route
- Requires authentication
- Automatically loads data from `dataService`

#### Assumptions Made
- Shows aggregated data from all modules
- Updates every 1 second via polling
- Payment metrics only visible to Manager/Admin
- Recent activity combines orders and tickets

#### How to Run
1. Login with any role
2. Navigate to `/dashboard` or click "Dashboard" in sidebar
3. View metrics and recent activity

#### Role Definitions
- **All Roles**: Can view dashboard with basic metrics
- **Manager/Admin**: Additional payment reconciliation metrics
- **Agent**: Limited metrics (no payment data)

---

### Merchant Onboarding Component (`src/pages/Merchants.tsx`)

#### Setup Steps
- Accessible at `/merchants` route
- Requires Manager or Admin role
- Data loaded from `dataService.getMerchants()`

#### Assumptions Made
- Four statuses: `pending`, `under_review`, `approved`, `rejected`
- Only Managers and Admins can change status
- Status changes persisted to localStorage
- Undo available for all status changes
- Real-time sync across tabs

#### How to Run
1. Login as Manager or Admin
2. Navigate to `/merchants` or click "Merchant Onboarding" in sidebar
3. View merchant applications
4. Use buttons: Review, Approve, Reject
5. Use Undo button to revert last action

#### Role Definitions
- **Agent**: Read-only access (view only, cannot modify)
- **Manager**: Full access - can review, approve, reject
- **Admin**: Full access - can review, approve, reject

---

### Order Tracking Component (`src/pages/Orders.tsx`)

#### Setup Steps
- Accessible at `/orders` route
- Available to all authenticated users
- Data loaded from `dataService.getOrders()`

#### Assumptions Made
- Order statuses: `pending`, `processing`, `shipped`, `delivered`, `cancelled`
- Payment statuses: `pending`, `paid`, `failed`, `refunded`
- Orders are read-only (no edit functionality)
- Real-time updates via storage listeners

#### How to Run
1. Login with any role
2. Navigate to `/orders` or click "Order Tracking" in sidebar
3. View all orders in table
4. Use search to filter by Order ID, Merchant, or Customer

#### Role Definitions
- **All Roles**: Full read access to all orders
- No role-based restrictions

---

### Payment Reconciliation Component (`src/pages/Payments.tsx`)

#### Setup Steps
- Accessible at `/payments` route
- **Restricted to Manager and Admin roles only**
- Data loaded from `dataService.getPayments()`

#### Assumptions Made
- Payment statuses: `pending`, `settled`, `failed`, `disputed`
- Payment methods: `card`, `upi`, `netbanking`, `wallet`
- Only pending payments can be reconciled
- Settled/failed payments can be reset to pending
- Reconciliation tracked with user name

#### How to Run
1. Login as Manager or Admin
2. Navigate to `/payments` or click "Payment Reconciliation" in sidebar
3. View payment transactions
4. For pending: Click "Settle" or "Fail"
5. For settled/failed: Click "Reset" to revert to pending
6. Use Undo button to revert last action

#### Role Definitions
- **Agent**: **No Access** - Redirected to dashboard if attempted
- **Manager**: Full access - can reconcile payments
- **Admin**: Full access - can reconcile payments

---

### Support Ticket Management Component (`src/pages/Tickets.tsx`)

#### Setup Steps
- Accessible at `/tickets` route
- Available to all authenticated users
- Data loaded from `dataService.getTickets()`

#### Assumptions Made
- Ticket statuses: `open`, `in_progress`, `resolved`, `closed`
- Priorities: `low`, `medium`, `high`, `urgent`
- Categories: `technical`, `billing`, `onboarding`, `general`
- Tickets can be assigned to users
- Only assigned user can resolve their tickets

#### How to Run
1. Login with any role
2. Navigate to `/tickets` or click "Support Tickets" in sidebar
3. View all tickets in table
4. For unassigned open tickets: Click "Assign to Me"
5. For assigned in-progress tickets: Click "Resolve" or "Close"
6. Use Undo button to revert last action

#### Role Definitions
- **All Roles**: Full access to ticket management
- **Agent**: Can assign, resolve, and close tickets
- **Manager**: Can assign, resolve, and close tickets
- **Admin**: Can assign, resolve, and close tickets

---

### Protected Route Component (`src/components/ProtectedRoute.tsx`)

#### Setup Steps
- Automatically wraps protected routes in `App.tsx`
- No manual setup required

#### Assumptions Made
- Unauthenticated users redirected to login (`/`)
- Users without required roles redirected to dashboard
- Role checking via `allowedRoles` prop
- Authentication state managed by `AuthContext`

#### How to Run
- Automatically applied to protected routes
- Usage: `<ProtectedRoute allowedRoles={['manager', 'admin']}>...</ProtectedRoute>`

#### Role Definitions
- **No allowedRoles prop**: All authenticated users can access
- **allowedRoles=['manager', 'admin']**: Only specified roles can access
- **Unauthenticated**: Always redirected to login

---

### Data Service (`src/lib/dataService.ts`)

#### Setup Steps
- Automatically initialized - no setup required
- Uses browser localStorage for persistence
- All components use this service

#### Assumptions Made
- localStorage available (browser environment)
- Data persists across browser sessions
- Maximum 50 actions in undo history
- Real-time sync via storage events and polling
- Mock data used as initial data source

#### How to Run
```typescript
import { dataService } from '@/lib/dataService';

// Get data
const merchants = dataService.getMerchants();
const payments = dataService.getPayments();
const tickets = dataService.getTickets();

// Update data
dataService.updateMerchantStatus(id, 'approved', userName);
dataService.updatePaymentStatus(id, 'settled', userName);
dataService.updateTicket(id, { status: 'resolved' });

// Undo
dataService.undoLastAction();
```

#### Role Definitions
- Not applicable (service layer, no role restrictions)

---

## Building for Production

```bash
npm run build
```

Production build will be in the `dist` directory.

---

## Technology Stack

- React 18.3
- TypeScript 5.8
- React Router 6
- TailwindCSS 3.4
- shadcn-ui components
- Vite 5.4

---

Made with ❤️ by [Rishi](https://github.com/rishichhadva)
