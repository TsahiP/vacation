# Vacation Request Management System - Server

Node.js Express backend API with PostgreSQL and JWT authentication.

## 🚀 Quick Start

### Prerequisites
-----node version 22.12.0-----
- Docker (for PostgreSQL)

## 🔧 Configuration

Environment variables in [`.env`](.env):
```env
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=vacation_db
DB_HOST=localhost
DB_PORT=5432
PORT=3000
JWT_SECRET=wordpass
NODE_ENV=development
```

### Installation & Running

```bash
# Navigate to server folder
cd server

# Install dependencies
npm install

# Start PostgreSQL with Docker
docker-compose up -d

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

Server runs on `http://localhost:3000`

## 📦 Available Commands

```bash
npm run dev          # Start with auto-reload
npm start            # Start production server
npm run db:migrate   # Run migrations
npm run db:reset     # Reset database completely
```

## 🗄️ Database Setup

The migrations will automatically create:
- Users table
- Vacation requests table
- Two test accounts (see below)
- Sample vacation requests

## 🔑 Test Accounts

After running migrations:
- **Requester**: `employee@example.com` / `pass123`
- **Validator**: `manager@example.com` / `pass123`

## 📡 API Endpoints

### Authentication
```
POST /api/auth/register  - Register new user
POST /api/auth/login     - Login
```

### Vacation Requests (Requires JWT Token)
```
GET    /api/vacation        - Get all requests
POST   /api/vacation        - Create request
GET    /api/vacation/:id    - Get request by ID
PUT    /api/vacation/:id    - Update status (Validators only)
```

## 📁 Tech Stack

- Express.js
- PostgreSQL
- Sequelize ORM
- JWT Authentication
- Bcrypt (Password hashing)
- Docker



## 🐛 Troubleshooting

**Database connection issues?**
- Ensure Docker container is running: `docker-compose ps`
- Check container logs: `docker-compose logs`

**Port 3000 already in use?**
- Stop the process or change PORT in this path: vecation\server\index.js

**Reset everything?**
```bash
docker-compose down
docker-compose up -d
npm run db:reset
```