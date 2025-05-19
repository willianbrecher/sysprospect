import type { KeyFilterType } from "primereact/keyfilter";
export interface ControlledInputTextProps {
    name: string;
    formControl: any;
    keyFilter?: KeyFilterType;
    placeHolder: string;
    disabled?: boolean;
    hidden?: boolean;
}