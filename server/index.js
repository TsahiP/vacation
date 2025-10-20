const app = require('./app');
const db = require('./models/index');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Sync database and start server
const startServer = async () => {
  try {
    await db.sequelize.sync({ force: false }); // Set to true to recreate tables on each restart
    console.log('Database synchronized');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
  }
};

startServer();