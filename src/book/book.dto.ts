
import { OmitType } from "@nestjs/mapped-types"
import { Type } from "class-transformer";
import { IsNotEmpty, Length, Min, Max, IsInt, IsOptional, } from "class-validator"
export class BookDto{
    id:number;

    @IsNotEmpty({message : "namanya kurang"})
    @Length(4, 20)
    title: string;
    
    @IsNotEmpty()
    author: string;

    @IsInt()
    @Min(2010)
    @Max(2022)
    year: number;

    deskripsi:string;
}

export class CreateBookDto extends OmitType(BookDto, ["id"]){}
export class updateBookDto extends BookDto {}

export class FindBookDto {
    @IsInt()
    @Type(() => Number)
    pageSize: 10;

    @IsInt()
    @Type(() => Number)
    page: 1;

    @IsOptional()
    @IsInt()
    limit:number

    @IsOptional()
    title: string
    
    @IsOptional()
    author: string

    @IsOptional()
    deskripsi: string

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    from_year :number

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    to_year :number

    @IsOptional()
    keyword: string



}


