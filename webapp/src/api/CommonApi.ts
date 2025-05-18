import { api } from "../bootstrap/bootstrapApi";
import type { IPageableResponse } from "../types/base.types";

export class CommonApi {
	constructor(protected path: string, protected queryKey: string) {}

	get pageableListQueryKey() {
		return `${this.queryKey}-pageableList`;
	}

    public async pageableList<T, U>(filter: T): Promise<IPageableResponse<U>> {
		return await api.get(`${this.path}/pageable-list`, {params: filter});
	}
}