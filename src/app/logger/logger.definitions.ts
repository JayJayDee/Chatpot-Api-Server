
import { Token } from 'typedi';

export interface Logger {
  i(msg: string | object): void;
  e(msg: string | object): void;
  d(msg: string | object): void;
}

export const LoggerInjectable: Token<Logger> = new Token<Logger>();
