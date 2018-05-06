
import * as ConfigDefinitions from './config.definitions';

export enum LogLevel {
  DEBUG = 'DEBUG', INFO = 'INFO', ERROR = 'ERROR'
}

export interface LogConfig {
  logLevel: LogLevel
}