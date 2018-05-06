
import { Service } from 'typedi';
import { IRouterContext } from 'koa-router';

import * as MiddlewareDefinitions from './middleware.definitions';
import * as Errors from '../errors/default-errors';

@Service({id: MiddlewareDefinitions.MiddlewareInjectable, multiple: true})
export class ExceptionMiddleware implements MiddlewareDefinitions.Middleware {

  public name: string;

  constructor() {
    this.name = 'exception-middleware';
  }

  public async middleware (ctx: IRouterContext, next: () => Promise<any>): Promise<any> {
    try {
      await next();
    } catch (err) {
      if (err instanceof Errors.BaseError) {
        let statusCode = 400;
        if (err instanceof Errors.AuthError) {
          statusCode = 401;
        }

        ctx.type = 'json';
        ctx.status = statusCode;
        ctx.body = {
          success: false,
          data: null,
          error: {
            code: err.getPayload().code,
            description: err.getPayload().description
          }
        };
      } else {
        throw err;   
      }
    }
  }

  public order(): number {
    return -999;
  }

  public position(): MiddlewareDefinitions.MiddlewarePosition {
    return MiddlewareDefinitions.MiddlewarePosition.BeforeEndpoints;
  }
}