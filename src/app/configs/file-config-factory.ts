
import * as ConfigDefinitions from './config.definitions';

export class FileConfigFactory implements ConfigDefinitions.ConfigFactory {
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
