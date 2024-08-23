import { Client } from 'pg';
import { readFileSync } from 'fs';
import { join } from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: join(__dirname, '../../.env') });

const filePath = join(__dirname, 'tables.sql');
const script = readFileSync(filePath, 'utf8');

const baseConfig = {
  user: process.env.DB_USER,
  host: process.env.HOST,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432', 10),
};

const initialConfig = {
  ...baseConfig,
  database: 'postgres',
};

const newConfig = {
  ...baseConfig,
  database: 'hospital',
};

const createDatabase = async function (): Promise<void> {
  const client = new Client(initialConfig);
  try {
    await client.connect();
    console.log(
      `Successfully connected to the database '${initialConfig.database}'`,
    );

    await client.query('CREATE DATABASE hospital;');
    console.log('Database created successfully');
  } catch (error) {
    console.error(`${error}`);
  } finally {
    await client.end();
    console.log(`Disconnected from the database '${initialConfig.database}'`);
  }
};

const createTables = async function (): Promise<void> {
  const client = new Client(newConfig);
  try {
    await client.connect();
    console.log(
      `Successfully connected to the database '${newConfig.database}'`,
    );

    await client.query(script);
    console.log('Tables had been created successfully');
  } catch (error) {
    console.error(`${error}`);
  } finally {
    await client.end();
    console.log(`Disconnected from the database '${newConfig.database}'`);
  }
};

const setupDatabase = async function (): Promise<void> {
  await createDatabase();
  await createTables();
};

(async () => await setupDatabase())();
