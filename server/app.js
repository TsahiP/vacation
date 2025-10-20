const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const vacationRoutes = require('./routes/vacation');

const app = express();

// Debug middleware to log ALL requests FIRST
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} from ${req.get('origin') || 'no origin'}`);
  next();
});

// CORS middleware - must be BEFORE routes
app.use((req, res, next) => {
  console.log('CORS middleware triggered');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Expose-Headers', 'Content-Range, X-Content-Range');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS preflight request');
    return res.sendStatus(204);
  }
  
  next();
});

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/vacation', vacationRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// Debug middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

module.exports = app;


// const express = require('express');
// const cors = require('cors');
// const sequelize = require('./config/database');
// const authRoutes = require('./routes/auth');
// const vacationRoutes = require('./routes/vacation');

// const app = express();

// const corsOptions = {
//   origin: 'http://localhost:5173', // frontend
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   exposedHeaders: ['Content-Range', 'X-Content-Range'],
//   credentials: true,
//   preflightContinue: false,
//   optionsSuccessStatus: 204
// };

// app.use(cors(corsOptions));
// // Add explicit handling for OPTIONS requests
// app.options('*', cors(corsOptions));
// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/vacation', vacationRoutes);

// // Health check route
// app.get('/', (req, res) => {
//   res.json({ message: 'API is running' });
// });

// module.exports = app;