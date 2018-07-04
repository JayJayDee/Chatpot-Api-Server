
import { Token } from 'typedi';

export interface EnvReader {
  getEnvVariable(key: string): string;
}
export const EnvReaderInjectable: Token<EnvReader> = new Token<EnvReader>();

export interface CredentialLib {
  generateMemberToken(memberNo: number): Promise<string>;
}
export const CredentialLibInjectable: Token<CredentialLib> = new Token<CredentialLib>();