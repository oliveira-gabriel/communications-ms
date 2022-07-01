import { Injectable } from '@nestjs/common';
import { RmqContext, ClientProxy } from '@nestjs/microservices';
import { ClientRabbitMQ } from './rabbitmq/client.rabbitmq';
import { Mensage } from './DTOs/mensage';

@Injectable()
export class AppService {
  private client: ClientProxy;

  constructor(private clientProxy: ClientRabbitMQ) {
    this.client = this.clientProxy.getClientRabbitMQ();
  }

  sendMensage(mensage: any) {
    this.client.emit('request', mensage);
  }

  public async readMessage(mensage: Mensage, context: RmqContext) {
    //Aqui é o context usado pelo RabbtMQ, onde podemos usar o channel confirmar que uma mensagem foi processada
    const channel = context.getChannelRef();
    //originalMsg é usado para indicar que mensagem foi processada
    const originalMsg = context.getMessage();
    await channel.ack(originalMsg);
    if (mensage.id < process.env.LIMIT) {
      this.sendMensage({});
    }
    //Aqui sinaliza que a mensagem foi processada
  }
}
