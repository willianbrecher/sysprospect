import type { KeyFilterType } from "primereact/keyfilter";
import type { UseFormReturn } from "react-hook-form";

export interface ControlledInputTextProps {
    name: string;
    formControl: UseFormReturn;
    keyFilter?: KeyFilterType;
    placeHolder: string;
}