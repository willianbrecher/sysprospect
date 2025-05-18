import { api } from "../bootstrap/bootstrapApi";
import type { IRegisterForm } from "../pages/Register/utils/register.types";
import type { ILeadViewModel } from "../types/lead.types";
import { CommonApi } from "./CommonApi";


export class RegisterApi extends CommonApi {
	constructor() {
		super("/api/register", "register");
	}

    public async register(entity: IRegisterForm): Promise<ILeadViewModel> {
		return await api.post(this.path, entity);
	}
}