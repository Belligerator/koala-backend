import { Controller, Get } from "@nestjs/common";
import { SecretService } from "./secret.service";
import { SecretDTO } from "./secret.dto";

@Controller('secret')
export class SecretController {
    constructor(private readonly secretService: SecretService) {
    }

    /**
     * Get all secrets, just basic data, no relations.
     * @returns     List of all secrets.
     */
    @Get()
    public async getAllSecrets(): Promise<SecretDTO[]> {
        return this.secretService.getAllSecrets();
    }
}
