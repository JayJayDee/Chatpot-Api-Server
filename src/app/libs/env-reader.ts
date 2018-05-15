
import { Service } from 'typedi';
import * as LibDefinitions from './lib.definitions';

@Service(LibDefinitions.EnvReaderInjectable)
export class EnvReader implements LibDefinitions.EnvReader {

  public getEnvVariable(key: string): string {
    return null;
  }
}