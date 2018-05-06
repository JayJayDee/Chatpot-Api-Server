
import * as MemberTypes from '../common-types/member.types';
import { Token } from 'typedi';

export interface TestModel {
  test(): string;
}
export const TestModelInjectable: Token<TestModel> = new Token<TestModel>();

export interface AuthModel {
  authenticate(payload: MemberTypes.Auth): Promise<MemberTypes.Member>;
}
export const AuthModelInjectable: Token<AuthModel> = new Token<AuthModel>();