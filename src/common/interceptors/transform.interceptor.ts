import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Record<string, unknown>> {
  intercept(_: ExecutionContext, next: CallHandler): Observable<Record<string, unknown>> {
    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
        message: 'Request processed successfully',
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
