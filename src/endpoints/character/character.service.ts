import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CharacterEntity } from './character.entity';
import { CharacterDTO } from './character.dto';

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
}
