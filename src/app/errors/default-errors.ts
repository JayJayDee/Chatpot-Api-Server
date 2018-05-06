
export interface ErrorPayload {
  code: string;
  description: string;
}

export class BaseError extends Error {
  private payload: ErrorPayload;

  constructor(payload: string | ErrorPayload) {
    if (payload instanceof String) {
      super(payload as string);
    } else {
      super((payload as ErrorPayload).code);
      this.payload = payload as ErrorPayload;
    }
  }

  public getPayload(): ErrorPayload {
    return this.payload;
  }
}

export class AuthError extends BaseError {
  constructor() {
    super({
      code: 'UNAUTHORIZED',
      description: 'unauthorized access'
    });
  }
}