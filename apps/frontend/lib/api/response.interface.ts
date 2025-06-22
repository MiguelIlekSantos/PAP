export interface SingleResponse<T> {
    statusCode: number;
    message: string;
    data: T;
}

export interface ListResponse<T> {
    statusCode: number;
    message: string;
    data: {
        items: T[];
        metadata: {
            last: number;
            page: number;
            quantity: number;
            total: number;
        }
    };
}
