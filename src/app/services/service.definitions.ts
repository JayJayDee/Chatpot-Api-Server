
import { Token } from 'typedi';

export interface AuthService {
  test(): string;
}
export const AuthServiceInjectable: Token<AuthService> = new Token<AuthService>();