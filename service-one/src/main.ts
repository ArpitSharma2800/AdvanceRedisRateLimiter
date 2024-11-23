import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { applyCors } from 'common/utils/utils';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  applyCors(app);
  setupSwagger(app);
  await app.listen(process.env.PORT ?? 3000);

  function setupSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('Redis Rate Limiter')
      .setDescription('API for rate limiting requests using Redis')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
}

bootstrap();
