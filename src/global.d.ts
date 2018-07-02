
import { Container, ContainerInstance } from 'typedi';

declare global {
  namespace NodeJS {
    interface Global {
      container: Container;
    }
  }
}

declare module 'koa-router' {
  interface IRouterContext {
    sendApiSuccess(payload: any): Promise<any>;
  }
}