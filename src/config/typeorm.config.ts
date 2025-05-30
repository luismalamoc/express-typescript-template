import { DataSource } from 'typeorm';
import path from 'path';
import { logger } from './logger';

// Define the data source configuration
export const dataSource = new DataSource({
  type: 'sqlite',
  database: path.join(process.cwd(), 'database.sqlite'),
  entities: [path.join(__dirname, '../entities/**/*.{ts,js}')],
  migrations: [path.join(__dirname, '../migrations/**/*.{ts,js}')],
  synchronize: process.env.NODE_ENV !== 'production', // Auto-sync in development only
  logging: process.env.NODE_ENV !== 'production',
});

/**
 * Initialize the TypeORM DataSource
 */
export const initializeDataSource = async (): Promise<DataSource> => {
  try {
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
      logger.info('Database connection established successfully');
    }
    return dataSource;
  } catch (error: any) {
    logger.error(`Database connection failed: ${error.message}`, { error });
    throw error;
  }
};

export default dataSource;
