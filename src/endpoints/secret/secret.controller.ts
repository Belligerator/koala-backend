import { Controller, Get } from "@nestjs/common";
import { SecretService } from "./secret.service";
import { SecretDTO } from "./secret.dto";
import { ApiOperation } from "@nestjs/swagger";

@Controller('secret')
export class SecretController {
    constructor(private readonly secretService: SecretService) {
    }

    /**
     * Get all secrets, with their nemesis and his character.
     * @returns     List of all secrets.
     */
    @ApiOperation({ summary: 'Get all secrets, with their nemesis and his character.' })
    @Get()
    public async getAllSecrets(): Promise<SecretDTO[]> {
        return this.secretService.getAllSecrets();
    }
}
