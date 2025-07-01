export interface BaseResponse<T> {
    status: boolean;
    msg?: string;
    data: T;
}

export interface PaginatedResponse<T> {
    
}