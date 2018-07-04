
import { Service } from 'typedi';

import * as LibDefinitions from './lib.definitions';

export class CredentialLib implements LibDefinitions.CredentialLib {

  public generateMemberToken(memberNo: number): Promise<string> {
    return new Promise((resolve, reject) => {
      return resolve('token');
    });
  }
}