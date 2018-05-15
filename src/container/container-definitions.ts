
import { Token } from 'typedi';
import * as Koa from 'koa';

export interface KoaAppRunnable {
  run(): void;
  koaInstance(): Koa;
}
export const KoaAppRunnerInjectable: Token<KoaAppRunnable> = new Token<KoaAppRunnable>();