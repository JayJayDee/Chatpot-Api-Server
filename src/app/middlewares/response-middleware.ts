
import { Service } from 'typedi';
import { IRouterContext } from 'koa-router';

import * as MiddlewareDefinitions from './middleware.definitions';

@Service({id: MiddlewareDefinitions.MiddlewareInjectable, multiple: true})
export class ResponseMiddleware implements MiddlewareDefinitions.Middleware {

  public name: string;

  constructor() {
    this.name = 'response-middleware';
  }

  public async middleware(ctx: IRouterContext, next: () => Promise<any>): Promise<any> {
    ctx.sendApiSuccess = function(resp) {
      ctx.type = 'json'; 
      ctx.body = {
        success: true,
        data: resp,
        error: null
      }
      ctx.status = 200;
    }
    return next();
  }

  public order(): number {
    return 1; 
  }

  public position(): MiddlewareDefinitions.MiddlewarePosition {
    return MiddlewareDefinitions.MiddlewarePosition.BeforeEndpoints;
  }
}