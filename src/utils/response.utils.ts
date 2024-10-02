import { ResponseSuccess, ResponsePagination } from 'src/interface';

class BaseResponse {
    _success (message: string, data?: any, p0?: { total: number; page: number; pageSize: number; offset: number; }): ResponseSuccess{
        return {
            status: 'success',
            message: message,
            data: data || [],
        };
       }

    _pagination(
        message: string, 
        data: any,
        total: number,
        page: number,
        pageSize: number,
    ): ResponsePagination {
        return {
            status: 'success',
            message: message,
            data: data || {},
            pagination: {
                total: total,
                page: page,
                pageSize: pageSize,
                totalPage: Math.ceil(total/pageSize)
            },
        };
    }
}

export default BaseResponse