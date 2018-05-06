
import { Token } from 'typedi';
import * as Koa from 'koa';

export interface KoaAppRunnable {
  run(): void;
  koaInstance(): Koa;
}
export const KoaAppRunnerInjectable: Token<KoaAppRunnable> = new Token<KoaAppRunnable>();

export interface Factory {
  produce(): any;
}
export const FactoryInjectable: Token<Factory> = new Token<Factory>();