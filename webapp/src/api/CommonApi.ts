import { api } from "../bootstrap/bootstrapApi";
import type { IPageableResponse, IResponse } from "../types/base.types";

export class CommonApi {
  protected path: string;
  protected queryKey: string;

  constructor(path: string, queryKey: string) {
    this.path = path;
    this.queryKey = queryKey;
  }

  get pageableListQueryKey() {
    return `${this.queryKey}-pageableList`;
  }

  get getByIdQueryKey() {
    return `${this.queryKey}-getById`;
  }

  public async pageableList<T, U>(filter: T): Promise<IPageableResponse<U>> {
    return await api.get(`${this.path}/pageable-list`, { params: filter });
  }

  public async getById<T>(id?: string): Promise<IResponse<T>> {
    return await api.get(`${this.path}/${id}`);
  }

  public async create<T, U>(entity: T): Promise<IResponse<U>> {
    return await api.post(`${this.path}`, entity);
  }

  public async update<T, U>(entity: T, id?: string): Promise<IResponse<U>> {
    return await api.put(`${this.path}/${id}`, entity);
  }
}
