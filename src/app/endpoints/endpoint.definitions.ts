
import { Container, Token } from 'typedi';
import { IRouterContext } from 'koa-router';

export enum HttpMethod {
  GET = 'get', POST = 'post', PUT = 'put', DELETE = 'delete'
}

export interface Endpoint {
  url: string;
  method: HttpMethod;
  procName: string;
  proc: (ctx: IRouterContext, next: () => Promise<any>) => Promise<any>;
}
export const EndpointInjectable: Token<Endpoint> = new Token<Endpoint>();

export function RestEndpoint(url: string, method?: HttpMethod) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    if (!method) {
      method = HttpMethod.GET
    }

    let endpoint: Endpoint = {
      url: url,
      method: method,
      procName: propertyKey,
      proc: descriptor.value
    };

    if (!target.endpoints) {
      target.endpoints = [];
    }
    target.endpoints.push(endpoint);
  }
}

export function RestEndpoints<T extends {new(...args:any[]): {}}> (OriginalClass: T) {
  return class extends OriginalClass {
    private endpoints: Array<Endpoint>;

    constructor(...args: any[]) {
      super();
      this.endpoints = OriginalClass.prototype.endpoints;
    }

    public getEndpoints(): Array<Endpoint> {
      return this.endpoints;
    }
  }
}

export interface EndpointProducer {}
export const EndpointProducerInjectable: Token<EndpointProducer> = new Token<EndpointProducer>();