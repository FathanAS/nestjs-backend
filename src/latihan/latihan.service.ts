/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class LatihanService {
    findAll(query:any) {
        return {
            msg: "siap latihan service",
            params: query
        };
    }
    findDetail(id: string, name: string,){
        return {
            method: 'GET',
            id: id,
            name: name
        }
    }
    register(payload:any){
        return {
              method: 'GET',
              payload:payload      
        }
    }
}
