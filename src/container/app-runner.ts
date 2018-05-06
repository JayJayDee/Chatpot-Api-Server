
import { Container, ContainerInstance } from 'typedi'; 
import * as fs from 'fs';
import * as glob from 'glob';
import * as _ from 'lodash';

import * as ContainerDefinitions from './container-definitions';

function loadConfiguration(): any {
  let content = fs.readFileSync(__dirname + '/configurations/scan.json').toString();
  return JSON.parse(content);
}

function readModulePaths(appRoot: string, scanPatterns: Array<string>): Promise<Array<string>> {
  return new Promise((resolve, reject) => {
    Promise.all(_.map(scanPatterns, (pattern) => promisifiedGlob(appRoot + pattern, {})))
    .then((resp: Array<any>) => {
      resolve(_.flatten(resp) as Array<string>);
    })
    .catch((err) => {
      reject(err);
    });
  });
}

function promisifiedGlob(pattern: string, options: any): Promise<Array<String>> {
  return new Promise((resolve, reject) => {
    glob(__dirname + '/' + pattern, options, (err, files) => {
      if (err) {
        return reject(err);
      }
      resolve(_.filter(files, (path) => {
        return path.includes('.js') && !path.includes('.map');
      }));
    });
  });
}


let conf = loadConfiguration();
let scanPatterns: Array<string> = conf.scan_patterns;
let appRoot: string = conf.app_root;

readModulePaths(appRoot, scanPatterns)
.then((modulePaths: Array<string>) => {
  let promises = _.map(modulePaths, (modulePath) => import(modulePath));
  return Promise.all(promises);
})
.then((importes) => {
  let app: ContainerDefinitions.KoaAppRunnable = Container.get(ContainerDefinitions.KoaAppRunnerInjectable);
  app.run();
})
.catch((err) => {
  console.error(err);
})
