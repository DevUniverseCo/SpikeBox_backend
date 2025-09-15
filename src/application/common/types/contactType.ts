import { ContactEnum } from "../enums/contactEnum";

export type ContactType = Partial<Record<ContactEnum, string>>;
