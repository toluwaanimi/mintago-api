import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ControllersModule } from './infrastructure/controllers/controllers.module';

@Module({
  imports: [
    ControllersModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60, // TTL in seconds
          limit: 50, // Number of requests per TTL
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
