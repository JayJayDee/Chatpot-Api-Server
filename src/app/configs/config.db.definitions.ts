
import * as ConfigDefinitions from './config.definitions';

export interface DbConnectionConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}

export interface DbConfig {
  connection: DbConnectionConfig; 
}