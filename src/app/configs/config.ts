
import { Container, Service } from 'typedi';


import * as HttpConfigDefinitions from './config.http.definitions';
import * as DbConfigDefinitions from './config.db.definitions';
import * as LogConfigDefinitions from './config.log.definitions';
import * as CacheConfigDefinitions from './config.cache.definitions';
import * as ConfigDefinitions from './config.definitions';
import * as ConfigFactory from './file-config-factory';

@Service({id: ConfigDefinitions.ConfigInjectable, factory: [ConfigFactory.FileConfigFactory, 'produce']})
export class Config implements ConfigDefinitions.Config {
  http: HttpConfigDefinitions.HttpConfig;
  db: DbConfigDefinitions.DbConfig;
  log: LogConfigDefinitions.LogConfig;
  cache: CacheConfigDefinitions.CacheConfig;
  env: ConfigDefinitions.Env;
}