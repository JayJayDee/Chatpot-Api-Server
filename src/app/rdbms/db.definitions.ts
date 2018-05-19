
import { Token } from 'typedi';

export interface RDB {
  job(operation: (operation: (db: any) => Promise<any>) => Promise<any>): Promise<any>;
  transaction(operation: (db: any) => Promise<any>): Promise<any>;
  query(query: string, params?: any): Promise<any>;
}

export const RDBInjectable: Token<RDB> = new Token<RDB>();

export class DbRollbackError extends Error {
  constructor(msg: string) {
    super(msg);
  }
}