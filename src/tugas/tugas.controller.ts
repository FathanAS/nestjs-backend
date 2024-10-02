import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { TugasService } from './tugas.service';

@Controller('tugas')
export class TugasController {
  constructor(private readonly tugasService: TugasService)   
 {}

  @Get('list')
  async getList() {
    return this.tugasService.getList();
  }

  @Get(':id/detail')
  async getDetail(@Param('id') id: string) {
    return this.tugasService.getDetail(id);
  }

  @Post('simpan')
  async simpan(@Body() tugasData: any) {
    return this.tugasService.simpan(tugasData);
  }
  @Post('simpan/response')
  async simpanResponse(@Body() tugasData: any) {
    return this.tugasService.simpan(tugasData);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id: string) {
    return this.tugasService.delete(id);
  }
}



