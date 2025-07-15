export interface BaseResponse<T> {
    status: boolean;
    message?: string;
    data: T;
}

export interface PaginatedResponse<T> {
    status: boolean;
    totalItems: number;
    page: number;
    pageSize: number;
    data: T[];
}