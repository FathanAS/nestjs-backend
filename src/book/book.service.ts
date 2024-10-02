import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Between, Like, Repository } from 'typeorm';
import { ResponsePagination, ResponseSuccess } from 'src/interface/response.interface';
import BaseResponse from './../utils/response.utils';
import { CreateBookDto, FindBookDto, updateBookDto } from './book.dto';

@Injectable()
export class BookService extends BaseResponse {
    constructor(
        @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    ){
        super();
    }

    async findAllBook(query: FindBookDto):
     
    Promise<ResponsePagination> {
        console.log('query',query);
        const { page,pageSize, limit, 
            title, 
            author, 
            to_year, 
            from_year, 
            deskripsi,
            keyword
         } = query;
        
        const filter: {
            [key: string]: any;
        } = {};

        const search: {
            [key: string]: any;
        }[] = []; 

        if (keyword) {
            search.push(
                { title: Like(`%${keyword}%`),
            },
                { author: Like(`%${keyword}%`),
            },
                { deskripsi: Like(`%${keyword}%`),
            },
                { year: Like(`%${keyword}%`),
            },
            ); 
        }else {
            if (title) {
                filter.title = Like(`%${title}%`);
            }
            if (author) {
                filter.author = Like(`%${author}%`);
            }
            if (deskripsi) {
                filter.deskripsi = Like(`%${deskripsi}%`);
            }
    
            if(from_year && to_year){
                filter.year = Between(from_year, to_year)
            }
            if(from_year && !to_year){
                filter.year = Between(from_year, from_year)
            }
        }

       
           
        console.log(page,pageSize,limit);

        const total = await this.bookRepository.count({
            where: keyword ?  search : filter,
        });
        
        const result = await this.bookRepository.find({
            where: keyword ?  search : filter,
            skip: limit,
            take: Number(pageSize),
          });
      

        

        return this._pagination("OK", result, total, page, pageSize)
    }

    async createBook(payload: CreateBookDto): Promise<T> {
        const send = await this.bookRepository.save(payload);
        return {
            status: 'success',
            massage: 'Buku berhasil dibuat',
            data: send
        };
    }

    async updateBook(id: number, payload: updateBookDto): Promise<T> {
        const result = await this.bookRepository.update(id, payload);

        if (result.affected === 0) {
            throw new HttpException("update gagal id tidak di temukan", HttpStatus.NOT_FOUND);
        }

        return {
            status: 'success',
            massage: 'Buku berhasil di update!',
            data: result
        };
    }

    async deleteMulti(array: string[]): Promise<{
        status: string;
        massage: string;
        data?: any;
    }> {
        const deleted = await this.bookRepository.delete(array);
        return { 
            status: 'success',
            massage: 'Buku berhasil dihapus',
            data: deleted
        };
    }

    async deleteBook(id: number, payload: any): Promise<T> {
        const deleted = await this.bookRepository.delete(id);
        if (deleted.affected === 0) {
            throw new HttpException("delete gagal nama tidak ditemukan", HttpStatus.NOT_FOUND);
        }
        return {
            massage: "berhasil di hapus dari database",
            status: "done bang",
            data: deleted
        };
    }

    async bookDetail(id: number): Promise<{ status: string; message: string; data: Book | null }> {
        const book = await this.bookRepository.findOne({ where: { id } });

        if (!book) {
            throw new HttpException('Buku tidak ditemukan', HttpStatus.NOT_FOUND);
        }

        return {
            status: 'success',
            message: 'Buku ditemukan',
            data: book,
        };
    }
}