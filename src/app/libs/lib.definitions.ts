
import { Token } from 'typedi';

export interface EnvReader {
  getEnvVariable(key: string): string;
}
export const EnvReaderInjectable: Token<EnvReader> = new Token<EnvReader>();