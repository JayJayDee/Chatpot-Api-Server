
import { Container, Service, Inject } from 'typedi';
import * as Koa from 'koa'; 
import * as Router from 'koa-router';
import * as _ from 'lodash'; 

import * as RunnableDefinitions from '../container/container-definitions';
import * as MiddlewareDefinitions from './middlewares/middleware.definitions';
import * as LoggerDefinitions from './logger/logger.definitions';
import * as EndpointDefinitions from './endpoints/endpoint.definitions';
import * as ConfigDefinitions from './configs/config.definitions';

@Service(RunnableDefinitions.KoaAppRunnerInjectable)
class DefaultKoaApp implements RunnableDefinitions.KoaAppRunnable {

  @Inject(LoggerDefinitions.LoggerInjectable)
  private logger: LoggerDefinitions.Logger;

  @Inject(ConfigDefinitions.ConfigInjectable)
  private config: ConfigDefinitions.Config;

  private middlewares: Array<MiddlewareDefinitions.Middleware>;
  private endpointProducers: Array<EndpointDefinitions.EndpointProducer>;
  private koa: Koa;

  constructor() {
    this.koa = new Koa();
  }
 
  public async run(): Promise<void> {
    this.middlewares = Container.getMany(MiddlewareDefinitions.MiddlewareInjectable);
    this.endpointProducers = Container.getMany(EndpointDefinitions.EndpointProducerInjectable);

    await this.registerBeforeMiddlewares(this.middlewares);
    await this.registerEndpoints(this.endpointProducers);
    await this.registerAfterMiddlewares(this.middlewares);

    this.koa.listen(this.config.http.port);
    this.logger.i(`webserver started at port:${this.config.http.port}`);
  }

  public koaInstance(): Koa {
    return this.koa;
  }

  private registerBeforeMiddlewares(middlewares: Array<MiddlewareDefinitions.Middleware>): void {
    _.chain(middlewares)
      .filter((elem: MiddlewareDefinitions.Middleware) => elem.position() === MiddlewareDefinitions.MiddlewarePosition.BeforeEndpoints)
      .sortBy((elem: MiddlewareDefinitions.Middleware) => elem.order())
      .value()
      .forEach((middleware: MiddlewareDefinitions.Middleware) => {
        if (middleware.name) {
          this.logger.i(`middleware registered -> ${middleware.name}`);
        }
        this.koa.use(middleware.middleware);
      });
  }

  private async registerAfterMiddlewares(middlewares: Array<MiddlewareDefinitions.Middleware>): Promise<void> {
    _.chain(middlewares)
      .filter((elem: MiddlewareDefinitions.Middleware) => elem.position() === MiddlewareDefinitions.MiddlewarePosition.AfterEndpoints)
      .sortBy((elem: MiddlewareDefinitions.Middleware) => elem.order())
      .value()
      .forEach((middleware: MiddlewareDefinitions.Middleware) => {
        if (middleware.name) {
          this.logger.i(`middleware registered -> ${middleware.name}`);
        }
        this.koa.use(middleware.middleware);
      });
    return;
  }

  private async registerEndpoints(producers: Array<EndpointDefinitions.EndpointProducer>): Promise<void> {
    let router: Router = new Router();
    _.each(producers, (producer: any) => {
      let endpoints: Array<EndpointDefinitions.Endpoint> = producer.endpoints;
      _.each(endpoints, (endpoint: EndpointDefinitions.Endpoint) => {
        router[endpoint.method](endpoint.url, endpoint.url, async (ctx, next) => {
          await producer[endpoint.procName](ctx, next);
        });
        this.logger.i(`endpoint mapped -> ${endpoint.method.toUpperCase()} ${endpoint.url}`)
      });
    }); 
    this.koa.use(router.routes());
    return;
  }
}

