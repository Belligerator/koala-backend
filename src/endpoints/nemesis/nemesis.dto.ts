import { CharacterDTO } from '../character/character.dto';
import { SecretDTO } from '../secret/secret.dto';
import { SecretEntity } from '../secret/secret.entity';
import { NemesisEntity } from './nemesis.entity';

export class NemesisDTO {

    public id: number;
    public is_alive: boolean;
    public years?: number;
    public character_id?: number;
    public character?: CharacterDTO;
    public secret_list?: SecretDTO[];

    constructor(nemesisEntity: NemesisEntity) {
        this.id = nemesisEntity.id;
        this.is_alive = nemesisEntity.isAlive;
        this.years = nemesisEntity.years;
        this.character_id = nemesisEntity.characterId;

        if (nemesisEntity.character) {
            this.character = new CharacterDTO(nemesisEntity.character);
        }

        if (nemesisEntity.secretList) {
            this.secret_list = nemesisEntity.secretList.map((secretEntity: SecretEntity) => new SecretDTO(secretEntity));
        }
    }

}
