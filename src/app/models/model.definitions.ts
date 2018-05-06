
import { Token } from 'typedi';

export interface TestModel {
  test(): string;
}
export const TestModelInjectable: Token<TestModel> = new Token<TestModel>();