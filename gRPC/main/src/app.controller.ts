/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Observable } from 'rxjs';
import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';

interface MensageService {
  request: (value: {}) => Observable<any>;
}

interface Mensage {
  id: number;
  msg: string;
}

@Controller()
export class AppController implements OnModuleInit {
  private mensageService: MensageService;
  constructor(@Inject('MESSAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.mensageService =
      this.client.getService<MensageService>('MensageService');
  }

  @Get()
  start() {
    console.log(process.env.LIMIT);
    this.mensageService.request({}).subscribe(() => {});
  }

  @GrpcMethod('MensageService', 'message')
  message(data: Mensage) {
    console.log(data.id);
    if (data.id < +process.env.LIMIT)
      this.mensageService.request({}).subscribe(() => {});
    else console.log('Finish1');
  }
}
