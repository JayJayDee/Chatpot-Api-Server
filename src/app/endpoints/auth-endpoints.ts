
import { Container, Service, Inject } from 'typedi';
import { IRouterContext } from 'koa-router';

import * as EndpointDefinitions from './endpoint.definitions';
import { HttpMethod } from './endpoint.definitions';
import * as LoggerDefinitions from '../logger/logger.definitions';
import * as ModelDefinitions from '../models/model.definitions';

import * as Errors from '../errors/default-errors';

@Service({id: EndpointDefinitions.EndpointProducerInjectable, multiple: true})
@EndpointDefinitions.RestEndpoints
export class AuthEndpoints implements EndpointDefinitions.EndpointProducer {

  @Inject(LoggerDefinitions.LoggerInjectable)
  private logger: LoggerDefinitions.Logger;

  @Inject(ModelDefinitions.TestModelInjectable)
  private testModel: ModelDefinitions.TestModel;

  @EndpointDefinitions.RestEndpoint('/auth/default', HttpMethod.POST)
  public async defaultAuth(ctx: IRouterContext, next: () => Promise<any>) {

    let resp = await this.testModel.test();
    console.log(resp); 

    ctx.sendApiSuccess({
      test: 'auth-default'
    });
  }

  @EndpointDefinitions.RestEndpoint('/auth/email', HttpMethod.POST)
  public async emailAuth(ctx: IRouterContext, next: () => Promise<any>) {
    ctx.sendApiSuccess({
      test: 'auth-email'
    });
  }
}
