import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { envConfig } from './infrastructure/config/environment-config/environment.config';
import { setupSwagger } from './infrastructure/common/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Set up Swagger for API documentation if not in production environment
  if (envConfig.getEnvironment() !== 'production') {
    setupSwagger(app);
  }

  app.enable('trust proxy', 1);

  app.disable('x-powered-by');

  app.enableCors();

  await app.listen(envConfig.getPort());

  Logger.log('Mintago Pension running on port: ' + envConfig.getPort());
}
bootstrap().then();
