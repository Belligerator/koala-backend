import { NemesisDTO } from '../nemesis/nemesis.dto';
import { SecretEntity } from './secret.entity';

export class SecretDTO {

    public id: number;
    public secret_code: number;
    public nemesis_id: number;
    public nemesis?: NemesisDTO;

    constructor(secretEntity: SecretEntity) {
        this.id = secretEntity.id;
        this.secret_code = secretEntity.secretCode;
        this.nemesis_id = secretEntity.nemesisId;

        if (secretEntity.nemesis) {
            this.nemesis = new NemesisDTO(secretEntity.nemesis);
        }
    }
}
