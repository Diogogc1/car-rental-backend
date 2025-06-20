import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Result } from 'src/shared/utils';

@Injectable()
export class ResultInterceptor<T> implements NestInterceptor<Result<T> | T, T> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
    return next.handle().pipe(
      map((data: Result<T> | T) => {
        if (data instanceof Result) {
          if (data.isFail()) {
            const error = data.error
              ? data.error
              : {
                  message: 'Unknown error',
                  httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
                };
            throw new HttpException(error.message, error.httpStatus);
          }

          return data.data;
        }
        return data;
      }),
    ) as Observable<T>;
  }
}
