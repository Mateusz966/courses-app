import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { ApiErrorCode } from 'app-types/global';
import { Request, Response } from 'express';

@Catch(BadRequestException)
export class ValidDtoFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    // @ts-ignore
    const messageArr = exception.response.message;

    if (Array.isArray(messageArr) && messageArr?.length > 0) {
      const responseMessageArr = [];
      for (const e of messageArr) {
        for (const f in e.constraints) {
          const error = {
            path: e.property,
            message: e.constraints[f],
          };
          responseMessageArr.push(error);
        }
      }
      response.status(status).json({
        errorCode: ApiErrorCode.OtherError,
        result: 0,
        message: responseMessageArr,
      });
    } else {
      response.status(status).json({
        // @ts-ignore
        errorCode: exception.response.errorCode,
        result: 0,
      });
    }
  }
}
