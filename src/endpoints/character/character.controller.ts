import { Controller, Get } from "@nestjs/common";
import { CharacterService } from "./character.service";
import { CharacterDTO } from "./character.dto";

@Controller('character')
export class CharacterController {
    constructor(private readonly characterService: CharacterService) {
    }

    /**
     * Get all characters, with their nemeses and secrets.
     * @returns     List of all characters.
     */
    @Get()
    public async getAllCharacters(): Promise<CharacterDTO[]> {
        return this.characterService.getAllCharacters();
    }

}
