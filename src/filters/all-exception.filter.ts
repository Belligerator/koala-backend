import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, Logger, Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { ContextType, HttpArgumentsHost } from '@nestjs/common/interfaces/features/arguments-host.interface';
import { ErrorResponse } from 'src/models/dtos/error-response.dto';
import { ExpressAdapter } from '@nestjs/platform-express';

/**
 * Default error handler catching all but HTTP exceptions. Catches unexpected errors and returns a generic error message.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {
    }

    public catch(exception: Error, host: ArgumentsHost): void {
        const httpAdapter: AbstractHttpAdapter<ExpressAdapter> = this.httpAdapterHost.httpAdapter;

        const ctx: HttpArgumentsHost = host.switchToHttp();
        const response: Response = ctx.getResponse();
        const request: Request = ctx.getRequest();
        const status: number = HttpStatus.INTERNAL_SERVER_ERROR;

        const responseBody: ErrorResponse = {
            statusCode: status,
            message: 'Internal server error occurred, please contact the administrator.',
            error: exception['message'],
        };
        httpAdapter.reply(response, responseBody, status);

        // Log the error. It is better to use a logger like winston.
        console.error(`HttpException ${status}: ${request.url}`, exception['stack']);

    }
}
