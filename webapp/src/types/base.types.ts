import type { AxiosResponse } from "axios";

export type IResponse<T> = AxiosResponse<T>;

export type IPageableResponse<T> = IResponse<PageableListResult<T>>;

export interface PageableListResult<T> {
    totalElements: number;
    totalPages: number;
    size: number;
    pageable: PageableResult;
	content: T[];
}

export interface PageableResult {
    //first: boolean;
    pageNumber: number;
    pageSize: number;
    offset: number;
}

export interface PageableRequest {
    filter?: string;
    page: number;
    size: number;
    sort?: string[]
}