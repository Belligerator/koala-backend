import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { CharacterService } from '../character.service';
import { CharacterEntity } from '../character.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CharacterDTO } from '../character.dto';
import { NemesisEntity } from '../../nemesis/nemesis.entity';
import { NemesisDTO } from '../../nemesis/nemesis.dto';
import { SecretEntity } from '../../secret/secret.entity';
import { SecretDTO } from '../../secret/secret.dto';
import { StatisticsCharacter } from 'src/models/interfaces/statistics-character.interface';
import { NotFoundException } from '@nestjs/common';

describe('CharacterService', () => {

    let characterService: CharacterService;
    let characterRepository: Repository<CharacterEntity>;
    // eslint-disable-next-line @typescript-eslint/ban-types
    const characterRepositoryToken: string | Function = getRepositoryToken(CharacterEntity);

    // Mock data.
    const mockCharacterEntity: CharacterEntity = {
        id: 1,
        name: 'Test',
        ability: 'Test ability',
        minimalDistance: 1,
        born: new Date(2023, 1, 1),
        beerConsumption: 1,
        knowsTheAnswer: true,
        gender: 'male',
        inSpaceSince: new Date(2023, 2, 2),
        weight: 1
    };

    const mockCharacterDTO: CharacterDTO = {
        id: 1,
        name: 'Test',
        ability: 'Test ability',
        minimal_distance: 1,
        born: new Date(2023, 1, 1),
        beer_consumption: 1,
        knows_the_answer: true,
        gender: 'male',
        in_space_since: new Date(2023, 2, 2),
        weight: 1
    };

    const mockNemesisEntity: NemesisEntity = {
        id: 1,
        isAlive: true,
        years: 1,
        characterId: 1,
    };

    const mockNemesisDTO: NemesisDTO = {
        id: 1,
        is_alive: true,
        years: 1,
        character_id: 1,
    };

    const mockSecretEntity: SecretEntity = {
        id: 1,
        nemesisId: 1,
        secretCode: 1234567890,
    };

    const mockSecretDTO: SecretDTO = {
        id: 1,
        nemesis_id: 1,
        secret_code: 1234567890,
    };

    const mockStatisticsCharacter: StatisticsCharacter = {
        average_age_characters: 10,
        average_weight_characters: 10,
        count_characters: 10,
        count_female: 2,
        count_male: 6,
        count_other: 2,
    };

    beforeEach(async () => {
    
        // Mock the repository and service.
        const model: TestingModule = await Test.createTestingModule({
            providers: [
                CharacterService,
                {
                    provide: characterRepositoryToken,
                    useClass: Repository,
                },
            ],
        }).compile();
    
        characterService = model.get<CharacterService>(CharacterService);
        characterRepository = model.get<Repository<CharacterEntity>>(characterRepositoryToken);
    });

    it('should be defined', () => {
        expect(characterService).toBeDefined();
        expect(characterRepository).toBeDefined();
    });

    describe('getAllCharacters', () => {
        it('should return an array of characters', async () => {
            
            // Copy the mock data and add the relations.
            const dbData: CharacterEntity[] = [{
                ...mockCharacterEntity,
                nemesisList: [{
                    ...mockNemesisEntity,
                    secretList: [mockSecretEntity],
                }],
            }];

            const expectedDTO: CharacterDTO[] = [{
                ...mockCharacterDTO,
                nemesis_list: [{
                    ...mockNemesisDTO,
                    secret_list: [mockSecretDTO],
                }],
            }];

            jest.spyOn(characterRepository, 'find').mockResolvedValue(dbData);

            const result: CharacterDTO[] = await characterService.getAllCharacters();

            expect(result).toEqual(expectedDTO);

            // We want characters with their nemeses and secrets.
            expect(characterRepository.find).toHaveBeenCalledWith({
                relations: {
                    nemesisList: {
                        secretList: true,
                    },
                }
            });
        });
    });

    describe('getCharacterStatistics', () => {

        it('should return statistics about characters', async () => {

            // Mock the query builder.
            jest.spyOn(characterRepository, 'createQueryBuilder').mockImplementation(
                jest.fn().mockImplementation(() => ({
                    select: jest.fn().mockReturnThis(),
                    addSelect: jest.fn().mockReturnThis(),
                    setParameter: jest.fn().mockReturnThis(),
                    getRawOne: (): Promise<StatisticsCharacter | undefined> => Promise.resolve(mockStatisticsCharacter)
                }))
            );

            const result: StatisticsCharacter = await characterService.getCharacterStatistics();

            expect(result).toEqual(mockStatisticsCharacter);
        });

        it('should throw NotFoundException because no character exists', async () => {

            // Mock the query builder. Return undefined - no character exists.
            jest.spyOn(characterRepository, 'createQueryBuilder').mockImplementation(
                jest.fn().mockImplementation(() => ({
                    select: jest.fn().mockReturnThis(),
                    addSelect: jest.fn().mockReturnThis(),
                    setParameter: jest.fn().mockReturnThis(),
                    getRawOne: (): Promise<StatisticsCharacter | undefined> => Promise.resolve(undefined)
                }))
            );

            const result: Promise<StatisticsCharacter> = characterService.getCharacterStatistics();

            expect(result).rejects.toThrow(NotFoundException);
        });
    });
});
