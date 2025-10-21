# Vacation Request Management System - Client

A Vue.js application for managing employee vacation requests with role-based access control.

## 🚀 Quick Start

### Prerequisites
- Node.js v20.19.0 or v22.12.0+

### Installation & Running

```bash
# Navigate to client folder
cd client

# Install dependencies
npm install

# Run development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 📦 Available Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test:unit    # Run tests
npm run lint         # Lint and fix code
npm run format       # Format code
```

## 🔑 Test Accounts

- **Requester**: `employee@example.com` / `pass123`
- **Validator**: `manager@example.com` / `pass123`

## 🎯 Key Features

- User authentication with JWT
- Role-based access (Requester/Validator)
- Create, view, and track vacation requests
- Approve/reject requests (Validators only)
- Responsive design

## 📁 Tech Stack

- Vue 3 + TypeScript
- Vite
- Pinia (State Management)
- Vue Router
- Tailwind CSS
- Axios

## 🔧 Configuration

API endpoint configured in [`src/services/api-service.ts`](src/services/api-service.ts):
- Default: `http://localhost:3000/api`