import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CharacterEntity } from './character.entity';
import { CharacterDTO } from './character.dto';
import { StatisticsCharacter } from 'src/models/interfaces/statistics-character.interface';
import { databaseFemaleGenderValues, databaseMaleGenderValues } from 'src/constants';

@Injectable()
export class CharacterService {
    constructor(
        @InjectRepository(CharacterEntity) private readonly characterRepository: Repository<CharacterEntity>,
    ) {}

    /**
     * Get all characters, with their nemeses and secrets.
     * @returns     List of all characters.
     */
    public async getAllCharacters(): Promise<CharacterDTO[]> {
        const entities: CharacterEntity[] = await this.characterRepository.find({
            relations: {
                nemesisList: {
                    secretList: true,
                },
            }
        });
        return entities.map((entity: CharacterEntity) => new CharacterDTO(entity));
    }

    /**
     * Get statistics about characters.
     * @returns     Statistics about characters or throws an exception if no character exists.
     */
    public async getCharacterStatistics(): Promise<StatisticsCharacter> {
        const characterStatistics: StatisticsCharacter | undefined = await this.characterRepository
            .createQueryBuilder('character')
            .select('COUNT(*)', 'count_characters')
            .addSelect(`COUNT(CASE WHEN gender IN (:...males) THEN 1 ELSE NULL END)`, 'count_male')
            .addSelect(`COUNT(CASE WHEN gender IN (:...females) THEN 1 ELSE NULL END)`, 'count_female')
            .addSelect(`COUNT(CASE WHEN gender IS NULL OR gender NOT IN (:...malesAndFemales) THEN 1 ELSE NULL END)`, 'count_other')
            .addSelect(`ROUND(AVG(date_part('year', AGE(born)))::numeric, 2)`, 'average_age_characters')
            .addSelect(`ROUND(AVG(weight), 2)`, 'average_weight_characters')
            .setParameter('males', databaseMaleGenderValues)
            .setParameter('females', databaseFemaleGenderValues)
            .setParameter('malesAndFemales', [...databaseMaleGenderValues, ...databaseFemaleGenderValues])
            .getRawOne();

        if (!characterStatistics) {
            throw new NotFoundException('Could not get character statistics');
        }

        return characterStatistics;
    }
}
