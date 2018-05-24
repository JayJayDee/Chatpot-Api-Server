
import { PoolConnection } from 'mysql';

export interface ExtendedMysqlConnection extends PoolConnection {
  queryAsync(query: string, params?: Array<any>): Promise<any>;
}