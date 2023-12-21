import { Controller, Get } from '@nestjs/common';
import { NemesisService } from './nemesis.service';
import { NemesisDTO } from './nemesis.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('nemesis')
export class NemesisController {
    constructor(private readonly nemesisService: NemesisService) {}

    /**
     * Get all nemesis, with their character and secrets.
     * @returns     List of all nemeses.
     */
    @ApiOperation({ summary: 'Get all nemesis, with their character and secrets.' })
    @Get()
    public async getAllNemeses(): Promise<NemesisDTO[]> {
        return this.nemesisService.getAllNemeses();
    }
}
