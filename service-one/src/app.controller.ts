import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Throttle } from '@predator/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Throttle({ "service-one": { limit: 10, ttl: 60 * 60 * 1000 } })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
