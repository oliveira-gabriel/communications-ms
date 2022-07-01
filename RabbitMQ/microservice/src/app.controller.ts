import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, RmqContext } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('request')
  public async receive(@Ctx() context: RmqContext) {
    await this.appService.readMessage(context);
  }
}
