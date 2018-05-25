
export class ConfigurationError extends Error {
  constructor(msg: string) {
    super(msg);
  }
}

export class MysqlConnectionError extends Error {
  constructor(msg: string) {
    super(msg);
  }
}