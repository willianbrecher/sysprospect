export enum HowKnowAbout {
    INTERNET, EVENT, REFERRED, OTHER
}

export interface ILeadViewModel {
    id: string;
    name: string;
    email: string;
    phone: string;
    amount: number;
    knowAbout: HowKnowAbout;
    createdAt: string;
}