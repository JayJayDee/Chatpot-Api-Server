
import { Service } from 'typedi';
import { IRouterContext } from 'koa-router';

import * as MiddlewareDefinitions from './middleware.definitions';

@Service({id: MiddlewareDefinitions.MiddlewareInjectable, multiple: true})
export class ValidationMiddleware implements MiddlewareDefinitions.Middleware {

  public name: string;
  
  constructor() {
    this.name = 'validation-middleware';
  }

  public async middleware(ctx: IRouterContext, next: () => Promise<any>): Promise<any> {      
    // TODO: to be implemented
    return next();
  }

  public order(): number {
    return 2;
  }

  public position(): MiddlewareDefinitions.MiddlewarePosition {
    return MiddlewareDefinitions.MiddlewarePosition.BeforeEndpoints;
  }
}