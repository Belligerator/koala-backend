import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
    // https://stackoverflow.com/questions/72466834/nestjs-logs-have-weird-characters-in-log-management-tools
    process.env.NO_COLOR = 'true';

    const app: INestApplication = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');

    const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
        .setTitle('Koala API')
        .setDescription('API description')
        .setVersion('0.0.1')
        .build();
    const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
