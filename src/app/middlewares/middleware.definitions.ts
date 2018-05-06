
import { Token } from 'typedi';

import { IRouterContext } from 'koa-router';

export enum MiddlewarePosition {
  BeforeEndpoints = 'BeforeEndpoints', AfterEndpoints = 'AfterEndpoints'
}

export interface Middleware {
  name?: string;
  middleware(ctx: IRouterContext, next: () => Promise<any>): Promise<any>;
  order(): number;
  position(): MiddlewarePosition;
}
export const MiddlewareInjectable: Token<Middleware> = new Token<Middleware>();