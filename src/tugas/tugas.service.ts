import { Injectable } from '@nestjs/common';
import { filter } from 'rxjs';

@Injectable()
export class TugasService {
  private tugasList: any[] = [];

  async getList() {
    return {
      status: 'success', 
      msg: 'success',
      filter: {
        page: 1,
        page_size: 10 
      }
    };
  }

  async getDetail(id: string) {
    return {
      status: 'success',
      msg: `tugas dengan id ${id} berhasil ditemukan` 
    };
  }

  async simpan(payload:any) {
    this.tugasList.push(payload); 
    return { 
      payload:payload
    };
  }
  async simpanResponse(payload:any) {
    this.tugasList.push(payload); 
    return { 
      status: 'success',
      msg: 'tugas berhasil disimpan',
      payload:payload
    };
  }

  async delete(id: string) {
    return { status: 'success', msg: 'tugas berhasil dihapus' };
  }
}