import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto, FindBookDto, updateBookDto } from './book.dto';
import { Pagination } from 'src/utils/decorator/pagination.decorator';

@Controller('book')
export class BookController {
    constructor(private BookService: BookService) { }


    @Get('list')
    async findAllBook(@Pagination() query: FindBookDto){
        return this.BookService.findAllBook(query);
    }

    @Post('simpan')
    async createBook(@Body("") payload: CreateBookDto): Promise<any> {
        return this.BookService.createBook(payload);
    }

    @Put('update/:id')
    async updateBook(@Param('id') id: number, @Body() payload: updateBookDto): Promise<any> {
        return this.BookService.updateBook(id, payload);
    }

    @Delete("delete/:id")
    async deleteBook(@Body() payload: any, @Param('id') id: number): Promise<any> {
        return this.BookService.deleteBook(id, payload);


    }

    @Delete("delete")
    async deleteMulti(@Query("id") id: string) {
        const idArray = id.split(",")
        return this.BookService.deleteMulti(idArray);
    }

    @Get(':id')
    async bookDetail(@Param('id') id: number): Promise<any> {
        return this.BookService.bookDetail(id);
    }


}
