import { convertStringToGender } from 'src/models/enums/gender.enum';
import { NemesisEntity } from '../nemesis/nemesis.entity';
import { CharacterEntity } from './character.entity';
import { NemesisDTO } from '../nemesis/nemesis.dto';

export class CharacterDTO {

    public id: number;
    public name: string;
    public gender?: string;
    public ability: string;
    public minimal_distance: number;
    public weight?: number;
    public born: Date;
    public in_space_since?: Date;
    public beer_consumption: number;
    public knows_the_answer: boolean;
    public nemesis_list?: NemesisDTO[];

    constructor(characterEntity: CharacterEntity) {
        this.id = characterEntity.id;
        this.name = characterEntity.name;
        this.gender = convertStringToGender(characterEntity.gender);
        this.ability = characterEntity.ability;
        this.minimal_distance = characterEntity.minimalDistance;
        this.weight = characterEntity.weight;
        this.born = characterEntity.born;
        this.in_space_since = characterEntity.inSpaceSince;
        this.beer_consumption = characterEntity.beerConsumption;
        this.knows_the_answer = characterEntity.knowsTheAnswer;

        if (characterEntity.nemesisList) {
        this.nemesis_list = characterEntity.nemesisList.map((nemesisEntity: NemesisEntity) => new NemesisDTO(nemesisEntity));
        }
    }
}
