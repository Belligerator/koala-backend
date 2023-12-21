import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database-config';
import { CharacterModule } from './endpoints/character/character.module';
import { NemesisModule } from './endpoints/nemesis/nemesis.module';
import { SecretModule } from './endpoints/secret/secret.module';
import { StatisticsModule } from './endpoints/statistics/statistics.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/all-exception.filter';
import { HttpExceptionFilter } from './filters/http-exception.filter';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(databaseConfig),
        CharacterModule,
        NemesisModule,
        SecretModule,
        StatisticsModule
    ],
    controllers: [
        AppController,
    ],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        },
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
})
export class AppModule {}
