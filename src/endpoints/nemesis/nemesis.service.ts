import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NemesisEntity } from './nemesis.entity';
import { NemesisDTO } from './nemesis.dto';

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
}
