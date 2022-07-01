import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppController } from './app.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MESSAGE',
        transport: Transport.GRPC,
        options: {
          package: 'microservice',
          url: '0.0.0.0:5001',
          protoPath: join(__dirname, 'proto/mensage.microservice.proto'),
        },
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
