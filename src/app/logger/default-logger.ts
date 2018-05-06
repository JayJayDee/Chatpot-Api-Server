
import { Service } from 'typedi';

import * as Definitions from './logger.definitions';

@Service(Definitions.LoggerInjectable)
export class DefaultLogger implements Definitions.Logger {
  public i(msg: string | object) {
    console.log('INFO ' + msg);
  }
  
  public e(msg: string | object) {
    console.log('ERR ' + msg);
  }

  public d(msg: string | object) {
    console.log('DBG ' + msg);
  }
}