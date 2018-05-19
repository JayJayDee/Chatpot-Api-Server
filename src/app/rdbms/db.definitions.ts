
import { Token } from 'typedi';

export interface RDB {
  job(operation: (operation: (connection: any) => Promise<any>) => Promise<any>): Promise<any>;
  transaction(operation: (connection: any) => Promise<any>): Promise<any>;
  query(query: string, params?: Array<any>): Promise<any>;
  promisify(caller: Object, func: Function, params: Array<any>): Promise<any>;
}

export const RDBInjectable: Token<RDB> = new Token<RDB>();

export class DbRollbackError extends Error {
  constructor(msg: string) {
    super(msg);
  }
}