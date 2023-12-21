import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NemesisEntity } from './nemesis.entity';
import { NemesisDTO } from './nemesis.dto';
import { StatisticsNemesis } from 'src/models/interfaces/statistics-nemesis.interface';

@Injectable()
export class NemesisService {
    constructor(
        @InjectRepository(NemesisEntity) private readonly nemesisRepository: Repository<NemesisEntity>,
    ) {}

    /**
     * Get all nemesis, with their character and secrets.
     * @returns     List of all nemeses.
     */
    public async getAllNemeses(): Promise<NemesisDTO[]> {
        const entities: NemesisEntity[] = await this.nemesisRepository.find({
            relations: {
                character: true,
                secretList: true,
            }
        });
        return entities.map((entity: NemesisEntity) => new NemesisDTO(entity));
    }

    /**
     * Get statistics about nemeses. Only nemeses that are alive are counted.
     * @returns     Statistics about nemeses or throws an exception if no nemesis exists.
     */
    public async getNemesisStatistics(): Promise<StatisticsNemesis> {
        const nemesisStatistics: StatisticsNemesis | undefined = await this.nemesisRepository
            .createQueryBuilder('nemesis')
            .select('COUNT(*)', 'count_live_nemesis')
            .addSelect(`ROUND(AVG(years), 2)`, 'average_age_nemesis')
            .where('nemesis.is_alive = true')
            .getRawOne();

        if (!nemesisStatistics) {
            throw new NotFoundException('Could not get nemesis statistics');
        }

        return nemesisStatistics;
    }
}
