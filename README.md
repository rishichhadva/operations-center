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
