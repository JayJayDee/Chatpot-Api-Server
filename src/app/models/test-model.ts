
import { Inject, Service } from 'typedi';
import * as ModelDefinitions from './model.definitions';
import * as DbDefinitions from '../rdbms/db.definitions';
import * as Errors from '../errors/default-errors';

@Service(ModelDefinitions.TestModelInjectable)
export class TestModel implements ModelDefinitions.TestModel {

  @Inject(DbDefinitions.RDBInjectable)
  private db: DbDefinitions.RDB;

  public async test(): Promise<any> {
    return await this.db.transaction(async (con) => {
      let resp1 = await con.queryAsync('UPDATE tx_test SET value=5 WHERE no=?', [1]);
      console.log(resp1);
      
      let resp2 = await con.queryAsync('SELECT 2');
      console.log(resp2);

      if (1 === 1) {
        throw new Errors.BaseError('test');
      }

      return resp2;
    });
  }
}