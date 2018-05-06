
import { Inject, Service } from 'typedi';
import * as ModelDefinitions from './model.definitions';
import * as DbDefinitions from '../rdbms/db.definitions';

@Service(ModelDefinitions.TestModelInjectable)
export class TestModel implements ModelDefinitions.TestModel {

  @Inject(DbDefinitions.RDBInjectable)
  private db: DbDefinitions.RDB;

  public test(): string {
    return 'test model test';
  }
}