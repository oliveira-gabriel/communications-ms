import { Body, Controller, Get, Post } from '@nestjs/common';
import axios from 'axios';

@Controller()
export class AppController {
  @Get()
  start() {
    console.log(process.env.LIMIT);
    axios.post('http://localhost:3555/');
  }

  @Post()
  receiverMessage(@Body() body: { id: number; msg: string }) {
    console.log(body.id);
    if (body.id < +process.env.LIMIT) {
      axios.post('http://localhost:3555/');
    } else {
      console.log('Finish');
    }
  }
}
