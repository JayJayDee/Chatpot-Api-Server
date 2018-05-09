
import { Service, Inject } from 'typedi';
import * as mysql from 'mysql';

import * as DbDefinitions from './db.definitions';
import * as ConfigDefinitions from '../configs/config.definitions';
import * as LoggerDefinitions from '../logger/logger.definitions';

@Service(DbDefinitions.RDBInjectable)
export class Mysql implements DbDefinitions.RDB {

  @Inject(ConfigDefinitions.ConfigInjectable)
  private config: ConfigDefinitions.Config;

  @Inject(LoggerDefinitions.LoggerInjectable)
  private log: LoggerDefinitions.Logger;

  constructor() {
    
  }

  public job(operation): Promise<any> {
    return null;
  }

  public transaction(operation): Promise<any> {
    return null;
  }

  public query(query: string, params?: any): Promise<any> {
    return null;
  }
}