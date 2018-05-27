
import { Service, Inject } from 'typedi';

import * as MemberTypes from '../common-types/member.types';
import * as ModelDefinitions from './model.definitions';
import * as DbDefinitions from '../rdbms/db.definitions';

@Service(ModelDefinitions.AuthModelInjectable)
export class AuthModel implements ModelDefinitions.AuthModel {

  @Inject(DbDefinitions.RDBInjectable)
  private db: DbDefinitions.RDB;

  public async authenticate(payload: MemberTypes.Auth): Promise<MemberTypes.Member> {
    return await this.db.job(async (connection: any) => {
      return await connection.queryAsync('SELECT 1');
    });
  }
}