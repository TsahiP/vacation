require('dotenv').config();
const { Client } = require('pg');
const { execSync } = require('child_process');

async function resetDatabase() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: 'postgres' // Connect to default database
  });

  try {
    await client.connect();
    
    const dbName = process.env.DB_NAME || 'vacation_requests';
    
    console.log(`Terminating connections to database: ${dbName}`);
    
    // Terminate all connections to the database
    await client.query(`
      SELECT pg_terminate_backend(pg_stat_activity.pid)
      FROM pg_stat_activity
      WHERE pg_stat_activity.datname = '${dbName}'
        AND pid <> pg_backend_pid();
    `);
    
    console.log('✓ Terminated all connections');
    
    // Drop database
    await client.query(`DROP DATABASE IF EXISTS ${dbName}`);
    console.log(`✓ Dropped database: ${dbName}`);
    
    // Create database
    await client.query(`CREATE DATABASE ${dbName}`);
    console.log(`✓ Created database: ${dbName}`);
    
    await client.end();
    
    // Run migrations
    console.log('\nRunning migrations...');
    execSync('npx sequelize-cli db:migrate', { stdio: 'inherit' });
    
    console.log('\n✓ Database reset complete!');
  } catch (error) {
    console.error('✗ Error resetting database:', error.message);
    process.exit(1);
  }
}

resetDatabase();