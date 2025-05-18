import { CommonApi } from "./CommonApi";

export class LeadApi extends CommonApi {
	constructor() {
		super("/api/leads", "leads");
	}
}