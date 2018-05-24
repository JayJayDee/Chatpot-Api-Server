
import { Inject, Service } from 'typedi';
import * as ModelDefinitions from './model.definitions';
import * as DbDefinitions from '../rdbms/db.definitions';

@Service(ModelDefinitions.TestModelInjectable)
export class TestModel implements ModelDefinitions.TestModel {

  @Inject(DbDefinitions.RDBInjectable)
  private db: DbDefinitions.RDB;

  public async test(): Promise<any> {
    return await this.db.transaction(async (con) => {
      let resp1 = await con.queryAsync('SELECT ?', [1]);
      console.log(resp1);
      
      let resp2 = await con.queryAsync('SELECT 2');
      console.log(resp2);
      return 1;
    });
  }
}