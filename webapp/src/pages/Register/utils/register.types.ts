import type { HowKnowAbout } from "../../../types/lead.types";

export interface IRegisterFormSchema {
    name: string | null;
    phone: string | null;
    email: string | null;
    knowAbout: HowKnowAbout | null;
}

export interface IRegisterForm {
    name: string;
    phone: string;
    email: string;
    knowAbout: HowKnowAbout;
}