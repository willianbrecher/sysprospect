import type { HowKnowAbout } from "../../../types/lead.types";


export interface IRegisterForm {
    name: string;
    phone: string;
    email: string;
    knowAbout: HowKnowAbout;
}