
import { Container } from 'typedi';
import * as fs from 'fs';

import * as Errors from '../errors/init-errors';
import * as ConfigDefinitions from './config.definitions';
import * as LibDefinitions from '../libs/lib.definitions';

let envReader: LibDefinitions.EnvReader = null;

export class FileConfigFactory implements ConfigDefinitions.ConfigFactory {

  public produce(): ConfigDefinitions.Config {
    if (!envReader) {
      envReader = Container.get(LibDefinitions.EnvReaderInjectable);
    }

    let configPath: string = envReader.getEnvVariable('CFGPATH');
    if (!configPath) {
      configPath = '$HOME/chatpot-conf.json';
    }

    let configRawData: ConfigDefinitions.ConfigFile = this.readFromFile(configPath);

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

  private readFromFile(configFilePath: string): ConfigDefinitions.ConfigFile {
    let content = null;
    try {
      content = fs.readFileSync(configFilePath);
    } catch (err) {
      throw new Errors.ConfigurationError(`config file not found : ${configFilePath}`);
    }
    
    return null;
  }
}
