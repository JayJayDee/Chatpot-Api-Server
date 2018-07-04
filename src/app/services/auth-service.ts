
import { Inject, Service } from 'typedi';

import * as Definitions from './service.definitions';
import * as ModelDefinitions from '../models/model.definitions';
import * as LibDefinitions from '../libs/lib.definitions';

@Service(Definitions.AuthServiceInjectable)
export class AuthService implements Definitions.AuthService {

  @Inject(ModelDefinitions.AuthModelInjectable)
  private authModel: ModelDefinitions.AuthModel;

  @Inject(LibDefinitions.CredentialLibInjectable)
  private credentialLib: LibDefinitions.CredentialLib;

  public test(): string {
    return '';
  }
}