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
     * Get all secrets, just basic data, no relations.
     * @returns     List of all secrets.
     */
    public async getAllSecrets(): Promise<SecretDTO[]> {
        const entities: SecretEntity[] = await this.secretRepository.find();
        return entities.map((entity: SecretEntity) => new SecretDTO(entity));
    }
}
