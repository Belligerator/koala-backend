import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database-config';
import { CharacterModule } from './endpoints/character/character.module';
import { NemesisModule } from './endpoints/nemesis/nemesis.module';
import { SecretModule } from './endpoints/secret/secret.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(databaseConfig),
        CharacterModule,
        NemesisModule,
        SecretModule
    ],
    controllers: [
        AppController,
    ],
    providers: [
        AppService,
    ],
})
export class AppModule {}
