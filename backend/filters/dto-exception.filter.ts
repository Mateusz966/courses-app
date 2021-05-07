import {ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException} from '@nestjs/common';
import { ApiErrorCode } from 'app-types/global';
import { Request, Response } from 'express';

@Catch(BadRequestException)
export class ValidDtoFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const messageArr = exception['response'].message;
        const responseMessageArr = [];

        for (const e of messageArr) {
            for (const f in e.constraints) {
                let error = {
                    path: e.property,
                    message: e.constraints[f],
                };
                responseMessageArr.push(error);
            }
        }
        response
            .status(status)
            .json({
                error_code: ApiErrorCode.OtherError,
                result: 0,
                message: responseMessageArr,
            });
    }
}
