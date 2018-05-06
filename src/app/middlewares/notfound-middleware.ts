

import { Service } from 'typedi';
import { IRouterContext } from 'koa-router';

import * as MiddlewareDefinitions from './middleware.definitions';

@Service({id: MiddlewareDefinitions.MiddlewareInjectable, multiple: true})
export class NotfoundMiddleware implements MiddlewareDefinitions.Middleware {

  public name: string;

  constructor() {
    this.name = 'not-found-middleware';
  }

  public async middleware(ctx: IRouterContext, next: () => Promise<any>): Promise<any> {      
    ctx.body = {
      success: false,
      data: null,
      error: {
        code: 'NOT_FOUND',
        description: 'resource not found for url'
      }
    }
    ctx.status = 404;
    ctx.type = 'json';
  }

  public order(): number {
    return 999; 
  }

  public position(): MiddlewareDefinitions.MiddlewarePosition {
    return MiddlewareDefinitions.MiddlewarePosition.AfterEndpoints;
  }
}