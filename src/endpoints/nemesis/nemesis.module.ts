import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NemesisEntity } from "./nemesis.entity";
import { NemesisController } from "./nemesis.controller";
import { NemesisService } from "./nemesis.service";

@Module({
    imports: [TypeOrmModule.forFeature([NemesisEntity])],
    controllers: [NemesisController],
    providers: [NemesisService],
}) export class NemesisModule { }
