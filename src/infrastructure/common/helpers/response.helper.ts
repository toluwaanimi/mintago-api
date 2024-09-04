import { HttpException, HttpStatus } from '@nestjs/common';
import { ServiceInterface } from '../../../domain/adapters/service.interface';

export class HttpResponse {
  // static method to send success response
  static send<T = any, U = any>(
    message: string,
    data?: ServiceInterface<T, U>,
  ) {
    return {
      status: true,
      message,
      data: data && data.data ? data.data : undefined,
      meta: data && data.meta ? data.meta : undefined,
    };
  }

  // static method to send error response
  static error(
    code: string,
    message: string,
    content: Record<string, unknown>,
  ) {
    // construct response object
    const data = {
      status: false,
      message,
      data: content,
    };
    // throw HttpException with appropriate status code
    throw new HttpException(data, HttpStatus[code]);
  }
}
