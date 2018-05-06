
import { Service } from 'typedi';

import * as Definitions from './service.definitions';

@Service(Definitions.AuthServiceInjectable)
export class AuthService implements Definitions.AuthService {
  public test(): string {
    return '';
  }
}