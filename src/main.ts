import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

async function bootstrap(): Promise<void> {
    // https://stackoverflow.com/questions/72466834/nestjs-logs-have-weird-characters-in-log-management-tools
    process.env.NO_COLOR = 'true';

    const app: INestApplication = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
