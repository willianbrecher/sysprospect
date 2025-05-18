import type { UseFormReturn } from "react-hook-form";

export interface ControlledDropdownProps {
    name: string;
    optionLabel: string;
    options: ControlledDropdownOptionItem[]
    formControl: UseFormReturn;
    placeHolder: string;
}

export interface ControlledDropdownOptionItem {
    label: string;
    value: string
}