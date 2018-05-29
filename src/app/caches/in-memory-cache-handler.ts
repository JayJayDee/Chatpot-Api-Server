import { Service, Inject } from 'typedi';

import * as CacheDefinitions from "./cache.definitions";
import * as ConfigDefinitions from '../configs/config.definitions';

@Service({id: CacheDefinitions.CacheHandlerInjectable, multiple: true})
export class InMemoryCacheHandler implements CacheDefinitions.CacheHandler {

  @Inject(ConfigDefinitions.ConfigInjectable)
  private config: ConfigDefinitions.Config; 
    
  public async doCached(key: string, expires: number, proc: () => Promise<any>): Promise<any> {
    return null;
  }

  public async set(param: CacheDefinitions.SimpleCacheSetParam): Promise<any> {
    return null;
  }

  public async get(key: string): Promise<any> {
    return null;
  }
}