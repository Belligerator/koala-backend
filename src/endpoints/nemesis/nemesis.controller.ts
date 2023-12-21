import { Controller, Get } from '@nestjs/common';
import { NemesisService } from './nemesis.service';
import { NemesisDTO } from './nemesis.dto';

@Controller('nemesis')
export class NemesisController {
    constructor(private readonly nemesisService: NemesisService) {}

    /**
     * Get all nemesis, just basic data, no relations.
     * @returns     List of all nemeses.
     */
    @Get()
    public async getAllNemeses(): Promise<NemesisDTO[]> {
        return this.nemesisService.getAllNemeses();
    }
}
