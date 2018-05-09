
import { Service, Inject, Token, Container } from 'typedi';
import * as ConfigDefinitions from './config.definitions';
import * as HttpConfigDefinition from './config.http.definitions';
import * as ContainerDefinitions from '../../container/container-definitions';

export class LocalConfigFactory implements ContainerDefinitions.Factory {
  public produce(): ConfigDefinitions.Config {
    let config: ConfigDefinitions.Config = {
      http: {
        port: 8080
      },
      db: null,
      log: null,
      cache: null,
      env: ConfigDefinitions.Env.LOCAL
    };
    return config;
  }
}
