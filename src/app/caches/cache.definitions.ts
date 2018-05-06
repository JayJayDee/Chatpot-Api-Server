
import { Token } from 'typedi';

export interface CachePayload {
  proc(): Promise<any>;
  expires: number;
  key?: string;
}

export interface CacheHandler {
   doCachedOperation(payload: CachePayload): Promise<any>;
}
export const CacheHandlerInjectable: Token<CacheHandler> = new Token<CacheHandler>();