import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SecretEntity } from './secret.entity';
import { SecretDTO } from './secret.dto';

@Injectable()
export class SecretService {
    constructor(
        @InjectRepository(SecretEntity) private readonly secretRepository: Repository<SecretEntity>,
    ) {}

    /**
     * Get all secrets, with their nemesis and his character.
     * @returns     List of all secrets.
     */
    public async getAllSecrets(): Promise<SecretDTO[]> {
        const entities: SecretEntity[] = await this.secretRepository.find({
            relations: {
                nemesis: {
                    character: true,
                }
            }
        });
        return entities.map((entity: SecretEntity) => new SecretDTO(entity));
    }
}
