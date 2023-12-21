import { Injectable } from '@nestjs/common';
import { StatisticsDTO } from './statistics.dto';
import { StatisticsNemesis } from 'src/models/statistics-nemesis.interface';
import { StatisticsCharacter } from 'src/models/statistics-character.interface';
import { CharacterDTO } from '../character/character.dto';
import { CharacterService } from '../character/character.service';
import { NemesisService } from '../nemesis/nemesis.service';

@Injectable()
export class StatisticsService {

    constructor(
        private readonly characterService: CharacterService,
        private readonly nemesisService: NemesisService,
    ) {}

    /**
     * Get statistics about characters and nemeses. Return also all characters with their nemeses and secrets.
     * @returns     Statistics about characters and nemeses.
     */
    public async getStatistics(): Promise<StatisticsDTO> {

        const characterStatistics: StatisticsCharacter = await this.characterService.getCharacterStatistics();
        const nemesisStatistics: StatisticsNemesis = await this.nemesisService.getNemesisStatistics();
        const characters: CharacterDTO[] = await this.characterService.getAllCharacters();

        return new StatisticsDTO(characterStatistics, nemesisStatistics, characters);
    }
}
