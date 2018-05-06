
import { Token } from 'typedi';

import * as HttpConfigDefinitions from './config.http.definitions';
import * as DbConfigDefinitions from './config.db.definitions';
import * as LogConfigDefinitions from './config.log.definitions';
import * as CacheConfigDefinitions from './config.cache.definitions';

import * as ContainerDefinitions from '../../container/container-definitions';

export enum Env {
  LOCAL = 'LOCAL', STAGE = 'STAGE', PROD = 'PROD'
}
export interface ConfigSection {
  name: string;
}

export interface Config {
  http: HttpConfigDefinitions.HttpConfig;
  db: DbConfigDefinitions.DbConfig;
  log: LogConfigDefinitions.LogConfig;
  cache: CacheConfigDefinitions.CacheConfig;
  env: Env;
}
export const ConfigInjectable: Token<Config> = new Token<Config>();