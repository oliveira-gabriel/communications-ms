import { OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
export declare class AppController implements OnModuleInit {
    private client;
    private mensageService;
    private id;
    constructor(client: ClientGrpc);
    onModuleInit(): void;
    request(): void;
}
