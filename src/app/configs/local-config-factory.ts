
import { Service, Inject, Token, Container } from 'typedi';
import * as ConfigDefinitions from './config.definitions';
import * as HttpConfigDefinition from './config.http.definitions';
import * as ContainerDefinitions from '../../container/container-definitions';

@Service({id: ContainerDefinitions.FactoryInjectable, multiple: true})
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

let factory: LocalConfigFactory = new LocalConfigFactory();
Container.set(ConfigDefinitions.ConfigInjectable, new LocalConfigFactory().produce());
