import type { HowKnowAbout } from "../../../../types/lead.types";

export interface ILeadFormSchema {
  name: string | null;
  phone: string | null;
  email: string | null;
  knowAbout: HowKnowAbout | null;
}

export interface ILeadForm {
  name: string;
  phone: string;
  email: string;
  knowAbout: HowKnowAbout;
}
