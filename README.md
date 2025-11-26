# 🚀 Operations Center

<div align="center">

![Operations Center](https://img.shields.io/badge/Operations-Center-4F46E5?style=for-the-badge&logo=react&logoColor=white)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**A comprehensive, role-based operations portal for e-commerce management**

Made with ❤️ by [Rishi](https://github.com/rishichhadva)

[Features](#-features) • [Getting Started](#-getting-started) • [Documentation](#-documentation) • [Screenshots](#-screenshots)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
- [User Roles & Permissions](#-user-roles--permissions)
- [Workflows](#-workflows)
- [Project Structure](#-project-structure)
- [Mock Backend API](#-mock-backend-api)
- [Key Features](#-key-features)
- [Development](#-development)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**Operations Center** is a fully functional, role-based internal operations portal designed for e-commerce platforms. It provides a comprehensive solution for managing merchants, tracking orders, reconciling payments, and handling support tickets. The portal demonstrates modern web development practices with a clean, intuitive interface and robust state management.

### Why Operations Center?

- ✅ **Complete Workflow Management** - Handle all operational aspects from a single platform
- ✅ **Role-Based Access Control** - Granular permissions for different user roles
- ✅ **Persistent State Management** - All changes saved and synchronized across sessions
- ✅ **Undo Functionality** - Revert actions with a single click
- ✅ **Real-Time Updates** - Changes reflect instantly across all users
- ✅ **Professional UI/UX** - Clean, modern design with responsive layout

---

## ✨ Features

### Core Functionality

- 🔐 **Role-Based Authentication** - Three distinct user roles with appropriate permissions
- 📊 **Dashboard** - Real-time metrics and activity feed
- 🏪 **Merchant Onboarding** - Review, approve, or reject merchant applications
- 📦 **Order Tracking** - Monitor order status and fulfillment
- 💳 **Payment Reconciliation** - Manage and reconcile payment transactions
- 🎫 **Support Tickets** - Handle customer support requests efficiently

### Advanced Features

- 💾 **Persistent Storage** - All changes saved to localStorage
- 🔄 **Undo System** - Revert any action with full history tracking
- 👥 **Multi-User Support** - Changes visible across all users in real-time
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🎨 **Modern UI** - Built with shadcn-ui components and TailwindCSS
- ⚡ **Fast Performance** - Optimized with Vite and React 18

---

## 🛠️ Technology Stack

### Frontend
- **React 18.3** - UI library with hooks and context API
- **TypeScript 5.8** - Type-safe development
- **React Router 6** - Client-side routing
- **TailwindCSS 3.4** - Utility-first CSS framework
- **shadcn-ui** - High-quality component library
- **Lucide React** - Beautiful icon library

### State Management
- **React Context** - Authentication and global state
- **localStorage** - Persistent data storage
- **Custom Data Service** - Centralized data management

### Build Tools
- **Vite 5.4** - Fast build tool and dev server
- **ESLint** - Code linting and quality
- **TypeScript** - Type checking

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v16 or higher
- **npm** or **bun** package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rishichhadva/operations-center.git
   cd operations-center
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:8080
   ```

### Building for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

### Running the Application

1. **Start the dev server** (see Installation above)
2. **Select a role** on the login page:
   - Operations Agent
   - Operations Manager  
   - Admin
3. **Click "Continue to Portal"**
4. **Navigate** using the sidebar menu
5. **Test features** based on your selected role

### Application Flow

```
Login Page → Role Selection → Dashboard → Navigate to Modules
     ↓
  Merchants (Manager/Admin only)
  Orders (All roles)
  Payments (Manager/Admin only)
  Tickets (All roles)
```

### Key Assumptions for Running

- **No Backend Required**: Application uses mock data stored in localStorage
- **Browser Storage**: Requires localStorage support (all modern browsers)
- **No Authentication**: Role selection is for demo purposes only
- **Data Persistence**: All changes persist in browser localStorage
- **Multi-Tab Support**: Changes sync across browser tabs automatically

---

## 👥 User Roles & Permissions

### 🔵 Operations Agent
**Access Level**: Basic Operations

- ✅ View Dashboard
- ✅ View Merchant Applications (read-only)
- ✅ Full Order Tracking Access
- ✅ Full Support Ticket Management
- ❌ Payment Reconciliation (restricted)

### 🟢 Operations Manager
**Access Level**: Management & Reconciliation

- ✅ Full Dashboard Access
- ✅ Merchant Onboarding (review and approve)
- ✅ Full Order Tracking Access
- ✅ Payment Reconciliation (full access)
- ✅ Full Support Ticket Management

### 🟣 Admin
**Access Level**: Complete System Access

- ✅ All features and workflows
- ✅ Full CRUD operations
- ✅ User management capabilities
- ✅ System configuration

---

## 🔄 Workflows

### 1. Merchant Onboarding (`/merchants`)
- View all merchant applications
- Review business details and documentation
- Approve or reject applications
- Track application status (Pending → Under Review → Approved/Rejected)
- **Access**: Manager, Admin

### 2. Order Tracking (`/orders`)
- Real-time order status monitoring
- Search and filter orders
- View customer and merchant information
- Track payment status
- **Access**: All roles

### 3. Payment Reconciliation (`/payments`)
- View all payment transactions
- Reconcile payments (Settle/Fail)
- Track payment methods (Card, UPI, Net Banking, Wallet)
- View reconciliation history
- **Access**: Manager, Admin only

### 4. Support Ticket Management (`/tickets`)
- Create and assign tickets
- Priority-based organization (Low, Medium, High, Urgent)
- Category filtering (Technical, Billing, Onboarding, General)
- Status tracking (Open → In Progress → Resolved → Closed)
- **Access**: All roles

---

## 📚 Component Documentation

### 🔐 Authentication Component (`src/contexts/AuthContext.tsx`)

#### Setup Steps
1. The authentication context is automatically initialized in `App.tsx`
2. No additional setup required - it uses localStorage for persistence
3. User session persists across page refreshes

#### Assumptions Made
- Authentication is mock-based for demo purposes
- User roles are selected on login page (no real credentials)
- User data is stored in browser localStorage
- Session persists until explicit logout

#### How to Run
```bash
# The auth context is automatically available throughout the app
# Access it using the useAuth hook:
import { useAuth } from '@/contexts/AuthContext';

const { user, login, logout, isAuthenticated } = useAuth();
```

#### Role Definitions
- **agent**: Operations Agent - Basic operational access
- **manager**: Operations Manager - Management and reconciliation access
- **admin**: Admin - Complete system access

---

### 🏠 Dashboard Component (`src/pages/Dashboard.tsx`)

#### Setup Steps
1. Accessible at `/dashboard` route
2. Requires authentication (redirects to login if not authenticated)
3. Automatically loads data from `dataService`

#### Assumptions Made
- Dashboard shows aggregated data from all modules
- Metrics update in real-time (1 second polling interval)
- Role-based visibility for payment metrics (only Manager/Admin)
- Recent activity combines orders and tickets

#### How to Run
```bash
# Navigate to dashboard after login
# URL: http://localhost:8080/dashboard
# Or click "Dashboard" in the sidebar navigation
```

#### Role Definitions
- **All Roles**: Can view dashboard with basic metrics
- **Manager/Admin**: Additional payment reconciliation metrics visible
- **Agent**: Limited metrics (no payment data)

---

### 🏪 Merchant Onboarding Component (`src/pages/Merchants.tsx`)

#### Setup Steps
1. Accessible at `/merchants` route
2. Requires Manager or Admin role (Agents have read-only access)
3. Data loaded from `dataService.getMerchants()`

#### Assumptions Made
- Merchants can have 4 statuses: `pending`, `under_review`, `approved`, `rejected`
- Only Managers and Admins can change merchant status
- Status changes are persisted to localStorage
- Undo functionality available for all status changes
- Real-time sync across browser tabs (1 second polling)

#### How to Run
```bash
# 1. Login as Manager or Admin role
# 2. Navigate to /merchants or click "Merchant Onboarding" in sidebar
# 3. View merchant applications
# 4. Use action buttons: Review, Approve, Reject
# 5. Use Undo button to revert last action
```

#### Role Definitions
- **Agent**: Read-only access (can view but cannot modify)
- **Manager**: Full access - can review, approve, reject merchants
- **Admin**: Full access - can review, approve, reject merchants

#### Available Actions
- **Review**: Changes status from `pending` to `under_review`
- **Approve**: Changes status to `approved`
- **Reject**: Changes status to `rejected`
- **Undo**: Reverts last status change

---

### 📦 Order Tracking Component (`src/pages/Orders.tsx`)

#### Setup Steps
1. Accessible at `/orders` route
2. Available to all authenticated users
3. Data loaded from `dataService.getOrders()`

#### Assumptions Made
- Orders have statuses: `pending`, `processing`, `shipped`, `delivered`, `cancelled`
- Payment statuses: `pending`, `paid`, `failed`, `refunded`
- Orders are read-only (no edit functionality in this version)
- Real-time updates via storage event listeners

#### How to Run
```bash
# 1. Login with any role
# 2. Navigate to /orders or click "Order Tracking" in sidebar
# 3. View all orders in table format
# 4. Use search to filter by Order ID, Merchant, or Customer
# 5. View status badges for order and payment status
```

#### Role Definitions
- **All Roles**: Full read access to all orders
- No role-based restrictions for order viewing

#### Features
- Search functionality (Order ID, Merchant Name, Customer Name)
- Status badges with color coding
- Order amount display in Indian Rupees (₹)
- Date formatting for order creation

---

### 💳 Payment Reconciliation Component (`src/pages/Payments.tsx`)

#### Setup Steps
1. Accessible at `/orders` route
2. **Restricted to Manager and Admin roles only**
3. Data loaded from `dataService.getPayments()`

#### Assumptions Made
- Payments can have statuses: `pending`, `settled`, `failed`, `disputed`
- Payment methods: `card`, `upi`, `netbanking`, `wallet`
- Only pending payments can be reconciled
- Settled/failed payments can be reset to pending
- Reconciliation actions are tracked with user name
- Real-time sync across sessions

#### How to Run
```bash
# 1. Login as Manager or Admin role
# 2. Navigate to /payments or click "Payment Reconciliation" in sidebar
# 3. View payment transactions
# 4. For pending payments: Click "Settle" or "Fail"
# 5. For settled/failed payments: Click "Reset" to revert to pending
# 6. Use Undo button to revert last action
```

#### Role Definitions
- **Agent**: **No Access** - Redirected to dashboard if attempted
- **Manager**: Full access - can reconcile payments
- **Admin**: Full access - can reconcile payments

#### Available Actions
- **Settle**: Marks payment as successfully reconciled
- **Fail**: Marks payment as failed reconciliation
- **Reset**: Reverts settled/failed payment back to pending
- **Undo**: Reverts last reconciliation action

#### Metrics Displayed
- Total Transactions Amount
- Settled Amount (successful reconciliations)
- Pending Reconciliation Amount

---

### 🎫 Support Ticket Management Component (`src/pages/Tickets.tsx`)

#### Setup Steps
1. Accessible at `/tickets` route
2. Available to all authenticated users
3. Data loaded from `dataService.getTickets()`

#### Assumptions Made
- Ticket statuses: `open`, `in_progress`, `resolved`, `closed`
- Priorities: `low`, `medium`, `high`, `urgent`
- Categories: `technical`, `billing`, `onboarding`, `general`
- Tickets can be assigned to users
- Only assigned user can resolve their tickets
- Real-time updates across all users

#### How to Run
```bash
# 1. Login with any role
# 2. Navigate to /tickets or click "Support Tickets" in sidebar
# 3. View all tickets in table format
# 4. For unassigned open tickets: Click "Assign to Me"
# 5. For assigned in-progress tickets: Click "Resolve" or "Close"
# 6. Use Undo button to revert last action
```

#### Role Definitions
- **All Roles**: Full access to ticket management
- **Agent**: Can assign, resolve, and close tickets
- **Manager**: Can assign, resolve, and close tickets
- **Admin**: Can assign, resolve, and close tickets

#### Available Actions
- **Assign to Me**: Assigns unassigned open ticket to current user, changes status to `in_progress`
- **Resolve**: Marks ticket as resolved (from `in_progress`)
- **Close**: Marks ticket as closed (from `in_progress` or `resolved`)
- **Undo**: Reverts last ticket action

#### Ticket Workflow
1. **Open** → Assign to user → **In Progress**
2. **In Progress** → Resolve → **Resolved**
3. **Resolved** → Close → **Closed**
4. **In Progress** → Close → **Closed**

---

### 🛡️ Protected Route Component (`src/components/ProtectedRoute.tsx`)

#### Setup Steps
1. Automatically wraps protected routes in `App.tsx`
2. No manual setup required

#### Assumptions Made
- Unauthenticated users are redirected to login (`/`)
- Users without required roles are redirected to dashboard
- Role checking is done via `allowedRoles` prop
- Authentication state is managed by `AuthContext`

#### How to Run
```typescript
// Usage in App.tsx:
<Route
  path="payments"
  element={
    <ProtectedRoute allowedRoles={['manager', 'admin']}>
      <Payments />
    </ProtectedRoute>
  }
/>
```

#### Role Definitions
- **No allowedRoles prop**: All authenticated users can access
- **allowedRoles=['manager', 'admin']**: Only specified roles can access
- **Unauthenticated**: Always redirected to login

---

### 💾 Data Service (`src/lib/dataService.ts`)

#### Setup Steps
1. Automatically initialized - no setup required
2. Uses browser localStorage for persistence
3. All components use this service for data operations

#### Assumptions Made
- localStorage is available (browser environment)
- Data persists across browser sessions
- Maximum 50 actions in undo history
- Real-time sync via storage events and polling
- Mock data is used as initial data source

#### How to Run
```typescript
// Import and use in components:
import { dataService } from '@/lib/dataService';

// Get data
const merchants = dataService.getMerchants();
const payments = dataService.getPayments();
const tickets = dataService.getTickets();

// Update data
const updated = dataService.updateMerchantStatus(id, 'approved', userName);
const updated = dataService.updatePaymentStatus(id, 'settled', userName);
const updated = dataService.updateTicket(id, { status: 'resolved' });

// Undo
const result = dataService.undoLastAction();
```

#### Features
- **Persistent Storage**: All changes saved to localStorage
- **Undo System**: Track last 50 actions with undo capability
- **Cross-Tab Sync**: Changes visible across browser tabs
- **History Tracking**: Full action history for undo functionality

---

### 🎨 UI Components

#### StatusBadge Component (`src/components/StatusBadge.tsx`)
- **Purpose**: Displays status with color-coded badges
- **Usage**: `<StatusBadge status={merchant.status} />`
- **Status Types**: Supports all status types from merchants, orders, payments, tickets

#### StatCard Component (`src/components/StatCard.tsx`)
- **Purpose**: Displays metric cards on dashboard
- **Usage**: `<StatCard title="Total" value={100} icon={Icon} />`
- **Features**: Trend indicators, descriptions, icons

#### AppSidebar Component (`src/components/AppSidebar.tsx`)
- **Purpose**: Main navigation sidebar
- **Features**: Role-based menu filtering, collapsible, user info display
- **Logout**: Visible logout button with proper styling

---

## 📁 Project Structure

```
operations-center/
├── public/
│   ├── favicon.svg          # Application favicon
│   └── robots.txt
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn-ui components
│   │   ├── AppSidebar.tsx  # Navigation sidebar
│   │   ├── ProtectedRoute.tsx
│   │   ├── StatCard.tsx
│   │   └── StatusBadge.tsx
│   ├── contexts/           # React contexts
│   │   └── AuthContext.tsx # Authentication logic
│   ├── lib/               # Utilities and services
│   │   ├── dataService.ts  # Data persistence service
│   │   ├── mockData.ts     # Mock backend data
│   │   └── utils.ts        # Helper functions
│   ├── pages/             # Route components
│   │   ├── Login.tsx       # Role selection
│   │   ├── Dashboard.tsx   # Main dashboard
│   │   ├── DashboardLayout.tsx
│   │   ├── Merchants.tsx   # Merchant onboarding
│   │   ├── Orders.tsx      # Order tracking
│   │   ├── Payments.tsx    # Payment reconciliation
│   │   └── Tickets.tsx     # Support tickets
│   ├── types/             # TypeScript definitions
│   │   └── index.ts
│   ├── App.tsx            # Root component
│   └── main.tsx           # Entry point
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── vite.config.ts
```

---

## 🔌 Mock Backend API

The application uses a mock data service (`src/lib/dataService.ts`) that simulates a backend API. For production, replace these with actual API calls.

### Expected API Structure

#### Authentication
```
POST /api/auth/login
Body: { role: 'agent' | 'manager' | 'admin' }
Response: { user: User, token: string }
```

#### Merchants
```
GET    /api/merchants              # List all merchants
GET    /api/merchants/:id          # Get merchant details
PUT    /api/merchants/:id/status   # Update merchant status
Body: { status: 'pending' | 'under_review' | 'approved' | 'rejected' }
```

#### Orders
```
GET    /api/orders                 # List all orders
GET    /api/orders/:id             # Get order details
GET    /api/orders?status=shipped  # Filter orders by status
PUT    /api/orders/:id/status      # Update order status
```

#### Payments
```
GET    /api/payments               # List all payments
GET    /api/payments/:id           # Get payment details
PUT    /api/payments/:id/reconcile # Reconcile payment
Body: { status: 'settled' | 'failed' }
```

#### Tickets
```
GET    /api/tickets                # List all tickets
GET    /api/tickets/:id             # Get ticket details
POST   /api/tickets                 # Create new ticket
PUT    /api/tickets/:id/assign     # Assign ticket
PUT    /api/tickets/:id/status     # Update ticket status
```

### Integration Notes

- All API calls should include authentication headers
- Responses should follow TypeScript interfaces in `src/types/index.ts`
- Error handling should return appropriate HTTP status codes
- The application is ready for API integration using TanStack Query

---

## 🎨 Key Features

### Persistent State Management
- All changes are automatically saved to localStorage
- Changes persist across browser sessions
- Real-time synchronization across multiple tabs

### Undo Functionality
- Track the last 50 actions
- One-click undo for any action
- Visual feedback with toast notifications

### Role-Based Access Control
- Granular permissions per role
- Protected routes with automatic redirects
- Context-aware UI elements

### Professional UI/UX
- Clean, modern design system
- Consistent spacing and typography
- Responsive breakpoints
- Accessible components (WCAG compliant)

---

## 💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Code Style

- **TypeScript** - Full type safety
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting (if configured)

### Environment Variables

Currently, the application uses mock data. For production, configure:

```env
VITE_API_URL=https://api.example.com
VITE_API_KEY=your_api_key
```

---

## 📊 Mock Data

The application includes comprehensive mock data:

- **15 Merchants** across different approval stages
- **20 Orders** with various statuses
- **15 Payment Transactions** with different states
- **12 Support Tickets** with different priorities

Mock data location: `src/lib/mockData.ts`

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Maintain component reusability
- Write clear commit messages
- Update documentation as needed

---

## 📝 License

This project was created as a demonstration of frontend development capabilities. Feel free to use it as a reference or starting point for your own projects.

---

## 🙏 Acknowledgments

- **shadcn-ui** - For the amazing component library
- **Radix UI** - For accessible primitives
- **Lucide** - For beautiful icons
- **Vite** - For the lightning-fast build tool

---

<div align="center">

**Made with ❤️ by [Rishi](https://github.com/rishichhadva)**

⭐ Star this repo if you find it helpful!

</div>
