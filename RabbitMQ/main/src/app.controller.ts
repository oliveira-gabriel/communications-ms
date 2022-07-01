import { Controller, Get } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Mensage } from './DTOs/mensage';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  start() {
    return this.appService.sendMensage({});
  }

  @EventPattern('mensage')
  public async saveMensage(
    @Payload() mensagem: Mensage,
    @Ctx() context: RmqContext,
  ) {
    await this.appService.readMessage(mensagem, context);
  }
}
