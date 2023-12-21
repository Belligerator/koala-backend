import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';

const databaseConfig: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    entities: [
        __dirname + '/../endpoints/**/*.entity{.ts,.js}',
        __dirname + '/../entities/**/*.entity{.ts,.js}',
    ],
    synchronize: false,
    logging: false,
    migrationsRun: false
};

export default databaseConfig;
