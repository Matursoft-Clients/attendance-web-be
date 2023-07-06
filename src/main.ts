import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { setTimeZone } from './timezone.util';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }),
  );

  const apa = join(__dirname, '..', 'src/public')

  console.log(apa)

  app.useStaticAssets(join(__dirname, '..', 'src/public'), {
    prefix: '/src/public',
  });

  await app.listen(8002);

  const options = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API documentation for your Nest.js application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}
bootstrap();
