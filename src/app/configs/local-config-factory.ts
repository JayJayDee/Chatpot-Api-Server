
import * as ConfigDefinitions from './config.definitions';

export class LocalConfigFactory implements ConfigDefinitions.ConfigFactory {
  public produce(): ConfigDefinitions.Config {
    let config: ConfigDefinitions.Config = {
      http: {
        port: 8080
      },
      db: {
        connection: {
          host: '127.0.0.1',
          port: 3306,
          database: 'chatpot-v7-dev',
          user: 'root',
          password: null
        },
        maxPoolSize: 10
      },
      log: null,
      cache: null,
      env: ConfigDefinitions.Env.LOCAL
    };
    return config;
  }
}
