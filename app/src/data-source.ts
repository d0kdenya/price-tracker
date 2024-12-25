import { DataSource } from 'typeorm';
import { PriceHistory } from './price-history/entities/price-history.entity';
import { config } from 'dotenv';

config();

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DATABASE_PATH || './data/price_history.db',
  entities: [PriceHistory],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: false,
});
