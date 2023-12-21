import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database-config';
import { CharacterEntity } from './endpoints/character/character.entity';
import { NemesisEntity } from './endpoints/nemesis/nemesis.entity';
import { SecretEntity } from './endpoints/secret/secret.entity';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(databaseConfig),
        TypeOrmModule.forFeature([
            CharacterEntity,
            NemesisEntity,
            SecretEntity
        ]),
    ],
    controllers: [
        AppController,
    ],
    providers: [
        AppService,
    ],
})
export class AppModule {}
