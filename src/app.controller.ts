/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  create(): string {
    return 'This action adds a new user';
  }

  @Put()
  update(): string {
    return 'This action updates a user';
  }
  @Post("tes")
  create2(): string {
    return 'There is another HOWLsa';
  }
  
  @Get()
  getHello(): string {
    return "Belajar Routing NestJS"
  }
  @Get("list")
  getHello2(): string {
    return "Belajar Routing NestJS 2"
  }
}
