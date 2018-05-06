
import * as ConfigDefinitions from './config.definitions';

export interface HttpCorsConfig {
  enable: boolean;
  origin?: string;
  allowMethods?: string;
}

export interface HttpConfig {
  port: number;
  cors?: HttpCorsConfig;
}
