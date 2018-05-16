
import * as ConfigDefinitions from './config.definitions';

export interface HttpCorsConfig {
  enabled: boolean;
  origin?: string;
  allowMethods?: Array<string>;
}

export interface HttpConfig {
  port: number;
  cors?: HttpCorsConfig;
}
