import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RateLimitingModule } from '@predator/common';
import { RedisConn } from './redis-conn';
import { APP_GUARD } from '@nestjs/core';
import { RequestRateLimiter } from '@predator/common';
@Module({
  imports: [
    RateLimitingModule.registerAsync(RedisConn, [
      {
        name: 'service-one',
        window: 10000,
        requests: 1
      }
    ])
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RequestRateLimiter,
    },
  ],
})
export class AppModule { }
