import { StatisticsCharacter } from 'src/models/interfaces/statistics-character.interface';
import { CharacterDTO } from '../character/character.dto';
import { GenderStatistics } from 'src/models/interfaces/gender-statistics.interface';
import { StatisticsNemesis } from 'src/models/interfaces/statistics-nemesis.interface';

/**
 * Data transfer object for statistics.
 * Contains all statistics about characters and nemeses.
 */
export class StatisticsDTO implements Partial<StatisticsCharacter>, Partial<StatisticsNemesis> {

    // Character statistics
    public count_characters: number;
    public average_age_character: number;
    public average_weight_characters: number;

    // Nemesis statistics
    public count_live_nemesis: number;
    public average_age_nemesis: number;
    
    // All statistics
    public count_all: number;
    public average_age_all: number;
    
    // Other statistics
    public gender: GenderStatistics;
    public characters: CharacterDTO[];

    constructor(statisticsCharacter: StatisticsCharacter, statisticsNemesis: StatisticsNemesis, characters: CharacterDTO[]) {
    
        // Character statistics
        this.count_characters = +statisticsCharacter.count_characters ?? 0;
        this.average_age_character = +statisticsCharacter.average_age_characters ?? 0;
        this.average_weight_characters = +statisticsCharacter.average_weight_characters;

        // Nemesis statistics
        this.count_live_nemesis = +statisticsNemesis.count_live_nemesis ?? 0;
        this.average_age_nemesis = +statisticsNemesis.average_age_nemesis ?? 0;

        // All statistics
        this.count_all = this.count_characters + this.count_live_nemesis;

        // Do not divide by zero
        if (this.count_all > 0) {
            this.average_age_all =
                (this.average_age_character * this.count_characters + this.average_age_nemesis * this.count_live_nemesis) / this.count_all;
        } else {
            this.average_age_all = 0;
        }

        // Other statistics
        this.gender = {
            male: +statisticsCharacter.count_male,
            female: +statisticsCharacter.count_female,
            other: +statisticsCharacter.count_other,
        };
        this.characters = characters ?? [];
    }

}
