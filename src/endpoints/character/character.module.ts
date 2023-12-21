import { Module } from "@nestjs/common";
import { CharacterController } from "./character.controller";
import { CharacterEntity } from "./character.entity";
import { CharacterService } from "./character.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([CharacterEntity])],
    controllers: [CharacterController],
    providers: [CharacterService],
}) export class CharacterModule { }
