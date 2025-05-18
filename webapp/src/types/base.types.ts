import type { AxiosResponse } from "axios";

declare type IResponse<T> = AxiosResponse<T>;

export type IPageableResponse<T> = IResponse<PageableListResult<T>>;

export interface PageableListResult<T> {
    totalElements: number;
    totalPages: number;
    pageable: PageableResult;
	content: T[];
}

export interface PageableResult {
    pageNumber: number;
    pageSize: number;
    offset: number;
}

export interface PageableRequest {
    page: number;
    size: number;
    sort?: string[]
}