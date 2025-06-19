import { HttpStatus } from '@nestjs/common';

export interface ResultError {
  message: string;
  httpStatus: HttpStatus;
}

export class Result<T> {
  private constructor(
    private readonly _data?: T,
    private readonly _error?: ResultError,
  ) {}

  static sucess<T>(data: T): Result<T> {
    return new Result(data);
  }

  static fail<T>(error: ResultError): Result<T> {
    return new Result<T>(undefined, error);
  }

  get data(): T | undefined {
    return this._data;
  }

  get error(): ResultError | undefined {
    return this._error;
  }

  isFail(): boolean {
    return this._error !== undefined;
  }

  isSuccess(): boolean {
    return this._data !== undefined && this._error === undefined;
  }
}
