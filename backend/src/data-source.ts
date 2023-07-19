import { DataSource } from 'typeorm';
import { City } from './db/City';
import { Country } from './db/Country';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'data.sqlite3',
  synchronize: true,
  logging: false,
  entities: [City, Country],
  subscribers: [],
  migrations: []
});
