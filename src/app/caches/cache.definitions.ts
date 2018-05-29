
import { Token } from 'typedi';

export interface CachePayload {
  proc(): Promise<any>;
  expires: number;
  key?: string;
}

export interface SimpleCacheSetParam {
  key: string;
  expires?: number;
  data: Object;
}

export interface SimpleCacheGetParam {
  key: string;
}

export interface CacheHandler {
  doCached(key: string, expires: number, proc: () => Promise<any>): Promise<any>;
}

export const CacheHandlerInjectable: Token<CacheHandler> = new Token<CacheHandler>();