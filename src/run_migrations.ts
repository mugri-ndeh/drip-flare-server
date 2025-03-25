// import { AppDataSource } from './data_source';

// async function runMigrations() {
//   try {
//     await AppDataSource.initialize(); // Initialize the data source
//     console.log('Data Source has been initialized!');

//     await AppDataSource.runMigrations(); // Run pending migrations
//     console.log('Migrations have been executed successfully!');
//   } catch (error) {
//     console.error('Error during migration:', error);
//   } finally {
//     await AppDataSource.destroy(); // Close the connection
//     console.log('Data Source has been disconnected.');
//   }
// }

// runMigrations();
