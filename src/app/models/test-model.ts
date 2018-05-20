
import { Inject, Service } from 'typedi';
import * as ModelDefinitions from './model.definitions';
import * as DbDefinitions from '../rdbms/db.definitions';

@Service(ModelDefinitions.TestModelInjectable)
export class TestModel implements ModelDefinitions.TestModel {

  @Inject(DbDefinitions.RDBInjectable)
  private db: DbDefinitions.RDB;

  public async test(): Promise<any> {
    return await this.db.transaction(async (con) => {
      await this.db.promisify(con, con.query, ['SELECT 1']);
      await this.db.promisify(con, con.query, ['SELECT 2']);
      return 1;
    });
  }
}