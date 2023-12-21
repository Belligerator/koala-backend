import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    /**
     * This is the root endpoint. It is redirected to the swagger page.
     * Get swagger page.
     */
    @ApiOperation({ summary: 'Return Swagger page with API description.' })
    @Get()
    public getSwagger(): boolean {
        return true;
    }
}
