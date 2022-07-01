import { Controller, Get, Inject } from '@nestjs/common';
import { EventPattern, Payload, ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(@Inject('TCP_SERVICE') private client: ClientProxy) {}

  @Get()
  start() {
    this.client.emit('response_message', {});
  }

  @EventPattern('message')
  public receiverMessage(@Payload() data: { id: number; msg: string }) {
    console.log(data.id);
    if (data.id < +process.env.LIMIT) this.client.emit('response_message', {});
    else console.log('Finish');
  }
}
