
import { Service, Inject } from 'typedi';
import * as mysql from 'mysql';

import * as DbDefinitions from './db.definitions';
import { ExtendedMysqlConnection } from './mysql.definitions';
import * as ConfigDefinitions from '../configs/config.definitions';
import * as LoggerDefinitions from '../logger/logger.definitions';

const TAG: string = '[MySQL Driver]';

@Service(DbDefinitions.RDBInjectable)
export class Mysql implements DbDefinitions.RDB {

  @Inject(ConfigDefinitions.ConfigInjectable)
  private config: ConfigDefinitions.Config;

  @Inject(LoggerDefinitions.LoggerInjectable)
  private log: LoggerDefinitions.Logger;

  private pool: mysql.Pool;

  constructor() {
    setTimeout(() => {
      this.pool = mysql.createPool({
        host: this.config.db.connection.host,
        user: this.config.db.connection.user,
        password: this.config.db.connection.password,
        database: this.config.db.connection.database,
        connectionLimit: this.config.db.maxPoolSize
      });
    }, 1);
  }

  public job(operation: (connection: any) => Promise<any>): Promise<any> {
    return null;
  }

  public transaction(operation: (connection: any) => Promise<any>): Promise<any> {
    let connection: ExtendedMysqlConnection
    return new Promise((resolve, reject) => {
      this.getConnectionFromPool()
      .then((con: ExtendedMysqlConnection) => {
        connection = con;
        connection.beginTransaction((err: Error) => {
          if (err) throw err;
          operation(connection)
          .then((resp: any) => {
            connection.commit();
            connection.release();
            this.log.d(`${TAG} transaction committed : ${connection.threadId}`);
            return resolve(resp);
          })
          .catch((err: Error) => {
            connection.rollback();
            connection.release();
            this.log.d(`${TAG} transaction rolled back : ${connection.threadId}`);
            return reject(err);
          });
        });
      })
      .catch((err: Error) => {
        if (connection) {
          this.log.d(`${TAG} transaction rolled back : ${connection.threadId}`);
          connection.rollback();
          connection.release();
        }
        return reject(err);
      });
    });
  }

  public query(query: string, params?: Array<any>): Promise<any> {
    return new Promise((resolve, reject) => {

    });
  }

  public promisify(caller: Object, func: Function, params: Array<any>): Promise<any> {
    return new Promise((resolve, reject) => {
      params.push((err, resp) => {
        if (err) return reject(err);
        return resolve(resp);
      });
      func.apply(caller, params)
    });
  }

  private getConnectionFromPool(): Promise<ExtendedMysqlConnection> {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err: Error, connection: mysql.PoolConnection) => {
        if (err) return reject(err);

        let extended: ExtendedMysqlConnection = connection as ExtendedMysqlConnection;
        if (!extended.queryAsync) {
          extended.queryAsync = function (query: string, params?: Array<any>) {
            let self = this;
            return new Promise((resolve, reject) => {
              self.query(query, params, (err, resp) => {
                if (err) {
                  return reject(err);
                }
                return resolve(resp);                
              });
            });
          }
        }

        return resolve(extended);
      });
    });
  }
}