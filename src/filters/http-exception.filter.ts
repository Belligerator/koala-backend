import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Inject, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { ContextType, HttpArgumentsHost } from '@nestjs/common/interfaces/features/arguments-host.interface';

/**
 * Error handler catching only HTTP exceptions.
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    constructor() { }

    public catch(exception: HttpException, host: ArgumentsHost): void {
        const ctx: HttpArgumentsHost = host.switchToHttp();
        const response: Response = ctx.getResponse();
        const request: Request = ctx.getRequest();
        const status: number = exception.getStatus();

        response
            .status(status)
            .json({
                statusCode: status,
                message: exception.message,
                error: exception.message,
            });

        // Log the error. It is better to use a logger like winston.
        console.error(`HttpException ${status}: ${request.url}`, exception['stack']);

    }
}
