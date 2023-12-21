import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecretController } from './secret.controller';
import { SecretEntity } from './secret.entity';
import { SecretService } from './secret.service';

@Module({
    imports: [TypeOrmModule.forFeature([SecretEntity])],
    controllers: [SecretController],
    providers: [SecretService],
}) export class SecretModule { }
