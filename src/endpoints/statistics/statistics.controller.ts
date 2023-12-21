import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsDTO } from './statistics.dto';
import { ApiNotFoundResponse, ApiOperation } from '@nestjs/swagger';

@Controller('statistics')
export class StatisticsController {
    constructor(private readonly statisticsService: StatisticsService) {
    }

    /**
     * Get statistics about characters and nemeses. Return also all characters with their nemeses and secrets.
     * @returns     Statistics about characters and nemeses.
     */
    @ApiOperation({ summary: 'Get statistics about characters and nemeses. Return also all characters with their nemeses and secrets.' })
    @ApiNotFoundResponse({ description: 'Throws an exception if no character or nemesis exists.' })
    @Get()
    public async getStatistics(): Promise<StatisticsDTO> {
        return this.statisticsService.getStatistics();
    }

}
