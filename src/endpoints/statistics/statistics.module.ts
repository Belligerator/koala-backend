import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { CharacterModule } from '../character/character.module';
import { NemesisModule } from '../nemesis/nemesis.module';

@Module({
    imports: [CharacterModule, NemesisModule],
    controllers: [StatisticsController],
    providers: [StatisticsService],
}) export class StatisticsModule { }
