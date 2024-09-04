import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('Mintago Pensions')
    .setDescription(
      'This is the API documentation for the Mintago Pensions API',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    deepScanRoutes: true,
  });
  SwaggerModule.setup('docs', app, document);
};
