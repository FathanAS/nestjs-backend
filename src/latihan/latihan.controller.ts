/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Query, Post, Body, Put } from '@nestjs/common';
import { query } from 'express';
import { LatihanService } from './latihan.service';

@Controller('latihan')
export class LatihanController {
 constructor(
  private readonly LatihanService:LatihanService
 ){}



    @Get()
    findAll(@Query() query:any) {
        return this.LatihanService.findAll(query)
    }

    @Get('detail/:id/:name')
    detail(@Param('id') id: string, @Param('name') name: string) {
    return this.LatihanService.findDetail(id, name)
    }
    @Post("simpan")
    register(@Body() payload:any){
    return this.LatihanService.register(payload)
    }
    @Put("update/:id")
update(@Param('id') id: string, @Body() payload:any){
    return {
        method: 'PUT',
        payload : payload,
        msg: `id manusia ini ${id}`
    }
}
}



