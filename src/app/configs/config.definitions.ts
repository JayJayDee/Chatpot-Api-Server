
import { Token } from 'typedi';

import * as HttpConfigDefinitions from './config.http.definitions';
import * as DbConfigDefinitions from './config.db.definitions';
import * as LogConfigDefinitions from './config.log.definitions';
import * as CacheConfigDefinitions from './config.cache.definitions';

import * as ContainerDefinitions from '../../container/container-definitions';

export enum Env {
  LOCAL = 'LOCAL', STAGE = 'STAGE', PROD = 'PROD'
}

export interface Config {
  http: HttpConfigDefinitions.HttpConfig;
  db: DbConfigDefinitions.DbConfig;
  log: LogConfigDefinitions.LogConfig;
  cache: CacheConfigDefinitions.CacheConfig;
  env: Env;
}
export const ConfigInjectable: Token<Config> = new Token<Config>();
export interface ConfigFactory {
  produce(): Config;
}

export interface ConfigFile {
  HTTP_PORT: number;
  HTTP_CORS_ENABLED: boolean;
  HTTP_CORS_ORIGIN: string;
  HTTP_CORS_ALLOW_METHODS: Array<string>;

  DB_CONNECTION_HOST: string;
  DB_CONNECTION_PORT: number;
  DB_CONNECTION_DB: string;
  DB_CONNECTION_USER: string;
  DB_CONNECTION_PASSWORD: string;
  DB_MAX_POOL_SIZE: number;

  LOG_LEVEL: LogConfigDefinitions.LogLevel;

  CACHE_ENABLED: boolean;
  ENV: string;
}