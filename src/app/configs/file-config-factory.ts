
import * as _ from 'lodash';
import { Container } from 'typedi';
import * as fs from 'fs';

import * as Errors from '../errors/init-errors';
import * as ConfigDefinitions from './config.definitions';
import * as LogConfigDefinitions from './config.log.definitions';
import * as LibDefinitions from '../libs/lib.definitions';

let envReader: LibDefinitions.EnvReader = null;

export class FileConfigFactory implements ConfigDefinitions.ConfigFactory {

  public produce(): ConfigDefinitions.Config {
    if (!envReader) {
      envReader = Container.get(LibDefinitions.EnvReaderInjectable);
    }

    let configPath: string = envReader.getEnvVariable('CFGPATH');
    if (!configPath) {
      let homeDirectory = process.env['HOME'];
      configPath = `${homeDirectory}/chatpot-conf.json`;
    }

    let configRawData: ConfigDefinitions.ConfigFile = this.readFromFile(configPath);

    let config: ConfigDefinitions.Config = {
      http: {
        port: configRawData.HTTP_PORT,
        cors: {
          enabled: configRawData.HTTP_CORS_ENABLED,
          origin: configRawData.HTTP_CORS_ORIGIN,
          allowMethods: configRawData.HTTP_CORS_ALLOW_METHODS
        }
      },
      db: {
        connection: {
          host: configRawData.DB_CONNECTION_HOST,
          user: configRawData.DB_CONNECTION_USER,
          password: configRawData.DB_CONNECTION_PASSWORD,
          port: configRawData.DB_CONNECTION_PORT,
          database: configRawData.DB_CONNECTION_DB
        },
        maxPoolSize: configRawData.DB_MAX_POOL_SIZE
      },
      log: {
        logLevel: configRawData.LOG_LEVEL        
      },
      cache: {
        enabled: configRawData.CACHE_ENABLED
      },
      env: ConfigDefinitions.Env.LOCAL
    };
    return config;
  }

  private readFromFile(configFilePath: string): ConfigDefinitions.ConfigFile {
    let content: Buffer = null;
    try {
      content = fs.readFileSync(configFilePath);
    } catch (err) {
      throw new Errors.ConfigurationError(`config file not found : ${configFilePath}`);
    }
    let rawData: string = content.toString();
    let configBody: any = null;
    try {
      configBody = JSON.parse(rawData);
    } catch (err) {
      throw new Errors.ConfigurationError('configuration file invalid');
    }
    
    let mustHaveKeys: Array<string> = [
      'HTTP_PORT', 'HTTP_CORS_ENABLED', 'HTTP_CORS_ORIGIN', 'HTTP_CORS_ALLOW_METHODS',
      'DB_CONNECTION_HOST', 'DB_CONNECTION_PORT', 'DB_CONNECTION_DB', 'DB_CONNECTION_USER', 'DB_CONNECTOIN_PASSWORD', 'DB_MAX_POOL_SIZE',
      'LOG_LEVEL', 'CACHE_ENABLED', 'ENV'
    ];
    let invalidKey = null;
    let valid: boolean = _.chain(mustHaveKeys)
      .map((key) => {
        if (configBody[key]) return true;
        invalidKey = key;
        return false;
      })
      .every(Boolean)
      .value();
    
    if (valid === false) {
      throw new Errors.ConfigurationError(`configuration:${invalidKey} missing in file:${configFilePath}`);
    }

    let configRawData: ConfigDefinitions.ConfigFile = {
      HTTP_PORT: configBody.HTTP_PORT as number,
      HTTP_CORS_ENABLED: configBody.HTTP_CORS_ENABLED as boolean,
      HTTP_CORS_ORIGIN: configBody.HTTP_CORS_ORIGIN as string,
      HTTP_CORS_ALLOW_METHODS: configBody.HTTP_CORS_ALLOW_METHODS as Array<string>,
      DB_CONNECTION_HOST: configBody.DB_CONNECTION_HOST as string,
      DB_CONNECTION_PORT: configBody.DB_CONNECTION_PORT as number,
      DB_CONNECTION_DB: configBody.DB_CONNECTION_DB as string,
      DB_CONNECTION_USER: configBody.DB_CONNECTION_USER as string,
      DB_CONNECTION_PASSWORD: configBody.DB_CONNECTION_PASSWORD as string,
      DB_MAX_POOL_SIZE: configBody.DB_MAX_POOL_SIZE as number,
      LOG_LEVEL: configBody.LOG_LEVEL as LogConfigDefinitions.LogLevel,
      CACHE_ENABLED: configBody.CACHE_ENABLED as boolean,
      ENV: configBody.ENV as ConfigDefinitions.Env
    };
    return configRawData;
  }
}
